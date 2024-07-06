import axios from '../config/axios';

export const signInApi = (data) => axios({
    method: 'POST',
    url: '/user/sign-in',
    data
});

export const getListUsers = (params) => axios({
    method: 'GET',
    url: '/user',
    params
});