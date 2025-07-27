import { Api } from '@workspace/api-types';

const api = new Api({
  baseURL: 'http://localhost:3001', // TODO: env
  withCredentials: true,
});

export { api };
