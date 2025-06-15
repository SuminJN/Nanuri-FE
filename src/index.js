import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { MaterialUIControllerProvider } from "context";
import { RecoilRoot } from "recoil";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <BrowserRouter basename={`${process.env.REACT_APP_PUBLIC_URL}`}>
    <MaterialUIControllerProvider>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
