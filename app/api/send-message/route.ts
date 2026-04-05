
import { NextResponse } from 'next/server';
import config from '../../../src/config';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const phone = formData.get('phone');
    const message = formData.get('message');
    const files = formData.getAll('files') as File[];

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

    // 1. Отправляем текст
    const textResponse = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text: text,
        parse_mode: 'HTML',
      }),
    });

    if (!textResponse.ok) {
      const err = await textResponse.text();
      return NextResponse.json({ error: `Telegram Error: ${err}` }, { status: 500 });
    }

    // 2. Отправляем файлы (если есть)
    if (files.length > 0) {
      for (const file of files) {
        const fileFormData = new FormData();
        fileFormData.append('chat_id', TG_CHAT_ID);
        fileFormData.append('document', file);

        await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendDocument`, {
          method: 'POST',
          body: fileFormData,
        });
      }
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
