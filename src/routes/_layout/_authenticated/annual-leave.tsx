import { createFileRoute } from '@tanstack/react-router';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useAuth } from '../../../providers/AuthProvider';
import {
  deleteLeaveRequest,
  getAnnualLeaves,
  getCurrentAnnual,
  newAnnualRequest,
} from '../../../services/annual';
import LoadingSpinner from '../../../components/LoadingSpinner';
import DatePicker from '../../../components/DatePicker';
import LeaveTable from '../../../components/LeaveTable';
import Modal from '../../../components/Modal';

export const Route = createFileRoute('/_layout/_authenticated/annual-leave')({
  component: AnnualLeave,
});

function AnnualLeave() {
  const auth = useAuth();
  const firebase_id = auth.user?.firebase_id;
  const id = auth.user?.id;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dates, setDates] = useState<[Date, Date]>([new Date(), new Date()]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [requestToDelete, setRequestToDelete] = useState<number>();

  const queryClient = useQueryClient();

  const [annualQuery, currentAnnualQuery] = useQueries({
    queries: [
      {
        queryKey: ['annual_leaves'],
        queryFn: () => getAnnualLeaves(id!.toString()),
      },
      {
        queryKey: ['current_annual'],
        queryFn: () => getCurrentAnnual(id!.toString()),
      },
    ],
  });

  const mutation = useMutation({
    mutationFn: () => {
      if (!firebase_id || !id) {
        toast.error('User information is missing');
        throw new Error('User information is missing');
      }
      const data = {
        starting_date: dates[0].toISOString(),
        end_date: dates[1].toISOString(),
        firebase_id: firebase_id,
        user_id: id,
      };
      return newAnnualRequest(data);
    },
    onSuccess: () => {
      setIsModalOpen(false);
      toast.success('Your leave request has been sent');
      queryClient.invalidateQueries({ queryKey: ['annual_leaves'] });
    },
    onError: () => {
      setIsModalOpen(false);
      toast.error('Something went wrong, try again');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => {
      return deleteLeaveRequest(Number(requestToDelete));
    },
    onSuccess: () => {
      setDeleteModal(false);
      toast.success('Your leave request has been deleted');
      queryClient.invalidateQueries({ queryKey: ['annual_leaves'] });
    },
    onError: () => {
      setDeleteModal(false);
      toast.error('Deletion failed, try again.');
    },
  });

  const getDates = (dates: [Date, Date]) => {
    setIsModalOpen(true);
    setDates(dates);
  };

  const getRequest = (requstId: number) => {
    setDeleteModal(true);
    setRequestToDelete(requstId);
  };

  if (annualQuery.isPending || currentAnnualQuery.isPending) {
    return (
      <div className="m-auto">
        <LoadingSpinner />
      </div>
    );
  }
  if (annualQuery.isError || currentAnnualQuery.isError) {
    <span className="text-red-800 text-xl m-auto">
      Error: {'Something went wrong, try again later'}
    </span>;
  }

  const approvedLeaves =
    annualQuery?.data?.filter((item) => item.status === 'approved') || [];

  const pendingLeaves =
    annualQuery?.data?.filter((item) => item.status === 'pending') || [];

  const rejectedLeaves =
    annualQuery?.data?.filter((item) => item.status === 'rejected') || [];

  const currentAnnual = currentAnnualQuery?.data;

  return (
    <div className="space-y-10 w-full sm:max-w-[70%] mx-auto px-2">
      <section className="space-y-5">
        <h2 className="text-2xl mb-2 text-slate-600">
          Request New Annual Leave
        </h2>
        <p className="text-slate-500">
          Select two dates for your annual leave request.
        </p>
        <p className="text-center text-purple-600">
          You have {currentAnnual} days available
        </p>
        <DatePicker handleSubmit={getDates} />
      </section>
      <section>
        <h2 className="text-xl text-purple-700">Pending Leave Requests</h2>
        <h3 className="text-sm text-slate-500 mb-2">
          List of all annual leave requests pending for manager approval
        </h3>
        {pendingLeaves.length > 0 ? (
          <LeaveTable data={pendingLeaves} deleteHandler={getRequest} />
        ) : (
          <span>You don't have any pending leave requests.</span>
        )}
      </section>
      <section>
        <h2 className="text-xl text-green-700">Past Annual Leaves</h2>
        <h3 className="text-sm text-slate-500 mb-2">
          List of all approved annual leave requests
        </h3>
        {approvedLeaves.length > 0 ? (
          <LeaveTable data={approvedLeaves} />
        ) : (
          <span>You don't have any approved leave requests yet.</span>
        )}
      </section>
      <section className="">
        <h2 className="text-xl text-red-600">Rejected Leave Requests</h2>
        <h3 className="text-sm text-slate-500 mb-2">
          List of all previously rejected annual leave requests
        </h3>
        {rejectedLeaves.length > 0 ? (
          <LeaveTable data={rejectedLeaves} />
        ) : (
          <span className="text-center">
            You don't have any rejected leave requests.
          </span>
        )}
      </section>
      <Toaster />
      <Modal
        title="Submit request"
        description="Are you sure?"
        onClick={mutation.mutate}
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        buttonText="Yes"
        isLoading={mutation.isPending}
      />
      <Modal
        title="Delete Annual Leave Request?"
        description="Are you sure you want to delete this leave request?"
        onClick={deleteMutation.mutate}
        onClose={() => setDeleteModal(false)}
        isOpen={deleteModal}
        buttonText="Delete"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
