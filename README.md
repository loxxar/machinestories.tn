# Nodes.tn - Blog Intelligence Artificielle

Blog dédié à l'intelligence artificielle : actualités, tutoriels, analyses et guides sur l'IA.

## Stack Technique

- **Framework**: Next.js 14+ (App Router)
- **Langage**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: MDX avec Contentlayer
- **Déploiement**: Vercel-ready

## Installation

```bash
# Cloner le projet
git clone https://github.com/nodes-tn/blog.git
cd blog

# Installer les dépendances
npm install

# Générer les types Contentlayer
npm run contentlayer

# Lancer le serveur de développement
npm run dev
```

Le blog sera accessible sur [http://localhost:3000](http://localhost:3000).

## Scripts Disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lancer le serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Lancer le serveur de production |
| `npm run contentlayer` | Générer les types Contentlayer |
| `npm run lint` | Linter le code |

## Structure du Projet

```
nodes.tn/
├── app/                    # App Router Next.js
│   ├── blog/              # Pages blog
│   ├── categorie/         # Pages catégories
│   ├── tag/               # Pages tags
│   ├── recherche/         # Page recherche
│   ├── a-propos/          # Page à propos
│   ├── contact/           # Page contact
│   ├── sitemap.ts         # Sitemap XML
│   ├── robots.ts          # Robots.txt
│   └── api/og/            # API Open Graph
├── components/            # Composants React
│   ├── layout/           # Header, Footer, etc.
│   ├── blog/             # Composants blog
│   ├── seo/              # Composants SEO
│   └── ui/               # Composants UI
├── content/              # Contenu MDX
│   └── blog/             # Articles
└── lib/                  # Utilitaires
```

## Création d'Articles

Créer un fichier `.mdx` dans `content/blog/` :

```mdx
---
title: "Titre de l'article"
slug: "titre-de-l-article"
description: "Meta description de 150-160 caractères"
date: "2025-01-15"
author: "Nom Auteur"
category: "Catégorie"
tags: ["Tag1", "Tag2"]
image: "/images/blog/image.webp"
imageAlt: "Description image"
featured: true
draft: false
---

Contenu de l'article en MDX...
```

## SEO

Le blog implémente :

- Métadonnées dynamiques via `generateMetadata()`
- JSON-LD structuré (Article, BreadcrumbList, WebSite)
- Sitemap XML automatique
- Flux RSS
- Images Open Graph dynamiques
- Balises canoniques
- Headers de cache optimisés

## Déploiement sur Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

Variables d'environnement recommandées :
- Aucune requise pour le fonctionnement de base

## Licence

© 2025 Nodes.tn - Tous droits réservés
