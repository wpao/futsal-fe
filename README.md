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

### req jam

```ts
http://localhost:2000/2025-01-12

{
"name": "",
"price": 0,
"wa": 0,
"jam": 8,
"bayar": false
}
```

response = jam di dalam tanggal

```json
{
  "2025-01-12": [
    {
      "id": "8",
      "name": "",
      "price": 0,
      "wa": 0,
      "jam": 8,
      "bayar": false
    },
    {
      "id": "9",
      "name": "",
      "price": 0,
      "wa": 0,
      "jam": 9,
      "bayar": false
    },
    {
      "id": "10",
      "name": "Chloe",
      "price": 50000,
      "wa": 821456789034,
      "jam": 10,
      "bayar": true
    },
    {
      "id": "11",
      "name": "William",
      "price": 0,
      "wa": 821456789035,
      "jam": 11,
      "bayar": false
    },
    {
      "id": "12",
      "name": "",
      "price": 0,
      "wa": 0,
      "jam": 12,
      "bayar": false
    },
    {
      "id": "13",
      "name": "Emily",
      "price": 0,
      "wa": 821456789036,
      "jam": 13,
      "bayar": false
    },
    {
      "id": "14",
      "name": "Sebastian",
      "price": 0,
      "wa": 821456789037,
      "jam": 14,
      "bayar": false
    },
    {
      "id": "15",
      "name": "",
      "price": 0,
      "wa": 0,
      "jam": 15,
      "bayar": false
    },
    {
      "id": "16",
      "name": "",
      "price": 0,
      "wa": 0,
      "jam": 16,
      "bayar": false
    },
    {
      "id": "17",
      "name": "Aiden",
      "price": 0,
      "wa": 821456789039,
      "jam": 17,
      "bayar": false
    },
    {
      "id": "18",
      "name": "",
      "price": 0,
      "wa": 0,
      "jam": 18,
      "bayar": false
    },
    {
      "id": "19",
      "name": "Victoria",
      "price": 50000,
      "wa": 821456789040,
      "jam": 19,
      "bayar": true
    },
    {
      "id": "20",
      "name": "Elijah",
      "price": 0,
      "wa": 821456789041,
      "jam": 20,
      "bayar": false
    },
    {
      "id": "21",
      "name": "",
      "price": 0,
      "wa": 0,
      "jam": 21,
      "bayar": false
    },
    {
      "id": "22",
      "name": "",
      "price": 50000,
      "wa": 98776654321,
      "jam": 22,
      "bayar": true
    }
  ],
```
