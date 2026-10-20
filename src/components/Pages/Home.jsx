import { useState } from 'react';
import Greetings from '../Greetings';
import UserCard from '../UserCard';

const team = [
    {
        id: 1,
        name: 'Mauricinho',
        age: 25,
        profession: 'Desenvolvedor Front-end',
        avatarUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
        isMentor: true,
        focus: 'Componentes e acessibilidade',
    },
    {
        id: 2,
        name: 'Mirian da Mary Kay',
        age: 23,
        profession: 'Desenvolvedora Back-end',
        avatarUrl: 'https://randomuser.me/api/portraits/women/19.jpg',
        focus: 'Integração entre serviços',
    },
    {
        id: 3,
        name: 'Silvan da Silva Feitoza',
        age: 42,
        profession: 'Analista de qualidade',
        avatarUrl: 'https://randomuser.me/api/portraits/men/31.jpg',
        focus: 'Testes e experiência do usuário',
    },
];

function Home() {
    const [abacaxi, setAbacaxi] = useState('');

    return (
        <>
            <div className="hero-panel">
                <div className="name-form">
                    <label htmlFor="visitor-name">Como podemos chamar você?</label>
                    <input
                        id="visitor-name"
                        type="text"
                        value={abacaxi}
                        onChange={(event) => setAbacaxi(event.target.value)}
                        placeholder="Digite seu nome"
                    />
                </div>

                <div id="aprendizado">
                    <Greetings nome={abacaxi || 'Visitante'} />
                </div>
            </div>

            <section id="equipe" className="team-section">
                <div className="section-heading">
                    <div>
                        <span className="section-label">Capital Humano</span>
                        <h2>Conheça nossa equipe</h2>
                    </div>
                    <span className="counter">{team.length} pessoas</span>
                </div>
                <div className="team-grid">
                    {team.map((person) => (
                        <UserCard key={person.id} {...person}>
                            <p className="card-note">Foco: {person.focus}</p>
                        </UserCard>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Home;