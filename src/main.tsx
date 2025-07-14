import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

// redux
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import { reducers } from "./store/store.ts";

//
// import {
//   SidebarProvider,
//   // SidebarInset,
//   // SidebarTrigger,
// } from "@/components/ui/sidebar";

const globalStore = legacy_createStore(reducers);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={globalStore}>
      <BrowserRouter>
        {/* <SidebarProvider>
        </SidebarProvider> */}
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
