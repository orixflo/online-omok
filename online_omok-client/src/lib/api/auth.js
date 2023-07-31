import client from './client';

export const guestLogin = ({ nickname }) => client.post('/api/auth/guestlogin', { nickname });

export const check = () => client.get('/api/auth/check');
