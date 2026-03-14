# 🏯 Site interactif d'apprentissage du Japonais

Une application web moderne conçue avec **React** et **TypeScript** pour maîtriser les syllabaires **Hiragana** et **Katakana**. Ce projet met en pratique les hooks avancés et les principes d'architecture modulaire.

## 🚀 Fonctionnalités Avancées (Séance 5)

* **🧠 Logique métier isolée** : Utilisation du hook personnalisé `useQuiz` pour séparer la logique du jeu (calculs, timer, feedback) du rendu visuel.
* **💾 Persistance des données** : Implémentation de `useLocalStorage` pour sauvegarder le **meilleur score (High Score)** de manière persistante dans le navigateur.
* **⚡ Optimisation** : Usage de `useMemo` pour garantir que le mélange (shuffle) des caractères ne se recalcule pas inutilement à chaque rendu.
* **🖱️ UX Ergonomique** : Focus automatique du champ de saisie via `useRef` à chaque nouvelle question pour une expérience fluide.
* **🎨 Soft UI & Animations** : Interface épurée avec feedbacks visuels animés (effet de secousse sur erreur, pop-in sur succès).

## 📖 Modes d'Apprentissage

### Mode Étude (Séance 2)
* **Grilles traditionnelles** : Visualisation complète des 46 kanas suivant l'ordre *gojūon*.
* **Cartes interactives** : Design responsive avec effets de survol et typographie claire.

### Mode Quiz (Séance 3 & 4)
* **Test adaptatif** : Questions générées aléatoirement sur le script sélectionné.
* **Validation en temps réel** : Correction instantanée avec affichage de la réponse attendue en cas d'erreur.
* **Conservation d'état** : Grâce au "Lifting State Up" dans `App.tsx`, votre progression (score et index) est maintenue même si vous changez d'onglet.

## 🛠️ Stack Technique

* **Framework** : React 18 (Vite)
* **Langage** : TypeScript (Interfaces strictes pour les données Kana)
* **Hooks** : `useState`, `useEffect`, `useRef`, `useMemo`, `useQuiz` (custom), `useLocalStorage` (custom)
* **Style** : CSS3 (Variables natives, Flexbox, Grid, Animations Keyframes)
* **Déploiement** : Vercel

## 📂 Architecture du Projet

```text
src/
├── components/          # Composants de présentation (JSX + CSS)
│   ├── CharacterCard    # Carte d'étude individuelle
│   ├── CharacterGrid    # Grille de rendu
│   ├── StudyMode        # Page de révision
│   └── QuizMode         # Page de test interactif
├── hooks/               # Logique métier extraite (Hooks personnalisés)
│   ├── useQuiz.ts       # Moteur du quiz (score, index, logique)
│   └── useLocalStorage.ts # Gestion de la persistance
├── data/
│   └── kana.ts          # Base de données des 46 kanas
├── App.tsx              # Gestionnaire d'état global (Navigation & Quiz state)
└── index.css            # Thème global et variables CSS
```
## ⚙️ Installation et Lancement

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/Illuminatyon/Mini-Projet-Comp-Dev
   cd kana-app
   ```
   
2. **Installer les dépendances**
    ```bash
    npm install
    ```
3. **Lancer l'application en local**
    ```Bash
    npm run dev
    ```

## **A préciser : Le CSS à été entièrement réalisé par une IA. J'ai fait mes prompts sur l'IA Claude.

**La réalisation du projet à été faite par moi-même, et toutes les fois où je ne comprennais pas quelque chose je demandais à l'IA, tout en essayant de comprendre ce qu'elle faisait, et en essayant de faire des choses en parallèle. J'ai notamment demandé comment structurer mon projet, etc.**

Réalisé dans le cadre du BUT Informatique Cours : Développement Web - Thomas Louvet


