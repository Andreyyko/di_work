# Firebase Firestore — моніторинг (ROK-M)

Firestore використовується **лише** для телеметрії підсистем моніторингу, не для каталогу методик чи auth.

## Колекції

| Колекція | Призначення |
|----------|-------------|
| `client_errors` | Помилки з `error-monitor.js` |
| `client_performance` | Web Vitals з `performance-monitor.js` |
| `_health` | Ping від `GET /api/firebase-status` |

## Налаштування

1. Firebase Console → Firestore → Create database.
2. Service account JSON → три змінні в `.env` або `.env.local`:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...@....iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

3. `pnpm dev` → перевірка: http://localhost:3000/api/firebase-status

## Перевірка запису

1. Dev Monitor → **Manual error report**
2. Firebase Console → `client_errors` — новий документ
3. Дашборд `/dev/error-monitor-dashboard` — у статусі API `storage: "firestore"`

Якщо Firestore недоступний — fallback у `logs/client-errors.jsonl` (форматований JSON-масив).

## Безпека

- Не комітьте `*-firebase-adminsdk-*.json` і `.env` з ключами.
- Клієнтський браузер **не** пише в Firestore напряму — лише Admin SDK на сервері Next.js.
