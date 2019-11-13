import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-ad56a.firebaseio.com/'
});

export default instance;