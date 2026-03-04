# TARAM CMS

TARAM est une plateforme éditoriale complète (Headless CMS) permettant la gestion d'articles, de catégories, de réseaux de diffusion et l'envoi de notifications par email.

Le projet est composé d'une interface d'administration moderne (Frontend React) et d'une API robuste (Backend Node.js).

---

## 🚀 Fonctionnalités Principales

*   **Gestion d'Articles** : Création, modification, archivage, et publication d'articles avec un éditeur de texte riche et prévisualisation en temps réel.
*   **Organisation** : Structuration du contenu via des catégories dynamiques et des réseaux de diffusion.
*   **Notifications** : Envoi et historique de notifications par email pour annoncer de nouvelles publications.
*   **Import/Export** : Capacité d'importer des articles en masse via des fichiers JSON.
*   **Tableau de bord** : Vue globale avec KPIs (articles publiés, brouillons, graphes par catégorie).

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

---

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
