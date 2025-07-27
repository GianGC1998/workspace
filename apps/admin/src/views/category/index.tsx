import { Roles } from '@workspace/api-types';
import { FC, useState } from 'react';
import { MainLayout } from '../../components/main-layout';
import { api } from '../../lib/api';
import { useQuery } from '@tanstack/react-query';
import DataTable from '../../components/table/dataTable';
import { useColumns } from './columns';
import SectionContainer from '../../components/main-layout/sectionContainer';
import SearchAndCreate from '../../components/search-and-create';
import { useDebounce } from '../../hooks';
import { useTranslation } from '../../i18n/hooks/useTranslation';
import { useNavigate } from '@tanstack/react-router';

const Page: FC = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const columns = useColumns();

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['categories', debouncedSearch, page],
    queryFn: () =>
      api.categoryControllerFindAll({ page, search: debouncedSearch }),
    select: (data) => data.data,
  });

  return (
    <SectionContainer title={t('navigation.categories')} error={error?.message}>
      <SearchAndCreate
        search={search}
        onSearchChange={setSearch}
        onSearch={() => (page === 1 ? refetch() : setPage(1))}
        onCreateClick={() => navigate({ to: '/datos/category/create' })}
        createButtonText={t('categories.createCategory')}
        searchPlaceholder={t('form.searchPlaceholder')}
      />
      <DataTable
        data={data?.data ?? []}
        columns={columns}
        loading={isLoading}
        total={data?.total}
        currentPage={page}
        onPageChange={setPage}
      />
    </SectionContainer>
  );
};

export const CategoryView = () => {
  return (
    <MainLayout allowedRoles={[Roles.SUPERADMIN]}>
      <Page />
    </MainLayout>
  );
};
