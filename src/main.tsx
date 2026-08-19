import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// Fonts are self-hosted so nothing blocks the first paint on a third-party host.
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/600.css'
import '@fontsource/space-grotesk/700.css'
import './index.css'

// This site has no wallet/web3 code and never touches `window.ethereum`.
// Browser wallet extensions (MetaMask, Phantom, Coinbase Wallet, etc.) inject
// themselves into every page they run on and can throw when multiple wallet
// extensions fight over `window.ethereum`, or when the extension's own
// content script fails. Those errors originate entirely from the extension,
// not from this app, so they're swallowed here to keep the console/error
// overlay clean instead of surfacing noise the app has no control over.
const isInjectedWalletNoise = (message: unknown, source?: unknown) => {
  const text = String(message ?? '');
  const src = String(source ?? '');
  return (
    /ethereum|metamask|web3|wallet/i.test(text) ||
    src.startsWith('chrome-extension://') ||
    src.startsWith('moz-extension://')
  );
};

window.addEventListener(
  'error',
  (event) => {
    if (isInjectedWalletNoise(event.message, event.filename)) {
      event.preventDefault();
    }
  },
  true,
);

window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason?.message ?? event.reason;
  if (isInjectedWalletNoise(reason)) {
    event.preventDefault();
  }
});

createRoot(document.getElementById("root")!).render(<App />);
