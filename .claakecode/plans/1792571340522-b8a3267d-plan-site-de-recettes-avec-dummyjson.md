# Plan — Site de recettes avec DummyJSON

## 1. Objectif et périmètre

Créer un site de recettes responsive, conforme à l’intégralité du cahier des charges, avec le **bonus CRUD complet** et **TypeScript**.

L’utilisateur pourra :
- découvrir les recettes ;
- rechercher et combiner deux filtres ;
- consulter une fiche détaillée ;
- conserver ses favoris ;
- créer, modifier et supprimer des recettes.

### Stack retenue
- **React + TypeScript + Vite**
- **Tailwind CSS 3**
- **React Router** pour la navigation
- **Context React** pour les critères de recherche et les états partagés
- **`fetch`** pour communiquer avec DummyJSON
- **localStorage** pour conserver les favoris
- **ESLint et Prettier** pour la qualité du code

Le thème sombre, la recherche temporisée et le déploiement Vercel ne font pas partie du périmètre actuel.

---

## 2. Pages et parcours

| Page | Contenu et comportement |
|---|---|
| **Accueil** | Présentation du site, navigation et accès à la découverte des recettes. |
| **Catalogue** | Recherche, filtres cuisine et difficulté, cartes de recettes et pagination. |
| **Fiche recette** | Photo, informations détaillées, ingrédients, étapes, favoris et actions de modification/suppression. |
| **Favoris** | Recettes sauvegardées, accès aux fiches et retrait de la sélection. |
| **Création** | Formulaire de recette, validation, envoi et confirmation. |
| **Modification** | Formulaire prérempli, validation, enregistrement et retour à la fiche actualisée. |

### Navigation attendue
- L’en-tête permet d’accéder à l’accueil, au catalogue, aux favoris et à la création.
- Chaque carte ouvre une fiche dédiée.
- Les fiches et les favoris disposent d’URL distinctes.
- La navigation se fait sans rechargement complet de l’application.
- L’accès direct et le rechargement d’une page fonctionnent pour les recettes présentes sur DummyJSON.
- Les recettes créées uniquement dans la session peuvent disparaître au rechargement : un message adapté explique cette limite.

---

## 3. Direction visuelle

Adopter une interface éditoriale **crème et vert noisette**, centrée sur les photos des plats.

- **DM Serif Display** pour les titres.
- **DM Sans** pour les textes, formulaires et commandes.
- Fonds chauds, bordures fines et accents verts.
- Composition asymétrique sur les grandes sections de présentation.
- Cartes photographiques et boutons rectangulaires.
- Animations discrètes de révélation au défilement.
- Grille et navigation adaptées au mobile.
- Focus clavier clairement visible et contrastes lisibles.

Les animations ne doivent pas gêner la consultation ni les utilisateurs ayant demandé une réduction des mouvements.

---

## 4. Découpage fonctionnel

### A. Socle et navigation
**Complexité : moyenne**  
**Dépendances : aucune**

- Vérifier la configuration existante de React, TypeScript et Tailwind 3.
- Mettre en place les pages et la navigation.
- Préparer les styles communs et l’identité visuelle.
- Prévoir les pages introuvables et les recettes indisponibles.

**Validation :** chaque page est accessible depuis l’application et par accès direct.

### B. Données et catalogue
**Complexité : moyenne**  
**Dépendances : socle et navigation**

- Récupérer toutes les recettes disponibles auprès de DummyJSON.
- Afficher une image et au moins trois informations pertinentes par carte :
  - nom ;
  - cuisine ;
  - difficulté ;
  - durée totale.
- Prévoir le chargement, l’échec avec nouvelle tentative et l’absence de recettes.

**Validation :** les données affichées proviennent de l’API et les erreurs ne bloquent pas définitivement l’interface.

### C. Recherche, filtres et pagination
**Complexité : moyenne**  
**Dépendances : catalogue**

