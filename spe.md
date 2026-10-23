# Design System & Spécifications DA : La Tablée

> **Manifeste & Vision** : *La Tablée* est un réseau social culinaire d'instinct, de terroir et de transmission. Conçu comme un manifeste actif contre l'« AI-slop » (images lisses et plastifiées sans saveur, recettes fictives générées à la chaîne), le produit valorise le geste imparfait, le temps long du mijotage, le respect des saisons et la clarté d'un carnet d'artisan.

---

## 1. Principes Fondamentaux de Design

- **Anti-AI Slop & Authenticité Radicale** : Pas d'iconographie aseptisée ni de photographies de stock déconnectées. Les textures rappellent le papier vergé, la farine, la fonte émaillée et le lin brut. Les échecs de cuisson (brioche retombée au 3ème essai, ajustements de bouillon) sont mis en valeur au même titre que les réussites.
- **Réconfort & Gourmandise Organique** : Les contrastes sont adoucis. On privilégie la chaleur du lait d'avoine, des fonds terracotta braisé et de la sauge maraîchère plutôt que des blancs froids ou des couleurs saturées agressives.
- **Architecture Web Inspirée de Twitter / X** : Navigation latérale gauche fluide, timeline centrale chronologique et immersive avec composition instantanée (« Qu'est-ce qui mijote dans votre cuisine ? »), et panneau latéral d'exploration locale (tendances saisonnières, maraîchers et artisans à suivre).
- **Double Identité Thématique** : 
  - **Mode Clair (DA Terroir & Carnet Artisanal)** : Esprit carnet d'épicerie fine, doux et ensoleillé.
  - **Mode Sombre (Twitter Lights Out)** : Noir profond d'ardoise et de poêle culottée avec accents braise/ambre pour une consultation nocturne sans fatigue visuelle.

---

## 2. Palette Chromatique & Tokens

### Palette Principale : « Carnet Culinaire Artisanal » (Light Mode)

| Rôle Token | Nom CSS / Variable | Valeur HEX | Description & Usage |
| :--- | :--- | :--- | :--- |
| **Surface Base** | `--surface-bg` | `#FFF8F5` | Fond général crème velouté / lait d'avoine. |
| **Surface Conteneur** | `--surface-card` | `#FFFFFF` | Fond des cartes de tweets, fiches recettes et volets. |
| **Surface Accentuée** | `--surface-subtle` | `#FFF1EA` | Fond des blocs d'encadrés, conseils d'anciens et tags actifs. |
| **Bordures & Séparateurs**| `--border-light` | `#E8D7CE` | Filets fins (1px) délimitant les colonnes et séparateurs de posts. |
| **Primaire / Accent** | `--primary-terracotta` | `#BD4B23` | Boutons d'action majeurs (*+ Mijoter*, *Publier*, *Suivre*), cœurs et focus. |
| **Primaire Hover** | `--primary-hover` | `#9E3B18` | État survol des boutons primaires. |
| **Accent Nature / Terroir**| `--accent-sage` | `#5A7253` | Badges écologiques (*100% Fait maison*, *Maraîchage bio*). |
| **Sauge Fond Clair** | `--sage-subtle` | `#EBF2EA` | Fond des pilules et pastilles de saison. |
| **Texte Titrage** | `--text-display` | `#2D1E18` | Brun espresso profond pour les titres Playfair Display. |
| **Texte Corps** | `--text-body` | `#4A3E39` | Gris chaud foncé assurant une lisibilité optimale sans noir dur. |
| **Texte Secondaire** | `--text-muted` | `#8A7B73` | Horodatages, @mentions, compteurs discrets. |

### Déclinaison Mode Sombre : « Twitter Lights Out / Ardoise & Braise »

| Rôle Token | Valeur HEX | Description & Usage |
| :--- | :--- | :--- |
| **Background Principal** | `#000000` | Noir pur type OLED / Twitter Lights Out. |
| **Surface / Volets** | `#16181C` | Ardoise très foncée pour les modules latéraux et champs de saisie. |
| **Bordures / Filets** | `#2F3336` | Bordures nettes et discrètes (1px solid). |
| **Accent Braise** | `#E05A2B` | Terracotta vibrant pour contraster sur fond noir (boutons, icônes actives). |
| **Texte Titre & Corps** | `#F7F9F9` | Blanc cassé haute lisibilité. |
| **Texte Secondaire** | `#71767B` | Gris argenté pour métadonnées et identifiants @auteur. |

---

## 3. Typographie & Rythme Éditorial

- **Police de Titre & Marque (Display)** : `Playfair Display`, serif noble et chaleureux.
  - Logo *La Tablée* : 22px / 700 / letter-spacing: -0.02em.
  - Titres de rubriques (*Tendances aux fourneaux*, *Le Fil des Casseroles*) : 18px à 20px / 700.
  - Citations manuscrites / secrets de grand-mère : Italique 15px / 400.
- **Police d'Interface & Contenu (UI & Body)** : `Inter` ou `Plus Jakarta Sans`, sans-serif géométrique et aéré.
  - Corps de post (Micro-recette) : 15px / 400 / line-height: 1.5.
  - Métadonnées et @mentions : 13px / 500.
  - Boutons & Badges : 13px à 14px / 600 / uppercase subtil ou capitalise.

---

## 4. Système de Grille & Anatomie d'Écran (Desktop Twitter-Style)

- **Largeur Max Totale** : 1240px centré.
- **Colonne Gauche (Navigation Fixe)** : 
  - Largeur : 260px.
  - Contenu : Logo flamme & typographie, liens d'onglets verticaux (*Le Fil*, *Le Carnet de Saison*, *Notifications*, *Signets*, *Tours de Main*), bouton d'action phare pleine largeur `+ Mijoter une recette`, et bloc profil utilisateur en pied (*Margot V.*).
- **Colonne Centrale (Feed / Timeline)** : 
  - Largeur : 600px.
  - Délimitée par 2 bordures latérales de 1px (`#E8D7CE` ou `#2F3336`).
  - En-tête supérieur sticky avec onglets de flux (*Pour vos fourneaux* / *Abonnements & Maraîchers*).
  - Zone de composition rapide avec filtres d'ingrédients bruts et mention éthique *100% Fait maison • Sans IA*.
- **Colonne Droite (Exploration & Communauté)** : 
  - Largeur : 340px.
  - Barre de recherche pilule arrondie (`border-radius: 9999px`).
  - Cartes indépendantes empilées avec rayon de courbure de 16px :
    1. *Tendances aux fourneaux* (Hashtags plats mijotés, levain sauvage).
    2. *Cuisiniers & Artisans à suivre* (Maraîchers locaux avec boutons d'action rapide).
    3. *Défi Communautaire de la Semaine* (Objectif collectif de marmites partagées).

---

## 5. Composants Clés & Micro-Interactions

### A. Le Tweet Culinaire (Micro-Recette)
- **Avatar & Auteur** : Photo réelle en cercle (44x44px), nom affiché en gras, badge artisan/rôle (`Cuisinier du dimanche`, `Ancien boucher`, `Pousse lente`), suivi du `@handle` et du temps relatif.
- **Corps du Récit** : Narration courte du geste technique, astuce d'ancien surlignée dans un bloc à fond léger avec icône ampoule/flamme.
- **Grille Visuelle** : 
  - Photos brutes en ratio 1:1 ou 16:9 avec coins arrondis (12px).
  - Mise en valeur des étapes (pâtes brutes, découpe, frémissement en cocotte).
- **Barre d'Engagement Culinaro-Sociale** :
  - 💬 *Commentaires & Variantes*
  - 🔁 *Remettre à sa sauce (Recuisson / Retweet)*
  - ❤️ *Coup de cuillère / Cœur braisé*
  - 🔖 *Mettre dans mon cahier (Signet)*
  - 📤 *Partager à la tablée*

### B. Badges & Labels de Confiance
- `100% Fait Maison • Sans IA` : Pastille verte sauge bordée d'un filet délicat.
- `Légumes d'automne` / `Pleine saison` : Tag ambré ou terracotta doux.
- `Recette transmise` / `Testée 42 fois` : Marqueur de validation par la communauté.

### C. Boutons d'Action (CTAs)
- **Primaire Plein** : Fond terracotta (`#BD4B23`), texte blanc, bordure 0, `border-radius: 9999px`, padding horizontal généreux, ombre portée diffuse `0 2px 8px rgba(189, 75, 35, 0.25)`.
- **Secondaire Contour** : Fond transparent, bordure 1px terracotta ou neutre, texte assorti.
