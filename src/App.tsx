import './App.css'
import { ThemeProvider } from './components/theme-provider'
import Router from './routes/Route'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router />
    </ThemeProvider>
  );
}

export default App
