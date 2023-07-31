import io from 'socket.io-client';

const ENDPOINT = process.env.REACT_APP_ENDPOINT_DEV;

export default io(ENDPOINT, { closeOnBeforeunload: false });
