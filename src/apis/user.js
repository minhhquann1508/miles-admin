import axios from '../config/axios';

export const getListUsers = () => axios({
    method: 'GET',
    url: '/user'
});