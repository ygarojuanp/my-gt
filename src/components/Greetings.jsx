import './Greetings.css';

function Greetings({ nome, mensagem = "Seja bem vindes!" }) {
    return (
        <div className="greeting">
            <span className="greeting__eyebrow"></span>
            <h1>{nome}, {mensagem}!</h1>
            <h2>Notícias em Destaque</h2>
            <p>Fique por dentro das principais notícias!

                Bem-vindo à nossa página de notícias! Aqui você encontra informações sobre os principais acontecimentos da atualidade, com conteúdos sobre tecnologia, educação, saúde, economia, esportes e muito mais.

                Nosso objetivo é levar informação de forma simples, clara e acessível, ajudando você a acompanhar os acontecimentos mais importantes do Brasil e do mundo.

                Acompanhe nossas atualizações e fique sempre bem informado. Afinal, estar por dentro das notícias é uma ótima maneira de conhecer melhor o mundo ao nosso redor!</p>
        </div>
    );
}
export default Greetings;