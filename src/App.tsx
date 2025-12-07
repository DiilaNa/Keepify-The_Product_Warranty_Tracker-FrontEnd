import { Toaster } from 'sonner';
import './App.css'
import { ThemeProvider } from './components/theme-provider'
import Router from './routes/Route'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster position="top-right" />
      <Router />
    </ThemeProvider>
  );
}

export default App
