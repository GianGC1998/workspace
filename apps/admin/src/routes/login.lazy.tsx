import { createLazyFileRoute } from '@tanstack/react-router';
import { Login } from '../views/login';

export const Route = createLazyFileRoute('/login')({
  component: Login,
});
