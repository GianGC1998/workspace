import { createFileRoute } from '@tanstack/react-router';
import { ItemsView } from '../../../views/items';

export const Route = createFileRoute('/datos/items/')({
  component: () => <ItemsView />,
});