- Rechercher par nom de recette.
- Filtrer par **cuisine** et **difficulté**.
- Combiner les trois critères : chaque résultat respecte tous les critères actifs.
- Appliquer la pagination après recherche et filtrage.
- Afficher la page courante et les commandes de changement de page.
- Revenir à la première page à chaque changement de critère.
- Conserver les critères dans un **Context React** pendant la navigation.
- Conserver également la page consultée lors d’un aller-retour vers une fiche, tant que les critères restent inchangés.

**Choix retenu :** recherche, filtres et pagination côté client, sur l’ensemble des recettes récupérées.

**Justification :** cette approche permet de combiner simplement les critères, sans dépendre de possibilités de combinaison limitées de l’API. Elle est adaptée au volume de ce projet et facile à expliquer à l’oral.

**Validation :** une recette absente de la page initialement visible peut apparaître dans les résultats d’une recherche.

### D. Fiche détaillée
**Complexité : simple**  
**Dépendances : données et navigation**

Afficher :
- nom et photo ;
- cuisine et difficulté ;
- temps de préparation et de cuisson ;
- portions ;
- ingrédients ;
- étapes ;
- informations nutritionnelles et note lorsqu’elles sont disponibles.

Les ingrédients et les étapes apportent notamment des informations absentes des cartes.

**Validation :** chaque carte mène à la bonne recette et une fiche reste consultable par accès direct.

### E. Favoris persistants
**Complexité : moyenne**  
**Dépendances : catalogue et fiche**

- Ajouter ou retirer une recette depuis les cartes et les fiches.
- Empêcher les doublons.
- Synchroniser l’état des favoris dans toute l’application.
- Enregistrer la sélection dans le localStorage.
- Restaurer les favoris à l’ouverture.
- Permettre leur consultation et leur retrait depuis la page dédiée.
- Afficher un état vide invitant à découvrir le catalogue.

**Validation :** les favoris sont toujours présents après rechargement et leur retrait est immédiatement visible partout.

### F. Création d’une recette
**Complexité : complexe**  
**Dépendances : données et navigation**

Prévoir un formulaire contrôlé comprenant :
- nom ;
- image ;
- cuisine ;
- difficulté ;
- temps de préparation et de cuisson ;
- portions ;
- ingrédients ;
- étapes.

Comportement attendu :
1. Vérifier les champs obligatoires et les formats attendus.
2. Présenter les erreurs près des champs concernés.
3. Envoyer les données à DummyJSON en JSON.
4. Désactiver la soumission pendant l’envoi et afficher un indicateur.
5. Vérifier le succès HTTP.
6. En cas d’erreur, conserver toutes les valeurs et permettre de réessayer.
7. En cas de succès, afficher les informations renvoyées par l’API.
8. Ajouter la recette à l’état local et permettre sa consultation.

**Validation :** la création utilise réellement une requête POST et ne se limite pas à un ajout visuel.

### G. Bonus : modification et suppression
**Complexité : complexe**  
**Dépendances : fiche et création**

#### Modification
- Ouvrir un formulaire prérempli avec les données de la recette.
- Réutiliser les mêmes règles de validation que pour la création.
- Envoyer une requête PUT ou PATCH.
- Afficher les états d’envoi, de réussite et d’échec.
- Actualiser la fiche, le catalogue et les favoris après réussite.

#### Suppression
- Demander une confirmation avant toute suppression.
- Envoyer une requête DELETE.
- Empêcher les envois multiples pendant l’opération.
- En cas de succès, retirer la recette de l’état local et des favoris.
- En cas d’échec, conserver la recette et permettre une nouvelle tentative.
- Adapter la pagination si la suppression vide la dernière page.

#### Limite de DummyJSON
Les créations, modifications et suppressions sont **simulées** : elles ne sont pas enregistrées sur le serveur.

- Les réponses de l’API alimentent l’état local.
- Les changements CRUD ne sont pas garantis après rechargement.
- Le traitement des recettes nouvellement créées devra tenir compte du fait qu’elles n’existent pas réellement sur le serveur.
- Aucune réussite ne sera affichée pour une opération refusée par l’API.
- Cette limite sera visible dans l’interface et documentée dans le README.

