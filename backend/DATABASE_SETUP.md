# 🗄️ Database Setup (Prisma + SQLite)

This document explains how to set up and manage the database for the backend.

## 🚀 Getting Started

To initialize the database locally and generate the Prisma client, run the following command in the `backend` folder:

```bash
npx prisma migrate dev --name init
```

## 🛠️ Prisma Commands

Here are some useful commands for database management:

| Command | Description |
|---------|-------------|
| `npx prisma migrate dev` | Apply schema changes to the database (development) |
| `npx prisma generate` | Regenerate the Prisma Client (types) |
| `npx prisma studio` | Open a visual editor for your data (GUI) |
| `npx prisma db seed` | Run the seed script (if available) |

## 🔄 Scénarios d'utilisation

### 1. Installation initiale (Premier lancement)
```bash
npm install
npm run db:migrate -- --name init
npm run dev
```

### 2. Modification du Schéma (`schema.prisma`)
Si tu ajoutes ou modifies une entité :
```bash
npm run db:migrate -- --name nom_de_ta_modif
# Le client sera auto-généré à la fin de la migration
```

### 3. Développement Quotidien
```bash
npm run dev
```

### 4. Explorer les données
```bash
npm run db:studio
```

