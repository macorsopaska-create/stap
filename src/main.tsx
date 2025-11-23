import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// Suppress external deployment name errors from surfacing in the app runtime
if (typeof window !== 'undefined') {
  const originalOnError = window.onerror;
  window.onerror = (message, source, lineno, colno, error) => {
    if (typeof message === 'string' && message.includes('The name contains invalid characters')) {
      return true; // prevent default handler
    }
    return originalOnError ? originalOnError(message as any, source as any, lineno as any, colno as any, error as any) : false;
  };

  window.addEventListener('error', (event: ErrorEvent) => {
    const msg = event.message || (event.error && (event.error as any).message) || '';
    if (typeof msg === 'string' && msg.includes('The name contains invalid characters')) {
      event.preventDefault();
    }
  });

  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    if (args.some(a => typeof a === 'string' && a.includes('The name contains invalid characters'))) {
      return; // swallow specific noisy error
    }
    originalConsoleError(...args);
  };
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);