**Validation :** les opérations réussies sont répercutées dans toutes les vues sans présenter la simulation comme une sauvegarde permanente.

---

## 5. Gestion transversale des états et accessibilité

Sur toutes les pages concernées :

- indicateur de chargement ;
- erreur compréhensible et bouton pour réessayer ;
- message lorsqu’aucun résultat ne correspond ;
- message lorsqu’aucun favori n’est enregistré ;
- retour clair après chaque action ;
- labels associés aux champs ;
- textes alternatifs pertinents ;
- commandes utilisables au clavier ;
- focus visible ;
- absence de débordement horizontal gênant sur mobile.

Les données reçues de DummyJSON seront affichées telles quelles ; l’interface et les messages seront en français, sans promettre une traduction automatique des recettes.

---

## 6. Ordre de réalisation

| Étape | Livraison attendue |
|---|---|
| **1. Vérification du socle** | Configuration existante vérifiée, Tailwind 3 fonctionnel, contrôles qualité opérationnels. |
| **2. Identité et navigation** | Pages accessibles, en-tête commun, mise en page responsive. |
| **3. Catalogue connecté** | Recettes réelles, cartes et gestion du chargement/des erreurs. |
| **4. Recherche et pagination** | Critères combinables, état conservé pendant la navigation. |
| **5. Fiches et favoris** | Consultation détaillée et sauvegarde persistante. |
| **6. Création** | Formulaire validé, POST et confirmation à partir de la réponse API. |
| **7. Bonus CRUD** | Modification et suppression avec synchronisation locale. |
| **8. Vérification finale** | Parcours complets, accessibilité, mobile et contrôles qualité. |
| **9. Documentation** | README permettant d’installer, lancer et comprendre le projet. |

---

## 7. Vérifications avant livraison

### Fonctionnel
- Recherche et deux filtres utilisables simultanément.
- Filtrage sur l’ensemble des données, avant pagination.
- Retour à la première page après modification d’un critère.
- Conservation des critères après consultation d’une fiche.
- Favoris sans doublons et persistants.
- Formulaires invalides bloqués avec messages explicites.
- Échec réseau sans perte des saisies.
- Création, modification et suppression reflétées dans l’interface.
- Confirmation obligatoire avant suppression.
- Accès direct et rechargement des pages vérifiés.

### Qualité
- Vérification TypeScript et build réussis.
- ESLint sans erreur.
- Vérification Prettier sans erreur.
- Consultation mobile et ordinateur.
- Navigation clavier et focus visibles.

---

## 8. Documentation et préparation à l’oral

Le README précisera :
- le sujet et l’API ;
- les prérequis et les instructions d’installation/lancement ;
- la configuration nécessaire ;
- les technologies et leurs justifications ;
- les fonctionnalités obligatoires et les bonus réalisés ;
- les limites de DummyJSON et du stockage local ;
- les outils d’IA utilisés et leurs usages.

La réalisation restera pédagogique, avec un découpage simple et des exercices ciblés sur certaines parties. La préparation à l’oral couvrira :
- les hooks utilisés ;
- le rôle des contextes ;
- les requêtes et les erreurs ;
- la différence entre état local, localStorage et serveur ;
- le choix du filtrage côté client ;
- les limites des opérations simulées.

---

## 9. Alternatives écartées

- **Filtrage exclusivement côté API** : non retenu pour simplifier la combinaison des critères et garantir leur application à tout le catalogue.
- **Redux ou Zustand** : non nécessaires pour ce périmètre ; les contextes React répondent au besoin et au cahier des charges.
- **TanStack Query** : non retenu afin de garder les requêtes explicites avec `fetch` et plus faciles à expliquer.
- **Bibliothèque de composants supplémentaire** : non nécessaire ; Tailwind 3 suffit pour l’interface retenue.
- **Persistance complète du CRUD** : non prévue, puisque DummyJSON ne sauvegarde pas ces opérations et que le cahier des charges autorise leur maintien uniquement dans la session.
