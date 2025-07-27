import { createFileRoute } from '@tanstack/react-router';
import { ItemDetailView } from '../../../../views/items/detail';

export const Route = createFileRoute('/datos/items/view/$id')({
  component: () => <ItemDetailView />,
});
