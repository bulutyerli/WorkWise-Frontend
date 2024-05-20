import { createFileRoute } from '@tanstack/react-router';
import AnnualTable from '../../../../components/AnnualTable';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import {
  getAnnualLeaves,
  getCurrentAnnual,
  newAnnualRequest,
} from '../../../../services/annual';
import { useAuth } from '../../../../providers/AuthProvider';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import DatePicker from '../../../../components/DatePicker';
import toast, { Toaster } from 'react-hot-toast';
import Modal from '../../../../components/Modal';
import { useState } from 'react';

export const Route = createFileRoute(
  '/app/_layout/_authenticated/annual-leave'
)({
  component: AnnualLeave,
});

function AnnualLeave() {
  const userId = useAuth().user!.id;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [date, setDates] = useState<[Date, Date]>([new Date(), new Date()]);

  const queryClient = useQueryClient();

  const [annualQuery, currentAnnualQuery] = useQueries({
    queries: [
      {
        queryKey: ['annual_leaves'],
        queryFn: () => getAnnualLeaves(userId),
      },
      {
        queryKey: ['current_annual'],
        queryFn: () => getCurrentAnnual(userId),
      },
    ],
  });

  const mutation = useMutation({
    mutationFn: () => {
      const data = {
        starting_date: date[0].toISOString(),
        end_date: date[1].toISOString(),
        firebase_id: userId,
      };
      return newAnnualRequest(data);
    },
    onSuccess: () => {
      setIsModalOpen(false);
      toast.success('Your leave request has been sent');
      queryClient.invalidateQueries({ queryKey: ['annual_leaves'] });
    },
    onError: (error) => {
      setIsModalOpen(false);
      console.log(error);
      toast.error('Something went wrong, try again');
    },
  });

  const getDates = (dates: [Date, Date]) => {
    console.log(dates);
    setIsModalOpen(true);
    setDates(dates);
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
          <AnnualTable data={pendingLeaves} />
        ) : (
          <span>You don't have any pending leave requests.</span>
        )}
      </section>
      <section>
        <h2 className="text-xl text-green-700">Past Annual Leaves</h2>
        <h3 className="text-sm text-slate-500 mb-2">
          List of all approved annual leave requests
        </h3>
        <AnnualTable data={approvedLeaves} />
      </section>
      <section className="">
        <h2 className="text-xl text-red-600">Rejected Leave Requests</h2>
        <h3 className="text-sm text-slate-500 mb-2">
          List of all previously rejected annual leave requests
        </h3>
        {rejectedLeaves.length > 0 ? (
          <AnnualTable data={rejectedLeaves} />
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
      />
    </div>
  );
}
