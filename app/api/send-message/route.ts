import { NextResponse } from 'next/server';
import config from '../../../src/config';
import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import { SocksProxyAgent } from 'socks-proxy-agent';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const phone = formData.get('phone');
    const message = formData.get('message');
    const files = formData.getAll('files') as File[];
    
    // Honey Pot protection
    const honeypot = formData.get('website');
    if (honeypot) {
      // Логируем попытку спама в файл
      const logEntry = `[${new Date().toISOString()}] SPAM DETECTED\nName: ${name}\nPhone: ${phone}\nMessage: ${message}\nHoneypot Content: ${honeypot}\n-------------------\n`;
      
      try {
        const logPath = path.join(process.cwd(), 'spam_logs.txt');
        await fs.appendFile(logPath, logEntry);
      } catch (logError) {
        console.error('Failed to write to spam_logs.txt:', logError);
      }

      console.log('Spam detected via Honey Pot');
      return NextResponse.json({ success: true, message: 'Spam filtered' });
    }

    const { TG_BOT_TOKEN, TG_CHAT_ID } = config;

    if (!TG_BOT_TOKEN || !TG_CHAT_ID) {
      return NextResponse.json({ error: 'Telegram keys not configured' }, { status: 500 });
    }

    const text = `
🔔 <b>Новая заявка с сайта!</b>

👤 <b>Имя:</b> ${name}
📞 <b>Телефон:</b> ${phone}
📝 <b>Задача:</b> ${message || 'Не указано'}
📎 <b>Файлов прикреплено:</b> ${files.length}
    `;

    // Создаем агент для SOCKS5 прокси (используем локальный туннель)
    const agent = new SocksProxyAgent('socks5://127.0.0.1:1080');

    // 1. Отправляем текст
    await axios.post(
      `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TG_CHAT_ID,
        text: text,
        parse_mode: 'HTML',
      },
      { httpsAgent: agent }
    );

    // 2. Отправляем файлы (если есть)
    if (files.length > 0) {
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        const fileFormData = new FormData();
        fileFormData.append('chat_id', TG_CHAT_ID);
        fileFormData.append('document', new Blob([buffer], { type: file.type }), file.name);

        await axios.post(
          `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendDocument`,
          fileFormData,
          { 
            httpsAgent: agent,
            // Заголовки multipart/form-data axios проставит автоматически на основе объекта FormData
          }
        );
      }
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('API Route Error:', error?.response?.data || error.message);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
