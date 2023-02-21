import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, AUTH_USER } from './types';

export function loginUser(data){
    const request = axios.post('/api/users/login', data)
                         .then(res => res.data);

    return {
        type: LOGIN_USER,
        payload: request,
    }
};

export function regitserUser(data){
    const request = axios.post('/api/users/register', data)
                         .then(res => res.data);

    return {
        type: REGISTER_USER,
        payload: request,
    };
}

export function logoutUser(){
    const request = axios.get('/api/users/logout')
                         .then(res => res.data);

    return {
        type: LOGOUT_USER,
        payload: request,
    };
}

export function auth(){
    const request = axios.get('/api/users/auth')
                         .then(res => res.data);

    return {
        type: AUTH_USER,
        payload: request,
    };
}