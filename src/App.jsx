import { ThemeProvider } from './contexts/ThemeContext';
import { I18nProvider } from './contexts/i18nContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <div className="App min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
          <Header />
          <main>
            <HomePage />
          </main>
          <Footer />
        </div>
      </I18nProvider>
    </ThemeProvider>
  );
}

export default App;