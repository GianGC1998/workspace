import { createFileRoute } from '@tanstack/react-router';
import { CreateEditProviderPage } from '../../../../views/provider/create-edit';

export const Route = createFileRoute('/datos/provider/edit/$id')({
  component: () => <CreateEditProviderPage isEdit={true} />,
});
