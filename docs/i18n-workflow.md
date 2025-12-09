# Système de Traduction i18n

Ce document explique comment fonctionne le système de traduction du portfolio et comment ajouter du nouveau contenu traduisible.

## Architecture

Le projet utilise `next-intl` pour la gestion des traductions avec une architecture basée sur des routes localisées :

```
app/
  [locale]/
    layout.tsx    # Layout localisé
    page.tsx      # Page localisée
```

### Langues Disponibles

- **Français (fr)** : Langue source et par défaut
- **Anglais (en)** : Traduit automatiquement depuis le français

## Fichiers Clés

### Configuration

- **i18n/routing.ts** : Configuration des locales et locale par défaut
- **i18n/request.ts** : Configuration du provider de messages
- **middleware.ts** : Middleware de détection de langue
- **next.config.ts** : Configuration Next.js avec plugin next-intl

### Traductions

- **messages/fr.json** : Source de vérité - TOUT le contenu en français
- **messages/en.json** : Généré automatiquement via traduction
- **scripts/translate.ts** : Script de traduction automatique

## Workflow : Ajouter du Nouveau Contenu

### Étape 1 : Éditer le Fichier Source Français

Ouvrez `messages/fr.json` et ajoutez votre nouveau contenu en français.

**Exemple** : Ajouter une section "Témoignages"

```json
{
  "hero": { ... },
  "about": { ... },
  "testimonials": {
    "title": "Témoignages",
    "subtitle": "Ce que disent mes collaborateurs",
    "items": [
      {
        "name": "Jean Dupont",
        "position": "CTO @ TechCorp",
        "text": "Samuel est un développeur exceptionnel avec une grande attention aux détails."
      },
      {
        "name": "Marie Martin",
        "position": "Lead Dev @ StartupX",
        "text": "Travailler avec Samuel a été une expérience enrichissante."
      }
    ]
  }
}
```

### Étape 2 : Lancer la Traduction Automatique

Dans votre terminal, exécutez :

```bash
bun run translate
```

Ce script va :
1. Lire `messages/fr.json`
2. Traduire tout le contenu en anglais via l'API Google Translate
3. Générer/mettre à jour `messages/en.json`

**Sortie attendue** :
```
Translating to en...
Translating: Témoignages...
Translating: Ce que disent mes collaborateurs...
Translating: Samuel est un développeur exceptionnel...
✓ Translation complete: /Users/xenfroz/portfolio-2025/messages/en.json

All translations completed!
```

### Étape 3 : Utiliser les Traductions dans un Composant

Créez ou modifiez un composant pour utiliser les nouvelles traductions.

**Exemple** : `app/components/TestimonialsSection.tsx`

```typescript
"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface Testimonial {
  name: string;
  position: string;
  text: string;
}

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const testimonials = t.raw('items') as Testimonial[];

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          {t('title')}
        </h2>
        <p className="text-xl text-center mb-12">
          {t('subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              className="bg-white dark:bg-purple-900 p-6 rounded-2xl"
            >
              <p className="text-lg mb-4">{testimonial.text}</p>
              <div>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.position}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Étape 4 : Tester les Deux Langues

1. Démarrez le serveur de développement : `bun dev`
2. Testez en français : `http://localhost:3000/fr`
3. Testez en anglais : `http://localhost:3000/en`
4. Utilisez le sélecteur de langue dans l'interface

## API de useTranslations

### Accès aux Chaînes Simples

```typescript
const t = useTranslations('hero');
const greeting = t('greeting'); // "Salut, moi c'est Samuel"
```

### Accès aux Objets Imbriqués

```typescript
const t = useTranslations('about');
const locationTitle = t('location.title'); // "Localisation"
```

### Accès aux Données Brutes (Tableaux/Objets)

```typescript
const t = useTranslations('skills');
const backendItems = t.raw('backend.items') as string[];
// ["Java", "Spring Boot", "Node.js", ...]
```

### Types TypeScript

Définissez des interfaces pour les structures complexes :

```typescript
interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

const projects = t.raw('items') as Project[];
```

## Amélioration des Traductions Automatiques

Les traductions automatiques Google Translate sont généralement bonnes, mais parfois imparfaites.

### Option 1 : Édition Manuelle (Recommandé)

