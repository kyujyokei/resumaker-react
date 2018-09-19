import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://obscure-journey-65698.herokuapp.com/'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;