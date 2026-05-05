# Numerology — Netlify Deploy

Run these from this folder (project root):

```
cd "C:\Users\chad\OneDrive\Documents\GitHub\master-Central-database\---- Anti Gravity ---- My Master Folder\🪨🪨🪨🪨 Ran Plan Area\numerology"
```

## FIRST-TIME DEPLOY (site does not exist yet)

1. Log in (once per machine, skip if already logged in):
   ```
   netlify login
   ```

2. Create the site with the preferred slug:
   ```
   netlify sites:create --name numerology
   ```
   - If "numerology" is taken (global Netlify namespace), try fallback:
     ```
     netlify sites:create --name becca-chad-numerology
     ```
     or:
     ```
     netlify sites:create --name numerology-bc
     ```

3. Deploy to production:
   ```
   netlify deploy --prod --dir=.
   ```

## AFTER FIRST DEPLOY (site already linked)

Single command (run from project root):
```
netlify deploy --prod --dir=.
```

## NOTES

- `netlify.toml` is already in the project root with `publish = "."`
- Static site — no build step
- Cache headers set for assets, no-index for HTML (remove `X-Robots-Tag` in `netlify.toml` when ready to go public)
- After `sites:create`, a `.netlify/state.json` file is written to lock the site to this folder, so subsequent deploys don't need `--site`
