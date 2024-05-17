import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import UpdateStaffForm from '../../../../../../components/UpdateStaffForm';
import { useState } from 'react';
import { useMutation, useQueries } from '@tanstack/react-query';
import {
  getAllCategories,
  getStaffById,
  updateStaff,
} from '../../../../../../services/staff';
import toast, { Toaster } from 'react-hot-toast';
import LoadingSpinner from '../../../../../../components/LoadingSpinner';
import { StaffData } from '../../../../../../types/types';

export const Route = createFileRoute('/app/_layout/staff/update/$staffId/')({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/app/auth/sign-in' });
    }
  },
  component: UpdateStaff,
});

function UpdateStaff() {
  const [formReset, setFormReset] = useState<boolean>(false);
  const { staffId } = Route.useParams();
  const navigate = useNavigate();

  const [categoryQuery, staffDataQuery] = useQueries({
    queries: [
      { queryKey: ['categories'], queryFn: () => getAllCategories() },
      {
        queryKey: ['staff', staffId],
        queryFn: () => getStaffById(parseInt(staffId)),
      },
    ],
  });

  const mutation = useMutation({
    mutationFn: (staffData: StaffData) => {
      return updateStaff(Number(staffId), staffData);
    },
    onSuccess: () => {
      toast.success('Staff updated successfully');
      setFormReset(true);
      navigate({ to: '/app/staff/$staffId', params: { staffId } });
    },
    onError: () => {
      toast.error('Failed to update staff');
      setFormReset(true);
    },
  });

  if (categoryQuery.isPending || staffDataQuery.isPending) {
    return <LoadingSpinner />;
  }

  if (categoryQuery.isError) {
    return <span>Error: {categoryQuery.error.message}</span>;
  }

  if (staffDataQuery.isError) {
    return <span>Error: {staffDataQuery.error.message}</span>;
  }

  const categories = categoryQuery.data ?? [];
  const staffData = staffDataQuery.data ?? [];

  return (
    <div>
      <UpdateStaffForm
        data={categories}
        isLoading={mutation.isPending}
        formData={mutation.mutate}
        formReset={formReset}
        staffData={staffData}
      />
      <Toaster />
    </div>
  );
}