Après avoir exécuté `bun run translate`, ouvrez `messages/en.json` et améliorez manuellement les traductions si nécessaire.

**Attention** : Vos modifications manuelles seront ÉCRASÉES si vous :
- Supprimez `messages/en.json` et relancez le script
- Modifiez le script pour régénérer complètement le fichier

### Option 2 : Édition Incrémentale

Pour des modifications mineures du français, le script ne retraduit que le nouveau contenu. Vos anciennes corrections manuelles en anglais restent intactes.

## Structure du JSON de Traductions

### Convention de Nommage

- **Sections** : Noms au singulier (`hero`, `about`, `contact`)
- **Listes** : Toujours nommées `items`
- **Propriétés** : camelCase (`viewProjects`, `getInTouch`)

### Exemple de Structure Complète

```json
{
  "sectionName": {
    "title": "Titre de la section",
    "subtitle": "Sous-titre optionnel",
    "description": "Description longue...",
    "items": [
      {
        "title": "Item 1",
        "text": "Description de l'item 1"
      }
    ],
    "nested": {
      "property": "Valeur imbriquée"
    }
  }
}
```

## Composants Utilisant les Traductions

Tous les composants de l'application utilisent `useTranslations` :

| Composant | Namespace | Fichier |
|-----------|-----------|---------|
| HeroSection | `hero` | [app/components/HeroSection.tsx](../app/components/HeroSection.tsx) |
| AboutSection | `about` | [app/components/AboutSection.tsx](../app/components/AboutSection.tsx) |
| SkillsSection | `skills` | [app/components/SkillsSection.tsx](../app/components/SkillsSection.tsx) |
| ProjectsSection | `projects` | [app/components/ProjectsSection.tsx](../app/components/ProjectsSection.tsx) |
| ContactSection | `contact` | [app/components/ContactSection.tsx](../app/components/ContactSection.tsx) |
| Footer | `footer` | [app/components/Footer.tsx](../app/components/Footer.tsx) |
| LanguageSwitcher | - | [app/components/LanguageSwitcher.tsx](../app/components/LanguageSwitcher.tsx) |

## Ajouter une Nouvelle Langue

Pour ajouter une nouvelle langue (ex: espagnol) :

### 1. Mettre à Jour la Configuration

**i18n/routing.ts**
```typescript
export const routing = defineRouting({
  locales: ['fr', 'en', 'es'], // Ajouter 'es'
  defaultLocale: 'fr'
});
```

### 2. Mettre à Jour le Script de Traduction

**scripts/translate.ts**
```typescript
const SUPPORTED_LOCALES = ['en', 'es']; // Ajouter 'es'
```

### 3. Exécuter la Traduction

```bash
bun run translate
```

Cela générera automatiquement `messages/es.json`.

### 4. Mettre à Jour le LanguageSwitcher

Ajoutez le drapeau et l'option pour l'espagnol dans le composant.

## Dépannage

### La Traduction Ne Fonctionne Pas

**Problème** : `bun run translate` échoue

**Solutions** :
1. Vérifiez que `messages/fr.json` est valide (JSON bien formé)
2. Vérifiez votre connexion internet (API Google Translate)
3. Regardez les erreurs dans le terminal

### Les Traductions Ne S'Affichent Pas

**Problème** : Le composant affiche une clé au lieu du texte

**Solutions** :
1. Vérifiez que le namespace est correct : `useTranslations('hero')`
2. Vérifiez que la clé existe dans `messages/fr.json`
3. Vérifiez que `bun run translate` a été exécuté
4. Redémarrez le serveur de développement

### Erreur de Type TypeScript

**Problème** : TypeScript se plaint des types sur `t.raw()`

**Solution** :
```typescript
// Définir l'interface
interface Item {
  title: string;
  description: string;
}

// Cast explicite
const items = t.raw('items') as Item[];
```

## Commandes Utiles

```bash
# Traduire le contenu français vers l'anglais
bun run translate

# Démarrer le serveur de développement
bun dev

# Vérifier le formatage
bun run format

# Linter le code
bun run lint
```

## Ressources

- [Documentation next-intl](https://next-intl-docs.vercel.app/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Google Translate API](https://github.com/vitalets/google-translate-api)
