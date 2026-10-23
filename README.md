# La Tablée

Petit projet React de recettes utilisant l’API publique DummyJSON.

## Lancer le projet

Installe Node.js, puis dans un terminal à la racine du projet :

```bash
npm install
npm run dev
```

Vite affiche une adresse locale. Ouvre-la dans ton navigateur.

## Vérifier le projet

```bash
npm run build       # construit le site
npm run lint         # vérifie le code
npm run format:check # vérifie le formatage
npm run test:e2e     # lance les tests dans Chromium avec Playwright
```

## Mettre le site en ligne sur GitHub Pages

1. Envoie le projet sur GitHub, sur la branche `main`.
2. Dans le dépôt GitHub, va dans **Settings → Pages**.
3. Choisis **GitHub Actions** comme source.
4. Va dans **Actions** et vérifie que **Déployer La Tablée sur GitHub Pages** se termine sans erreur.
5. Ouvre ensuite : <https://williampeynichou.github.io/B3_TS_WILLIAM/>.

À chaque envoi sur `main`, GitHub reconstruit et republie le site. L’API DummyJSON simule les créations : elles ne sont pas conservées sur son serveur.
