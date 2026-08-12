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

createRoot(document.getElementById("root")!).render(<App />);
