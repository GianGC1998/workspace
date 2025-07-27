import { createFileRoute } from '@tanstack/react-router';
import { CreateEditItemPage } from '../../../../views/items/create-edit';

export const Route = createFileRoute('/datos/items/edit/$id')({
  component: () => <CreateEditItemPage isEdit={true} />,
});
