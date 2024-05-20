import { createFileRoute, redirect } from '@tanstack/react-router';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import {
  createNewStaff,
  getAllCategories,
} from '../../../../../services/staff';
import { NewStaffType } from '../../../../../types/types';
import LoadingSpinner from '../../../../../components/LoadingSpinner';
import NewStaffForm from '../../../../../components/NewStaffForm';

export const Route = createFileRoute(
  '/app/_layout/_authenticated/staff/add-new'
)({
  beforeLoad: async ({ context }) => {
    const auth = context.auth.isAuthenticated;
    const isAdmin = context.auth.user?.isAdmin;

    if (!auth || (auth && !isAdmin)) {
      throw redirect({
        to: '/app/staff',
      });
    }
  },
  component: AddNew,
});

function AddNew() {
  const [formReset, setFormReset] = useState<boolean>(false);

  const { isPending, data, isError, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getAllCategories(),
  });

  const mutation = useMutation({
    mutationFn: (newStaff: NewStaffType) => {
      return createNewStaff(newStaff);
    },
    onSuccess: () => {
      toast.success('New staff created successfully');
      setFormReset(true);
    },
    onError: (error) => {
      toast.error(error.message);
      setFormReset(true);
    },
  });

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const categories = data ?? [];

  return (
    <div>
      <NewStaffForm
        data={categories}
        isLoading={mutation.isPending}
        formData={mutation.mutate}
        formReset={formReset}
      />
      <Toaster />
    </div>
  );
}
