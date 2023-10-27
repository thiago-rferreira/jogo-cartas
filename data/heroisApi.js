import axios from 'axios';

const API_URL = 'http://localhost:1337/api/herois';

const fetchApiData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    throw error;
  }
};

export default fetchApiData;
