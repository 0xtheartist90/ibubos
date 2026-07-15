# Backend live zetten

## 1. Vercel-project

Importeer de GitHub-repository in het Vercel Pro-team en gebruik `main` als production branch.

## 2. Opslag koppelen

Voeg vanuit de Vercel Marketplace een Neon Postgres-database toe. Voeg ook een publieke Vercel Blob Store toe voor toekomstige uploads.

## 3. Environment-variabelen

Neem de variabelen uit `.env.example` over. Neon en Blob vullen `DATABASE_URL` en `BLOB_READ_WRITE_TOKEN` doorgaans automatisch in.

Maak een auth-secret van minimaal 32 willekeurige tekens. Genereer het gedeelde wachtwoordhash lokaal met:

```bash
npm run auth:hash -- "het-gedeelde-wachtwoord"
```

Plaats de uitvoer in `ADMIN_PASSWORD_HASH` en stel `ADMIN_USERNAME` in.

## 4. Database vullen

Haal de productievariabelen lokaal op met `vercel env pull`, en voer uit:

```bash
npm run db:push
npm run db:seed
```

`db:seed` kan veilig opnieuw worden uitgevoerd en overschrijft bestaande records niet.

## 5. Controleren

- Log in op `/admin/login`.
- Maak een conceptblog en controleer dat deze niet publiek zichtbaar is.
- Publiceer het concept en controleer `/blogs` en de detailpagina.
- Bewerk een gepubliceerd item en controleer dat de wijziging direct live staat.
- Voeg daarna het domein toe onder Vercel Project Settings > Domains.
