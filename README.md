# Little Bites – Baby Meal Planner

A simple, responsive Indian baby meal planner built with Next.js, TypeScript and Tailwind CSS. It includes a daily plan, weekly inspiration, recipe library, food introduction log, shopping list and basic settings. Data is saved in the browser using localStorage.

## Important safety note
This app provides general meal inspiration only. It is not medical advice or a personalised nutrition plan. It does not assess nutritional adequacy, diagnose allergies or replace a pediatrician or registered dietitian. Babies differ in developmental readiness, feeding skills, growth and medical needs. Follow your child's clinician for individual advice. Always supervise eating, seat baby upright, adapt food shape and texture to their skills, avoid choking hazards, check food temperature, and use safe food handling and storage. Do not force-feed; follow hunger and fullness cues.

The sample plan is illustrative, not a validated nutrition prescription. Allergen-containing foods are marked where known; use your clinician's advice when introducing allergens, especially if your baby has severe eczema, known allergy or a previous reaction.

## Run locally
You need Node.js 18.17 or newer.

1. Extract this ZIP.
2. Open a terminal in the `little-bites-baby-meal-planner` folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open http://localhost:3000.

## Deploy with GitHub and Vercel
1. Sign in to GitHub and create a new empty repository, for example `little-bites`.
2. Extract this ZIP on your computer.
3. Upload the contents of the extracted project folder to the repository (upload the files and folders inside the project, not the ZIP itself).
4. Commit the files to the main branch.
5. Sign in to Vercel and choose **Add New → Project**.
6. Import your `little-bites` GitHub repository.
7. Vercel should detect Next.js automatically. Keep the default build settings.
8. Select **Deploy**. No environment variables are required for this starter version.

After deployment, future commits pushed to the connected GitHub branch will trigger a new deployment.

## Included features
- Daily meal cards with completion checkboxes and meal swapping
- Seven-day sample meal inspiration
- Searchable recipe library
- Food introduction and observation log
- Editable shopping list
- Baby nickname and optional date of birth settings
- Browser-local persistence

## Data and privacy
All saved data is stored in localStorage in the current browser on the current device. There is no login, server database, cloud sync or analytics. Clearing browser storage can erase the data. Do not use this starter app to store sensitive medical information.

## Project structure
```text
app/
  globals.css
  layout.tsx
  page.tsx
next.config.js
package.json
postcss.config.js
tailwind.config.ts
tsconfig.json
README.md
```

## Notes
- The sample meal rotation and recipe list are starting examples. Please review every food and preparation method with your child's pediatrician or dietitian as appropriate.
- The app does not automatically generate nutritionally analysed meal plans.
- The weekly planner is an illustrative static rotation; the daily planner and personal lists are editable.
