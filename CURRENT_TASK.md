# MachineStories - État du Projet & Décisions

Dernière mise à jour : 2026-04-12

## 🚀 État Actuel
Le projet a été migré vers une architecture compatible avec le déploiement sur Vercel (filesystem en lecture seule). L'interface d'administration est fonctionnelle pour la création, l'édition et la suppression d'articles via l'API GitHub.

## 🛠️ Décisions Techniques & Changements Majeurs

### 1. Migration Archivage MDX : fs → API GitHub (CRUD)
- **Problème** : Vercel n'autorise pas l'écriture de fichiers sur le disque en production.
- **Solution** : Les routes API `/api/admin/articles` utilisent désormais l'API REST de GitHub pour créer, mettre à jour et supprimer les fichiers `.mdx` directement dans le dépôt.
- **Détails** : 
    - Utilisation des variables d'environnement `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`, et `GITHUB_BRANCH`.
    - Encodage en Base64 obligatoire pour l'envoi de contenu.
    - Gestion sécurisée des `sha` pour les mises à jour et les suppressions.

### 2. Stockage des Images : Scaleway S3
- **Configuration** : Utilisation de **Scaleway Object Storage** pour tous les nouveaux uploads d'images.
- **Bucket** : `loxxar-s3`
- **Région** : `fr-par`
- **Implémentation** : 
    - Route dédiée `/api/admin/upload` utilisant le SDK AWS (`@aws-sdk/client-s3`).
    - Les URLs générées sont persistantes et utilisées directement dans le frontmatter des articles.

### 3. Autentification & Session
- **Librairie** : Downgrade de `jose` à la version **v5** (pour assurer la compatibilité avec l'environnement Edge de Vercel Middleware).
- **Stockage** : Session stockée dans un cookie sécurisé `admin_session`.
- **Validation** : Comparaison avec la variable d'environnement `ADMIN_PASSWORD`.

### 4. Éditeur de Texte (TipTap)
- **Fix SSR** : Ajout de `immediatelyRender: false` dans la configuration de `useEditor` pour éviter les erreurs d'hydratation Next.js.
- **Optimisation** : Importation dynamique (`next/dynamic` avec `ssr: false`) du composant `RichTextEditor` dans l'interface d'édition pour isoler TipTap du rendu côté serveur.

## 📝 À Faire / Prochaines Étapes
- [x] Vérifier le déploiement sur Vercel après migration GitHub API.
- [ ] Mettre en place la pagination côté blog si le nombre d'articles augmente.
- [ ] Optimisation SEO auto via les métadonnées générées dans `lib/content.ts`.

---
*Document maintenu par Antigravity*
