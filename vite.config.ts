import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/lab1-react-vite-gh-pages',
  test: { // Конфигурация для Vitest
    globals: true, // Позволяет использовать глобальные переменные (test, expect и т.д.) без явного импорта
    environment: 'jsdom', // Использует JSDOM для эмуляции браузерного окружения
    setupFiles: './src/setupTests.ts', // Файл для глобальных настроек тестов
    css: true, // Включает обработку CSS в тестах (если ваши компоненты зависят от стилей)
  }, // Явно указываем тип для корректной работы с Vitest
})
