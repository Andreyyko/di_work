# Перевірка дипломних доповнень (ROK-M client)

Інструкції для перевірки JWT middleware, Zustand, HOC, error monitor та load test.

---

## 0. Firebase Firestore (моніторинг)

1. Переконайтеся, що в `.env` є `FIREBASE_*` (див. `docs/firebase-setup.md`).
2. `pnpm dev` → http://localhost:3000/api/firebase-status → `"ok": true`.
3. Dev Monitor → Manual error → Firebase Console → `client_errors`.

---

## 1. Edge Middleware + JWT (перший рівень захисту)

### Що зроблено

- `middleware.ts` перевіряє cookie `rok_jwt` на маршрутах `/profile/*`, `/mak-cards`, `/methodics-sections/:category`.
- При відсутності або простроченому токені — редирект на `/auth/sign-in?returnUrl=...`.
- Після логіну JWT дублюється в cookie (`syncJwtCookie` у `api/auth-api.ts`).

### Як протестувати

1. Запустіть dev-сервер: `pnpm dev`.
2. **Без входу** відкрийте в браузері:
   - http://localhost:3000/profile/my-profile  
   - http://localhost:3000/mak-cards  
   - http://localhost:3000/methodics-sections/parents (або інший slug)
3. **Очікування:** миттєвий редирект на сторінку входу (до рендеру захищеного контенту).
4. Увійдіть через `/auth/sign-in`.
5. Повторно відкрийте `/profile/my-profile` — сторінка завантажується.
6. DevTools → Application → Cookies → `rok_jwt` — має з’явитися після логіну.

### Повна верифікація підпису (опційно)

Якщо на backend (Strapi) є `JWT_SECRET`, додайте в `.env.local`:

```env
STRAPI_JWT_SECRET=той_самий_секрет_що_на_бекенді
```

Перезапустіть `pnpm dev`. Middleware тоді перевіряє підпис через `jose`, а не лише `exp`.

---

## 2. Zustand (глобальний стан)

### Що зроблено

- `stores/auth-store.ts` — auth (`jwt`, `user`).
- `stores/mak-favorites-store.ts` — улюблені МАК-картки.
- `stores/mak-cards-ui-store.ts` — вкладка, пошук, відкрита картка на `/mak-cards`.
- `stores/index.ts` — єдиний експорт.
- `components/providers/AuthStoreSync.tsx` — гідратація з localStorage у `app/layout.tsx`.

### Як протестувати

1. Увійдіть на сайт.
2. DevTools → Console:

```javascript
// Після завантаження сторінки (потрібен доступ до React — або перевірте через React DevTools Components)
// Простіше: перевірити localStorage + cookie
localStorage.getItem('rok_jwt')
document.cookie.includes('rok_jwt')
```

3. React DevTools → знайдіть `AuthStoreSync` / компоненти, що використовують `useAuthStore`.
4. Вийдіть (очистіть JWT у профілі або `localStorage.clear()` + reload) — store та cookie мають очиститися після `clearJwt()`.

---

## 3. HOC + AccessGate (другий рівень)

### Що зроблено

- `lib/with-access-gate.tsx` — HOC `withAccessGate(Component, Gate)`.
- `/mak-cards` — `export default withAccessGate(CardsPageContent, MakCardsAccessGate)`.
- Розділи методик — `MethodicsSectionAccessGate` (перевірка premium/owned через API).

### Як протестувати

1. **Middleware:** неавторизований користувач не бачить `/mak-cards` (редирект).
2. **HOC/API:** увійдіть користувачем **без** premium/МАК — middleware пропустить, AccessGate перенаправить на `/mak-gallery` або `/catalog-methodics`.
3. Перевірте в React DevTools displayName: `withAccessGate(CardsPageContent)`.

---

## 4. Error monitor (особистий внесок)

Див. `docs/error-monitor-diploma.md`.

### Швидкий тест

1. http://localhost:3000/dev/error-monitor-test — кнопки тестів.
2. Dev Monitor (кнопка внизу справа) → Sync throw / Manual error.
3. http://localhost:3000/dev/error-monitor-dashboard — графіки та таблиця.
4. Файл `logs/client-errors.jsonl` — новий рядок JSON.

---

## 5. Load test endpoint логування

### Запуск

```bash
pnpm dev
# в іншому терміналі:
pnpm run load-test:errors
```

З параметрами:

```bash
BASE_URL=http://localhost:3000 CONCURRENCY=20 TOTAL=100 pnpm run load-test:errors
```

### Очікування

- `OK: 100/100` (або ваш TOTAL).
- У виводі: RPS, p50/p95 latency.
- Нові рядки в `logs/client-errors.jsonl` з `"tags":["load-test","diploma"]`.

Скрін виводу терміналу — для диплому (рис. «експериментальна перевірка стійкості»).

---

## 6. Web Vitals / Performance monitor

1. `pnpm dev` — performance-monitor активний автоматично.
2. Dev Monitor → «Зняти метрики зараз» або відкрийте кілька сторінок.
3. Дашборд → вкладка **Performance**.
4. Для звіту в дипломі краще **production build**:

```bash
pnpm build && pnpm start
# Lighthouse у Chrome → вкладка Performance / LCP
```

Не використовуйте лише dev-метрики (там часто `rating: poor` через devtools chunks).

---

## Чеклист перед захистом (3 хв live demo)

| # | Дія | Очікування |
|---|-----|------------|
| 1 | Відкрити `/profile` без логіну | Редирект на sign-in |
| 2 | Увійти | Cookie `rok_jwt`, профіль відкривається |
| 3 | Dev Monitor → Manual error | Запис у jsonl + дашборд |
| 4 | `pnpm run load-test:errors` | 100% OK у терміналі |
| 5 | Показати `stores/auth-store.ts` + `middleware.ts` у IDE | Архітектура |

---

## Файли для згадки в дипломі

| Тема | Файл |
|------|------|
| Edge JWT | `middleware.ts`, `lib/verify-jwt-edge.ts` |
| Cookie sync | `lib/auth-cookie.ts`, `api/auth-api.ts` |
| Zustand | `stores/` (`auth-store`, `mak-favorites-store`, `mak-cards-ui-store`) |
| Firebase | `lib/firebase-admin-app.ts`, `docs/firebase-setup.md` |
| HOC | `lib/with-access-gate.tsx`, `app/mak-cards/page.tsx` |
| Access rules | `lib/accessRules.ts`, `components/common/*AccessGate.tsx` |
| Error monitor | `public/error-monitor.js`, `app/api/log-error/route.ts` |
| Load test | `scripts/load-test-log-error.mjs` |
