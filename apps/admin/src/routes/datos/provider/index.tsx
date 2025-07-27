import { createFileRoute } from '@tanstack/react-router';
import { ProvidersView } from '../../../views/provider';

export const Route = createFileRoute('/datos/provider/')({
  component: () => <ProvidersView />,
});
