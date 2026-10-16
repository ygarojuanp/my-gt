import './App.css';
import { Header } from './components/Header';
import Home from './Pages/Home';
import Greetings from './components/Greetings';

function App() {
  return (
    <>
      <Header brand='Geração Tech' description='Sede Bezerra'>
        <a href='#equipe'>Equipe</a>
        <a href='#aprendizado'>Aprendizado</a>
      </Header>

      <h1>Esse é o minha aplicação com React</h1>
      <main className='container'>
        <Home />
      </main>
    </>
  );
}

export default App;
