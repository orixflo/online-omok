import client from './client';

export const guestLogin = ({ nickname }) => client.post('/api/auth/guestlogin', { nickname });

// export const register = ({ username, nickname, password }) =>
//     client.post('/api/auth/register', { username, nickname, password });

// export const login = ({ username, password }) =>
//     client.post('/api/auth/login', { username, password });

export const check = () => client.get('/api/auth/check');
