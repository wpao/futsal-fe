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
   pnpm dev #or
   pnpm run dev
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

<!-- https://futsal.authenticrinjani.com/api/booking/create -->

```ts
https://futsal.authenticrinjani.com/api/booking/all
https://futsal.authenticrinjani.com/api/booking/create
https://futsal.authenticrinjani.com/api/booking/delete/{id}

{
  "name": "admin",
  "price": 100000,
  "wa": "081907257059",
  "time": 22,
  "date": "2025-01-22",
  "isBayar": true
}
```
