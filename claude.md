# Journal de bord - Interface Admin Blog Machine Stories

## 30 mars 2026

### Contexte
Le client souhaitait une interface admin complète pour pouvoir publier et gérer les articles de blog.

### Travail effectué

#### 1. Authentification
- Installation de `jose` pour gestion JWT
- Création de `lib/auth.ts` avec :
  - Création de session JWT (7 jours)
  - Vérification du mot de passe via `.env.local`
  - Gestion des cookies de session
- Création de `middleware.ts` pour protéger les routes `/admin/*`
- Routes API login/logout (`/api/admin/login`, `/api/admin/logout`)

#### 2. Dashboard Admin
- Page `/admin` avec liste des articles
- Boutons "Catégories" et "+ Nouvel article"
- Actions : éditer, supprimer

#### 3. Gestion des Articles
- API routes CRUD : `/api/admin/articles` (GET/POST) et `/api/admin/articles/[slug]` (GET/PUT/DELETE)
- Pages de création et d'édition dans `/admin/articles/`
- Les articles sont stockés en MDX dans `content/blog/`

#### 4. Éditeur WYSIWYG
- Installation de TipTap et dépendances
- Création de `components/admin/RichTextEditor.tsx`
- Barre d'outils : gras, italique, titre H2/H3, listes, citation, code, undo/redo

#### 5. Gestion des Catégories
- Création de `lib/categories.ts` avec stockage JSON dans `data/categories.json`
- API routes : `/api/admin/categories` (GET/POST) et `/api/admin/categories/[slug]` (GET/PUT/DELETE)
- Page `/admin/categories` avec tableau, création inline, édition, suppression
- Catégories par défaut :
  - Actualités IA
  - Tutoriels & Guides
  - SEO & IA
  - IA Générative

#### 6. Formulaire Article (ArticleEditor)
- Menu déroulant catégories (charge depuis l'API)
- Champs : titre, description, date, auteur, catégorie, tags, image, alt image, featured
- Option brouillon ou publier

### Problèmes résolus
- Le `#` dans le mot de passe `.env.local` était interprétée comme commentaire shell → solution : entourer la valeur de guillemets `"Salvetat1532#"`
- Type error avec `CodeBlockLowlight` → simplification sans lowlight

### Fichiers créés
- `lib/auth.ts`
- `lib/categories.ts`
- `middleware.ts`
- `app/api/admin/login/route.ts`
- `app/api/admin/logout/route.ts`
- `app/api/admin/articles/route.ts`
- `app/api/admin/articles/[slug]/route.ts`
- `app/api/admin/categories/route.ts`
- `app/api/admin/categories/[slug]/route.ts`
- `app/admin/login/page.tsx`
- `app/admin/page.tsx`
- `app/admin/articles/new/page.tsx`
- `app/admin/articles/[slug]/page.tsx`
- `app/admin/categories/page.tsx`
- `components/admin/ArticleEditor.tsx`
- `components/admin/RichTextEditor.tsx`
- `.env.local.example`

### Variables d'environnement (.env.local)
```
ADMIN_PASSWORD="Salvetat1532#"
SESSION_SECRET=a9F#kL2pQ8xV!mZ4rT7sW@cD1eY6uB3
```

### Commandes
```bash
npm run dev  # Démarrer le serveur
```

### URL de l'admin
- http://localhost:3000/admin/login

### Remaining / à vérifier
- Le cycle complet créer → publier → voir sur le blog → supprimer fonctionne
- Les liens "Éditer" depuis le dashboard vers les articles existants
- Les modifications PUT/DELETE passent bien par l'API