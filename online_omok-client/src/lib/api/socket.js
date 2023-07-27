import io from 'socket.io-client';

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

// export const createSocket = () => {
//     return io(ENDPOINT, { closeOnBeforeunload: false });
// };

export default io(ENDPOINT, { closeOnBeforeunload: false });
