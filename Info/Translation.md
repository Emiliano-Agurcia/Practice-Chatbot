# Internationalization (i18n) with next-intl – Step-by-step

This guide documents the exact, minimal setup used in this project to add translations with `next-intl` in the App Router, without locale segments in the URL. Locales are chosen via a cookie and messages are stored per module (and optionally globally) to keep things organized.

- Next.js: 16.x (App Router, Turbopack)
- Libraries: `next-intl@^4`
- Locales: `en`, `es`
- Messages location: `app/<module>/_i18n/{en,es}.json` (e.g., `app/module1/_i18n/en.json`)
  - Optional global/common messages: `app/i18n/{en,es}.json` (also a good place for the main page)
- Locale source: Cookie `NEXT_LOCALE` (defaults to `es`)

## 1) Install the library

```powershell
npm install next-intl
```

## 2) Create message files (per module)

Add message files inside the specific module you’re translating. For example:

- `app/module1/_i18n/en.json`
- `app/module1/_i18n/es.json`

If you’re not using modules, place them at the app root instead:

- `app/i18n/en.json`
- `app/i18n/es.json`

For general purposes in this document, we’ll refer to a generic module path as `app/<module>/_i18n/*.json`. You can also add a global/common dictionary under `app/i18n/*.json`.

Example shape used on the Study page:

```json
{
  "module1": {
    "title": "STUDY CREATION",
    "section1": {
      "card1": { "label": "Study Title", "p": "Title" },
      "card2": { "label": "Study Title", "p": "Title" },
      "card3": { "label": "Study Title", "p": "Title" },
    },
    "section2": {
      "card1": { "label": "Study Title", "p": "Title" },
      "card2": { "label": "Study Title", "p": "Title" },
      "card3": { "label": "Study Title", "p": "Title" },
    },
  }
}
```

Spanish mirrors the same structure with translated values.

## 3) Add the request config for server helpers

Create `app/i18n/request.ts` in. This connects `next-intl` to your messages and reads the locale from a cookie. 

If you’re not using modules, use this simple `i18n/request.ts` that loads a single app-wide dictionary:

```ts
// i18n/request.ts
import {cookies} from "next/headers";
import {getRequestConfig} from "next-intl/server";

export default getRequestConfig(async () => {
  const store = await cookies();
  const locale = store.get("NEXT_LOCALE")?.value === "en" ? "en" : "es";

  const messages = (await import(`./${locale}.json`)).default;

  return { locale, messages };
});
```

If you're using modules:        
Here we load a global/common dictionary and merge it with per-module dictionaries (module1, module2, module3, …). If a module doesn’t have translations yet, it safely falls back to an empty object.

```ts
// i18n/request.ts (with modules)
import {cookies} from "next/headers";
import {getRequestConfig} from "next-intl/server";

export default getRequestConfig(async () => {
  const store = await cookies();
  const locale = store.get("NEXT_LOCALE")?.value === "en" ? "en" : "es";

  const [common, module1, module2, module3] = await Promise.all([
    import(`./${locale}.json`).then(m => m.default).catch(() => ({})),
    import(`../module1/_i18n/${locale}.json`).then(m => m.default).catch(() => ({})),
    import(`../module2/_i18n/${locale}.json`).then(m => m.default).catch(() => ({})),
    import(`../module3/_i18n/${locale}.json`).then(m => m.default).catch(() => ({}))
  ]);

  const messages = {
    ...(common as Record<string, unknown>),
    ...(module1 as Record<string, unknown>),
    ...(module2 as Record<string, unknown>),
    ...(module3 as Record<string, unknown>)
  };

  return { locale, messages };
});
```

Notes:
- Default is `es` if the cookie is missing/invalid.
- Adjust the module list to match your actual modules (add/remove imports as needed).
- If you’re not using modules, you can rely on `app/i18n/{locale}.json` only.

## 4) Enable the next-intl plugin

Wrap your Next.js config so `getTranslations`/`useTranslations` can find the request config.

```ts
// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {};
const withNextIntl = createNextIntlPlugin('./app/i18n/request.ts');

export default withNextIntl(nextConfig);
```

## 5) Provide messages to Client Components

Client Components need `NextIntlClientProvider`. In this repo we keep the layout clean via a small `app/i18n/providers.tsx` wrapper and load messages in `app/layout.tsx` using next-intl helpers (which read from `app/i18n/request.ts`).

```tsx
// app/i18n/providers.tsx
"use client";
import {NextIntlClientProvider} from "next-intl";

export default function Providers({children, locale, messages}: {
  children: React.ReactNode;
  locale: "en" | "es";
  messages: Record<string, unknown>;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
```

```tsx
// app/layout.tsx (excerpt)
import Providers from "./i18n/providers";
import {getLocale, getMessages} from "next-intl/server";

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <Providers locale={locale as "en" | "es"} messages={messages as Record<string, unknown>}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

## 6) How to use translations in components

- Server Components (async):

```tsx
import {getTranslations} from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("module1");
  return <h1>{t("title")}</h1>;
}
```

- Client Components:

```tsx
"use client";
import {useTranslations} from "next-intl";

export default function Title() {
  const t = useTranslations("module1");
  return <h1>{t("title")}</h1>;
}
```

## 7) Example: Section1 page hooked up

`app/module1/section1/page.tsx` uses `getTranslations` and passes translated strings down to UI components.

```tsx
import Card from "../_components/Card";
import {getTranslations} from "next-intl/server";

export default async function Module1Section1Page() {
  //This will get the module1>section1 translations
  const t = await getTranslations("module1.section1");
  //(Prevents writing "module1.section1" everytime)

  return (
    <section>
      <h1>{t("title")}</h1>

      <input placeholder={t("title")}></input>

      <div>
        <Card
          title={t("fields.card1.label")}
          p={t("fields.card1.paragraph")}
        />

        <Card
          title={t("fields.card2.label")}
          p={t("fields.card2.paragraph")}
        />

        <Card
          title={t("fields.card3.label")}
          p={t("fields.card3.paragraph")}
        />
      </div>
    </section>
  );
}
```

## 8) Test a locale (cookie-based)

This setup reads the locale from the `NEXT_LOCALE` cookie.

- Default: `es`
- To switch:
  - Open your browser DevTools → Application → Cookies → http://localhost:3000
  - Add or edit a cookie with:
    - Name: `NEXT_LOCALE`
    - Value: `es`, `en`, `pt`, etc. (any supported locale)
  - Reload the page

Optional: Add a small route or server action to set the cookie and redirect back (can be added later).

## 9) Troubleshooting

- Error: "Couldn't find next-intl config file"
  - Ensure both exist:
    - `app/i18n/request.ts` (as shown above)
    - `next.config.ts` is wrapped with `next-intl/plugin`
- Client text not translating
  - Confirm `NextIntlClientProvider` is present in `app/layout.tsx` (via `Providers`).
  - Verify the right messages file is imported based on the cookie.
- Wrong language
  - Check or update the `NEXT_LOCALE` cookie and reload the server.
