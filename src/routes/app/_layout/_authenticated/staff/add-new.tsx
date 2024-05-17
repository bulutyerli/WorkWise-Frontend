import { createFileRoute } from '@tanstack/react-router';
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
    onError: () => {
      toast.error('Failed to create new staff');
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
