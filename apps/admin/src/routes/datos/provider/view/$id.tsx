import { createFileRoute } from '@tanstack/react-router';
import { ProviderDetailView } from '../../../../views/provider/detail';

export const Route = createFileRoute('/datos/provider/view/$id')({
  component: () => <ProviderDetailView />,
});
