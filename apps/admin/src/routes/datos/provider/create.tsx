import { createFileRoute } from '@tanstack/react-router';
import { CreateEditProviderPage } from '../../../views/provider/create-edit';

export const Route = createFileRoute('/datos/provider/create')({
  component: () => <CreateEditProviderPage isEdit={false} />,
});
