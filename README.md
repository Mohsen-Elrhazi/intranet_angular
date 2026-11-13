# 🎓 Intranet Universitaire — Interface Web (Frontend)

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![NG-ZORRO](https://img.shields.io/badge/NG--ZORRO-1890FF?style=for-the-badge&logo=antdesign&logoColor=white)

## 📋 À propos du projet

Application frontend **Angular** de la plateforme **Intranet Universitaire**. Elle consomme l'API REST **Spring Boot** dédiée pour assurer la gestion académique et administrative de l'établissement avec une authentification sécurisée et un contrôle d'accès basé sur les rôles (**Admin**, **Enseignant**, **Étudiant**).

---

## ✨ Fonctionnalités principales

### 🔐 Authentification & Sécurité
* Connexion utilisateur avec gestion complète des **JWT** (*Access Token* & *Refresh Token*).
* Décodage automatique du token pour l'extraction des rôles et permissions.
* Navigation dynamique et affichage conditionnel des menus selon le rôle connecté (`ADMIN`, `TEACHER`, `STUDENT`).
* Protection des routes par **Auth Guards** et **Role Guards**.

### 🛠️ Espace Administrateur (`Admin`)
* **Gestion des utilisateurs :** CRUD complet des étudiants et des enseignants (listes actifs et archivés/supprimés).
* **Gestion académique :** Administration des départements, filières/programmes et matières.
* **Gestion des infrastructures :** Attribution et suivi des salles de classe.

### 👨‍🏫 Espace Enseignant (`Teacher`)
* Consultation et gestion des cours assignés.
* Visualisation des salles de classe attribuées et du planning associé.

### 🎓 Espace Étudiant (`Student`)
* Consultation des cours inscrits et des matières du programme.
* Accès aux affectations (*assignments*) et aux informations des salles de classe.

---

## 🏗️ Architecture & Aspects techniques

* **Architecture modulaire par domaine (*Feature-based*) :** Découpage clair en modules autonomes (`auth`, `admin`, `teacher`, `student`, `core`, `layout`, `shared`).
* **Intercepteurs HTTP (`HttpInterceptor`) :** Injection automatique du Bearer Token JWT dans les en-têtes des requêtes sortantes et gestion centralisée des erreurs API.
* **Composants UI réutilisables :** Factorisation des tableaux de données (actifs/supprimés), modales de détails et formulaires réactifs.
* **Design System hybride :** Combinaison des composants riches **NG-ZORRO (Ant Design)** et des classes utilitaires **Tailwind CSS 4**.
* **Gestion multi-environnements :** Configuration séparée pour les environnements de développement (`environment.development.ts`) et de production (`environment.ts`).

---

## 📂 Structure du projet

```text
src/
├── app/
│   ├── core/               # Services singleton, Guards, Intercepteurs HTTP, Modèles
│   ├── layout/             # Structure principale (Sidebar, Header, Navigation par rôle)
│   ├── features/
│   │   ├── auth/           # Pages de connexion et gestion de session
│   │   ├── admin/          # Gestion étudiants, enseignants, départements, cours, salles
│   │   ├── teacher/        # Vue et gestion des cours/salles côté enseignant
│   │   └── student/        # Vue des cours, affectations et salles côté étudiant
│   ├── shared/             # Composants réutilisables, pipes et directives
│   ├── app.routes.ts       # Configuration du routage principal et lazy-loading
│   └── app.config.ts       # Providers globaux (HttpClient, NG-ZORRO, Animations)
├── environments/           # Variables d'environnement (dev / prod)
└── styles.css              # Configuration Tailwind CSS 4 et thèmes globaux
