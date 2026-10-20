import { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import Home from './components/Pages/Home';
import Contact from './components/Pages/Contact';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);

    if (page === 'contact') {
      return;
    }

    setTimeout(() => {
      const targetId = page === 'inicio' ? 'top' : page;
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 0);
  };

  return (
    <>
      <Header brand='Geração Tech' description='Sede Bezerra'>
        <button type='button' onClick={() => handleNavigate('inicio')} className='nav-button'>
          Início
        </button>
        <button type='button' onClick={() => handleNavigate('equipe')} className='nav-button'>
          Equipe
        </button>
        <button type='button' onClick={() => handleNavigate('aprendizado')} className='nav-button'>
          Aprendizado
        </button>
        <button type='button' onClick={() => handleNavigate('contact')} className='nav-button'>
          Contato
        </button>
      </Header>

      <main id='top' className='container'>
        {currentPage === 'home' || currentPage === 'inicio' || currentPage === 'equipe' || currentPage === 'aprendizado'
          ? <Home />
          : <Contact />}
      </main>
    </>
  );
}

export default App;
