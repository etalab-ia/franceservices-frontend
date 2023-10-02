import React from "react";
import ReactDOM from "react-dom/client";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Root } from "./components/Root"

startReactDsfr({ "defaultColorScheme": "system", Link });

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    </React.StrictMode>
);