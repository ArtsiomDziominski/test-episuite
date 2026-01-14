# test-episuite

Vue 3 приложение с TypeScript и Vuetify для отображения результатов EPI Suite API.

## Технологии

- Vue 3 (Composition API)
- TypeScript
- Vuetify 3
- Vue Router
- Axios
- Vite

## Установка

```bash
npm install
```

## Запуск

```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:5173`

## Использование

Откройте приложение с параметром `cas` в URL:
- `http://localhost:5173/results?cas=002921-88-2`

Или просто откройте главную страницу - будет автоматический редирект на `/results?cas=002921-88-2`

## Структура проекта

- `src/views/Results.vue` - главная страница с двухколоночной структурой
- `src/components/LeftBlock.vue` - левый блок с первым блоком данных
- `src/components/RightBlock.vue` - правый блок с табами для остальных данных
- `src/services/api.ts` - сервис для работы с API
- `src/types/api.ts` - типы TypeScript для API