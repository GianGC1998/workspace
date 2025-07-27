import { createFileRoute } from '@tanstack/react-router';
import { CreateEditCategoryPage } from '../../../views/category/create-edit';

export const Route = createFileRoute('/datos/category/create')({
  component: () => <CreateEditCategoryPage isEdit={false} />,
});
