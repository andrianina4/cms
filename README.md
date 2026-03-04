# TARAM CMS - Plateforme Éditoriale Headless

## Description
TARAM est un CMS Headless moderne conçu pour simplifier la gestion de contenus multi-réseaux. Il permet aux administrateurs de gérer des articles, des catégories et des réseaux de diffusion, tout en offrant un système de notifications par email et un outil d'importation massive. L'architecture sépare strictement le Frontend (React) du Backend (Node/Express) pour une flexibilité maximale.

## Prérequis
- **Node.js** : v20 ou supérieure (recommandé v20.x)
- **npm** : v10 ou supérieure
- **Docker & Docker Compose** : Recommandé pour un lancement rapide et une stack complète.

## Installation

### 1. Cloner le projet
```bash
git clone git@github.com:andrianina4/cms.git
cd taram
```

### 2. Configuration des variables d'environnement
Copiez les fichiers d'exemple pour le backend :
```bash
cp backend/.env.example backend/.env
```

## 🚀 Lancement du projet

Vous pouvez lancer le projet de deux manières différentes selon vos besoins.

### Option A : Via Docker (Recommandé)
C'est la méthode la plus rapide pour avoir la stack complète (Front, Back, DB, Proxy, Maildev) prête à l'emploi.

```bash
docker-compose up --build
```
- **Interface Admin** : [http://localhost](http://localhost)
- **API Swagger** : [http://localhost/api-docs](http://localhost/api-docs)
- **Maildev (Emails)** : [http://localhost:1080](http://localhost:1080)

### Option B : Lancement manuel (Développement)
Utile si vous souhaitez modifier le code et voir les changements instantanément sans reconstruire les containers.

#### 1. Backend
```bash
cd backend
npm install
npm run dev
```
*Le backend sera accessible sur [http://localhost:8080](http://localhost:8080).*

#### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
*Le frontend sera accessible sur [http://localhost:5173](http://localhost:5173).*

#### 3. Maildev (Optionnel)
Pour tester l'envoi d'emails sans Docker, vous pouvez utiliser Maildev globalement :
```bash
npx maildev
```

## Choix techniques

### Architecture
- **Layered Architecture & Repository Pattern (Backend)** : Utilisation du design pattern **Repository** pour découpler la logique métier de la persistance des données. Cela permet de changer d'ORM ou de base de données sans impacter les services.
- **Service Layer** : Toute la logique complexe (ex: envoi d'emails, import JSON) est isolée dans des services dédiés pour faciliter la réutilisation et le test.
- **Zustand (Frontend)** : Choix de Zustand pour sa légèreté par rapport à Redux, parfait pour gérer l'auth et l'UI sans boilerplate complexe en un temps record.

### Technologies
- **SQLite + Prisma** : Pour un test technique, SQLite est idéal (zéro config). Prisma apporte un typage fort de bout en bout.
- **Nginx (Reverse Proxy)** : Utilisé pour unifier l'accès au projet sur le port 80, simulant un environnement de production réel.
- **Zod** : Validation stricte des contrats d'API et des formulaires frontend, garantissant l'intégrité des données.
- **Nodemailer + Maildev** : Permet de tester l'envoi d'emails réels de manière visuelle en local.

### Compromis
- **Auth Simulation** : Le système utilise une simulation de rôle via des headers (`x-user-role`) pour permettre de tester les permissions sans avoir à gérer un système de JWT complet (gain de temps focus sur les fonctionnalités métier).
- **SQLite** : Suffisant pour ce test, mais nécessiterait PostgreSQL pour une mise en production avec forte charge.

## Fonctionnalités implémentées

| Fonctionnalité | Statut | Description |
| :--- | :---: | :--- |
| **Gestion Articles** | ✅ Complet | CRUD Complet, Publication, Archivage, Filtres. |
| **Dashboard** | ✅ Complet | Statistiques dynamiques et derniers articles. |
| **Import Massive** | ✅ Complet | Import de fichiers JSON avec validation syntaxique. |
| **Notifications** | ✅ Complet | Envoi d'emails réels (via Nodemailer) avec historique. |
| **RBAC (Rôles)** | ✅ Complet | Différenciation Admin vs Éditeur (UI + Backend). |
| **Reverse Proxy** | ✅ Complet | Accès unifié sur port 80 via Nginx. |
| **Swagger** | ✅ Complet | Documentation interactive auto-générée. |

## Ce qui aurait été fait avec plus de temps
1. **Authentification Réelle** : Implémentation de JWT avec Refresh Tokens et cryptage de mots de passe.
2. **Éditeur Riche** : Intégration d'un éditeur de type TipTap ou Quill pour les articles.
3. **Tests E2E** : Ajout de tests avec Playwright pour valider les flux critiques (Import -> Publication).
4. **Optimisation Image** : Système de stockage S3/Cloudinary pour les images d'articles.

## 🧪 Tests Unitaires
Le projet inclut une suite de tests unitaires pour le backend utilisant **Vitest**.

```bash
cd backend
npm test                # Exécuter les tests
npm run test:coverage   # Voir la couverture de code
```

La logique métier des services (Articles, Catégories, Notifications) est couverte à plus de 80%.

## 💎 Bonus de ce Projet

Pour aller au-delà des attentes de base du test, j'ai implémenté :
1. **Documentation API Swagger** : Une interface interactive pour tester tous les endpoints.
2. **Reverse Proxy Nginx** : Tout le projet est accessible sur le port 80, comme en production.
3. **Conteneurisation Docker** : L'intégralité de la stack (Front, Back, Proxy, DB) se lance en une commande.
4. **Visualisation d'Emails** : Intégration de Maildev pour intercepter et visualiser les emails en local.

## Difficultés rencontrées
- **Contrainte de Temps (4h)** : Développer une stack complète (Front + Back + DB + Docker + Proxy) en 4h impose des choix radicaux, notamment sur la simulation de l'authentification et l'utilisation de SQLite.
- **Intégration Docker/Nginx** : La gestion des chemins relatifs pour le proxy Nginx et le Swagger a nécessité des ajustements sur le base URL du backend pour que les assets Swagger chargent correctement derrière `/api-docs`.
- **Validation Zod en Array** : La validation des imports massifs d'articles a posé des défis sur la précision des messages d'erreurs pour l'utilisateur (corrigé via un middleware custom).
