// Basis-URL van de site. Zet NEXT_PUBLIC_SITE_URL (bijv. https://ibubos.com)
// zodra het eigen domein live is; tot die tijd valt hij terug op de
// productie-URL die Vercel meegeeft.
export const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : 'http://localhost:3000');
