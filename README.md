# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
<<<<<<< HEAD
=======

3. Lancer l'application
```bash
npm run dev
```

## 📁 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── academic/       # Composants de gestion académique
│   ├── admin/          # Composants d'administration
│   ├── courses/        # Composants de gestion des cours
│   └── planning/       # Composants de planning
├── pages/              # Pages principales
├── utils/              # Utilitaires et helpers
└── config/             # Fichiers de configuration
```

## 🔐 Rôles et Permissions

- **Administrateur**
  - Gestion complète des utilisateurs
  - Configuration du système
  - Accès à toutes les fonctionnalités

- **Responsable Scolarité**
  - Gestion de la structure académique
  - Affectation des enseignants
  - Gestion des emplois du temps

- **Enseignant**
  - Gestion des cours
  - Création de quiz
  - Notation des élèves

- **Étudiant**
  - Consultation des cours
  - Passage des quiz
  - Consultation des notes

## 📱 Captures d'écran

![Dashboard](docs/images/Dashboard.png)
![Gestion-Utilisateurs](docs/images/Gestion-Utilisateurs.png)
![Quizz](docs/images/Quizz.png)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.

## 📞 Contact

Votre Nom - [@X](https://X.com/keizensberg) - franckbello0@gmail.com

Lien du projet: [https://github.com/Loytifi/Online-School](https://github.com/Loytifi/Online-School)
>>>>>>> ef3bda111f564b2f6f0c6a4946495811276530ea
