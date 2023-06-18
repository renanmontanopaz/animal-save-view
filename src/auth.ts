import axios from 'axios';

// Obtém o token do localStorage
const token = localStorage.getItem('token');

// Configura o token como um cabeçalho padrão em todas as requisições
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Exporta a instância do axios configurada
export default axios;