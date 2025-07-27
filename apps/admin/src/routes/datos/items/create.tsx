import { createFileRoute } from '@tanstack/react-router';
import { CreateEditItemPage } from '../../../views/items/create-edit';

export const Route = createFileRoute('/datos/items/create')({
  component: () => <CreateEditItemPage isEdit={false} />,
});
