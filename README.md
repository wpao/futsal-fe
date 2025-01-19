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
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

## about project

app booking Futsal

## extension

use this extension for eazy to develop

- Tailwind CSS IntelliSense
- Codeium: AI Coding Autocomplete and Chat for Python, Javascript, Typescript, Java, Go,
- Prettier - Code formatter
- Material Icon Theme
- Auto Rename Tag

# Project React-TS with ShadCN and TailwindCSS

This is a React TypeScript project built with the following technologies:

- [ShadCN](https://shadcn.dev) for pre-styled components.
- [TailwindCSS](https://tailwindcss.com) for styling.
- [json-server](https://github.com/typicode/json-server) for a fake API.
- [pnpm](https://pnpm.io) as the package manager.
- [Redux](https://redux.js.org) for state management.

## Features

- ShadCN Calendar Component: A customizable calendar component integrated into the project.
- Interaction via Redux: Components interact seamlessly using Redux for state management.
- Fake API: json-server is used to mock a backend API for testing purposes.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v16 or newer)
- pnpm (v8 or newer)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install dependencies:
   ```bash
   pnpm install
   pnpm add json-server
   ```

### Running the Project

1. Start the fake API server:
   ```bash
   pnpm exec json-server -p 2000 db.json #or
   pnpm json-server --watch db.json --port 2000
   ```
2. Start the development server:
   ```bash
   pnpm dev
   ```
3. Open your browser and navigate to `http://localhost:5173`.

## Folder Structure

```
auu-futsal
├─ src
│  ├─ App.tsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  │  ├─ CalendarForm.tsx
│  │  ├─ Jam.tsx
│  │  └─ ui
│  ├─ hooks
│  │  └─ use-toast.ts
│  ├─ index.css
│  ├─ lib
│  │  ├─ axios.ts
│  │  └─ utils.ts
│  ├─ main.tsx
│  ├─ pages
│  │  └─ HomePage.tsx
│  ├─ store
│  │  ├─ date.ts
│  │  ├─ jam.ts
│  │  ├─ store.ts
│  └─ vite-env.d.ts
├─ tailwind.config.js
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```

## Social Accounts

Stay connected for updates and more projects:

- **GitHub**: <a href="https://github.com/wpao" target="_blank">github.com/wpao</a>
- **YouTube**: <a href="https://www.youtube.com/@codesal-54" target="_blank">youtube.com/@codesal-54</a>
- **Instagram**: <a href="https://www.instagram.com/paozanwa22/" target="_blank">instagram.com/paozanwa22</a>

## License

This project is licensed under the MIT License. See the LICENSE file for more information.

## Contributing

Feel free to fork the project and submit pull requests. Contributions are welcome!

## API

### req jam

```ts
http://localhost:2000/booking?=2025-01-13

{
"name": "",
"price": 0,
"wa": 0,
"jam": 8,
"bayar": false
}
```

response

```json
{
"id": 8,
"name": "",
"price": 0,
"wa": 0,
"jam": 8,
"bayar": false
},
```

### req WA

```ts
http://localhost:2000/booking?=0819876543241

{
"wa": 0819876543241,
}
```

response

```json
{
"id": 8,
"name": "aa",
"price": 50000,
"wa": 0819876543241,
"jam": 8,
"bayar": false
},
```

<!-- task -->
<!-- Jam.tsx
jika tombol submit di tekan, munculkan popup
-->
