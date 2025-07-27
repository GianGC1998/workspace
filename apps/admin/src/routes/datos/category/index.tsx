import { createFileRoute } from '@tanstack/react-router';
import { CategoryView } from '../../../views/category';

export const Route = createFileRoute('/datos/category/')({
  component: () => <CategoryView />,
});
