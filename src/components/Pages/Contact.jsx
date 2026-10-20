import { useState } from 'react';
import './Contact.css';
import { useEffect } from 'react';

const initialForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
};

const initialAddress = {
    cep: '',
    state: '',
    city: '',
    neighborhood: '',
    street: '',
    number: '',
};

export default function Contact() {
    const [form, setForm] = useState(initialForm);
    const [address, setAddress] = useState(initialAddress);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loadingCep, setLoadingCep] = useState(false);
    const [states, setStates] = useState([]);

    function handleChange(event) {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    }

    function handleAddressChange(event) {
        const { name, value } = event.target;

        if (name === 'cep') {
            const onlyNumbers = value.replace(/\D/g, '').slice(0, 8);
            setAddress((current) => ({ ...current, cep: onlyNumbers }));
            return;
        }

        setAddress((current) => ({ ...current, [name]: value }));
    }

    async function searchByCep() {
        const cleanCep = address.cep.replace(/\D/g, '');

        if (cleanCep.length !== 8) {
            setStatus({ type: 'error', message: 'Digite um CEP válido para buscar o endereço.' });
            return;
        }

        setLoadingCep(true);

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
            if (!response.ok) {
                throw new Error('Não foi possível buscar o CEP.');
            }

            const data = await response.json();

            if (data.erro) {
                throw new Error('CEP não encontrado.');
            }

            setAddress((current) => ({
                ...current,
                cep: cleanCep,
                state: data.uf || current.state,
                city: data.localidade || current.city,
                neighborhood: data.bairro || current.neighborhood,
                street: data.logradouro || current.street,
            }));

            setStatus({ type: 'success', message: 'Endereço preenchido com sucesso pelo CEP.' });
        } catch (error) {
            setStatus({ type: 'error', message: error.message || 'Erro ao buscar o CEP.' });
        } finally {
            setLoadingCep(false);
        }
    }
    useEffect(() => {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
            .then((response) => {
                if (!response.ok) throw new Error();
                return response.json();
            })
            .then((data) => setStates(data))
            .catch(() => setStatus({ type: 'error', message: 'não foi possivel carregar os estados' }));
    }, []);

    async function searchByAddress() {
        const state = address.state.trim();
        const city = address.city.trim();
        const street = address.street.trim();

        if (!state || !city || !street) {
            setStatus({ type: 'error', message: 'Preencha Estado, Cidade e Rua para buscar pelo endereço.' });
            return;
        }

        try {
            const response = await fetch(
                `https://viacep.com.br/ws/${encodeURIComponent(state)}/${encodeURIComponent(city)}/${encodeURIComponent(street)}/json/`
            );

            if (!response.ok) {
                throw new Error('Falha ao buscar o endereço informado.');
            }

            const data = await response.json();

            if (!Array.isArray(data) || data.length === 0) {
                throw new Error('Nenhum endereço encontrado com os dados informados.');
            }

            const firstResult = data[0];

            setAddress((current) => ({
                ...current,
                cep: firstResult.cep || current.cep,
                state: firstResult.uf || current.state,
                city: firstResult.localidade || current.city,
                neighborhood: firstResult.bairro || current.neighborhood,
                street: firstResult.logradouro || current.street,
            }));

            setStatus({ type: 'success', message: 'Endereço encontrado com sucesso.' });
        } catch (error) {
            setStatus({ type: 'error', message: error.message || 'Erro ao buscar pelo endereço.' });
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!form.name || !form.email || !form.subject || !form.message) {
            setStatus({ type: 'error', message: 'Preencha todos os campos antes de enviar.' });
            return;
        }

        if (!address.cep && (!address.state || !address.city || !address.street || !address.number)) {
            setStatus({ type: 'error', message: 'Informe o endereço completo ou pelo menos o CEP.' });
            return;
        }

        setStatus({
            type: 'success',
            message: `Mensagem enviada com sucesso, ${form.name}!`,
        });
        setForm(initialForm);
        setAddress(initialAddress);
    }

    return (
        <section id="contato" className="contact-page">
            <span className="section-label">Fale com a gente</span>
            <h1>Entre em contato</h1>
            <p className="page-intro">
                Estamos aqui para ajudar. Envie sua mensagem e responderemos o quanto antes.
            </p>

            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                    <label>
                        Nome
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Seu nome"
                        />
                    </label>

                    <label>
                        E-mail
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="seuemail@email.com"
                        />
                    </label>

                    <div className="address-block full-width">
                        <h2>Endereço</h2>

                        <div className="address-grid">
                            <label>
                                CEP
                                <div className="search-inline">
                                    <input
                                        type="text"
                                        name="cep"
                                        value={address.cep}
                                        onChange={handleAddressChange}
                                        placeholder="00000-000"
                                    />
                                    <button type="button" onClick={searchByCep}>
                                        {loadingCep ? 'Buscando...' : 'Buscar CEP'}
                                    </button>
                                </div>
                            </label>

                            <label>
                                Estado
                                <select
                                    name="state"
                                    value={address.state}
                                    onChange={handleAddressChange}
                                >
                                    <option value="">Selecione</option>
                                    {states.map((state) => (
                                        <option key={state.id} value={state.sigla}>
                                            {state.nome}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Cidade
                                <input
                                    type="text"
                                    name="city"
                                    value={address.city}
                                    onChange={handleAddressChange}
                                    placeholder="São Paulo"
                                />
                            </label>

                            <label>
                                Bairro
                                <input
                                    type="text"
                                    name="neighborhood"
                                    value={address.neighborhood}
                                    onChange={handleAddressChange}
                                    placeholder="Centro"
                                />
                            </label>

                            <label className="full-width">
                                Rua
                                <input
                                    type="text"
                                    name="street"
                                    value={address.street}
                                    onChange={handleAddressChange}
                                    placeholder="Nome da rua"
                                />
                            </label>

                            <label>
                                Número
                                <input
                                    type="text"
                                    name="number"
                                    value={address.number}
                                    onChange={handleAddressChange}
                                    placeholder="123"
                                />
                            </label>
                        </div>

                        <button type="button" className="secondary-button" onClick={searchByAddress}>
                            Buscar por endereço
                        </button>
                    </div>

                    <label className="full-width">
                        Assunto
                        <input
                            type="text"
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            placeholder="Digite o assunto"
                        />
                    </label>

                    <label className="full-width">
                        Mensagem
                        <textarea
                            name="message"
                            rows="5"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Como podemos ajudar?"
                        />
                    </label>
                </div>

                {status.message && (
                    <p className={`form-status ${status.type}`}>{status.message}</p>
                )}

                <button className="submit-button" type="submit">
                    Enviar mensagem
                </button>
            </form>
        </section>
    );
}