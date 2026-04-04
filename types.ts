
import React from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

export interface Project {
  id: number;
  title: string;
  category: 'SCS' | 'Video' | 'Fiber' | 'Access';
  shortDescription: string; // Краткое описание для карточки
  fullDescription: string;  // Полное описание для страницы
  mainImage: string;        // Обложка
  gallery: string[];        // Дополнительные фото
  client?: string;          // Название клиента/объекта
  location?: string;        // Расположение
  completionDate?: string;  // Дата сдачи
  tasks: string[];          // Список выполненных работ
}

export interface CalculatorItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: 'SCS' | 'Video' | 'Access' | 'Fiber';
  qty: number;
}
