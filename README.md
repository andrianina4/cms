# TARAM CMS

TARAM est une plateforme éditoriale complète (Headless CMS) permettant la gestion d'articles, de catégories, de réseaux de diffusion et l'envoi de notifications par email.

Le projet est composé d'une interface d'administration moderne (Frontend React) et d'une API robuste (Backend Node.js).

---

## 🚀 Fonctionnalités Principales

*   **Gestion d'Articles** : Création, modification, archivage, et publication d'articles avec un éditeur de texte riche et prévisualisation en temps réel.
- 📊 **Dashboard Analytique** : Statistiques en temps réel, graphiques de répartition et derniers articles.
- 🔐 **Gestion des Rôles (RBAC)** : Système complet Admin vs Éditeur avec restrictions d'accès backend et UI adaptive.
- 📦 **Import Bulk** : Importation massive d'articles via fichiers JSON (Admin uniquement).
- 📧 **Notifications** : Système d'envoi d'emails pour les nouvelles publications avec historique.
- 📑 **Documentation API** : Documentation interactive via Swagger/OpenAPI.

---

## 🛠️ Stack Technique

### Frontend
*   **Framework** : React + Vite
*   **Langage** : TypeScript
*   **Style** : Tailwind CSS, shadcn/ui
*   **State Management** : Zustand, TanStack Query (React Query)
*   **Formulaires** : React Hook Form, Zod (validation)
*   **Iconographie** : Lucide React

### Backend
*   **Serveur** : Node.js, Express.js
*   **Langage** : TypeScript
*   **Base de données** : SQLite (via libSQL)
*   **ORM** : Prisma
*   **Validation** : Zod (middleware custom)
*   **Documentation API** : Swagger (`swagger-ui-express`)

---

## 📦 Architecture du Projet

```text
taram/
│
├── frontend/               # Application React (UI d'administration)
│   ├── src/
│   │   ├── components/     # Composants réutilisables (UI, Articles, Categories...)
│   │   ├── pages/          # Pages principales (Dashboard, Articles list, Edit, etc.)
│   │   ├── services/       # Appels API (Axios)
│   │   ├── store/          # État global (Zustand)
│   │   └── types/          # Définitions TypeScript
│   └── package.json
│
├── backend/                # API Express
│   ├── prisma/             # Schéma de base de données et Seeders
│   ├── src/
│   │   ├── controllers/    # Logique métier des routes
│   │   ├── middleware/     # Middlewares (ex: validation Zod, Auth)
│   │   ├── models/         # Interfaces TypeScript
│   │   ├── repositories/   # Couche d'accès aux données (Prisma)
│   │   ├── routes/         # Définition des endpoints API
│   │   ├── services/       # Logique applicative complexe
│   │   └── validations/    # Schémas Zod pour la validation des requêtes
│   ├── .env                # Variables d'environnement
│   └── package.json
│
└── docker-compose.yml      # Configuration Docker pour lancer la stack complète
```

---

## 🚦 Démarrage Rapide

### Prérequis
*   Node.js (v18+)
*   Docker & Docker Compose (Optionnel, pour le lancement conteneurisé)

### Option 1 : Via Docker (Recommandé)

Lancez l'ensemble de la stack (Frontend + Backend) avec une seule commande :

```bash
docker-compose up --build
```

*   Le **Frontend** sera accessible sur : `http://localhost:5173`
*   L'**API Backend** sera accessible sur : `http://localhost:8080/api`
*   La **Documentation Swagger** sera sur : `http://localhost:8080/api-docs`
*   🌍 **Visualisation des Emails (Maildev)** : `http://localhost:1080`

---

### 📧 Visualisation des Emails (Développement)

Pour tester l'envoi d'emails en local sans configurer de compte réel, nous utilisons **Maildev**. 
- En mode Docker (`docker-compose up`), les emails envoyés par le backend sont automatiquement capturés.
- Accédez à l'interface via : **[http://localhost:1080](http://localhost:1080)**

---

#### 🔐 Simulation des Rôles (RBAC)


Pour faciliter les tests, le système inclus une simulation de rôles dans le Header :
- **Admin** : Accès total (Suppression, Import, Gestion des catégories/réseaux, Notifications).
- **Editor** : Accès restreint (Lecture seule sur la structure, création/édition d'articles uniquement, pas de suppression).

Les requêtes API incluent automatiquement le header `x-user-role` pour validation côté serveur.

### 📖 Documentation API

La documentation Swagger est disponible une fois le backend lancé :
- **URL** : `http://localhost:8080/api-docs`
- **Authentification** : 
    - Cliquez sur le bouton **"Authorize"** en haut à droite.
    - Saisissez `admin` ou `editor` dans le champ de texte.
    - Toutes les requêtes suivantes incluront automatiquement le header `x-user-role` avec cette valeur.
- **Format** : OpenAPI 3.0

### Option 2 : Lancement Local (Développement)

#### 1. Configuration du Backend

```bash
cd backend
npm install

# Copier le fichier d'environnement (si fourni) ou référez-vous à .env.example
# Lancer les migrations, le seeder et le serveur de dev
npm run dev
```
> Le backend tourne sur `http://localhost:8080`

#### 2. Configuration du Frontend

Dans un nouveau terminal :

```bash
cd frontend
npm install

# Lancer le serveur de développement Vite
npm run dev
```
> Le frontend tourne sur `http://localhost:5173`

---

## 📚 Documentation de l'API (Swagger)

Une fois le backend lancé, la documentation interactive de l'API est générée automatiquement.
Rendez-vous sur : **[http://localhost:8080/api-docs](http://localhost:8080/api-docs)**

Vous pourrez y tester toutes les routes disponibles (`/api/articles`, `/api/categories`, etc.) directement depuis votre navigateur.

---

## 🔒 Variables d'environnement

### Backend (`backend/.env`)
```env
PORT=8080
DATABASE_URL="file:./dev.db"  # SQLite par défaut
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL="http://localhost:8080/api"
```

## 🤝 Contribution

Les modifications de la base de données nécessitent de mettre à jour le schéma Prisma (`backend/prisma/schema.prisma`) puis d'exécuter `npm run db:push` dans le dossier backend.
