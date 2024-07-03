import axios from '../config/axios';

export const getListProduct = (params) => axios({
    method: 'GET',
    url: '/product',
    params
});