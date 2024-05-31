import { createFileRoute, redirect } from '@tanstack/react-router';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useAuth } from '../../../../providers/AuthProvider';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import {
  getStaffAnnualRequests,
  updateLeaveRequest,
} from '../../../../services/annual';
import { RequestStatus } from '../../../../types/types';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import LeaveTable from '../../../../components/LeaveTable';
import Modal from '../../../../components/Modal';

export const Route = createFileRoute(
  '/_layout/_authenticated/staff/staff-requests'
)({
  beforeLoad: async ({ context }) => {
    const isManager = context.auth.user?.isManager;

    if (!isManager) {
      throw redirect({
        to: '/',
      });
    }
  },
  component: StaffRequests,
});

function StaffRequests() {
  const managerId = useAuth().user?.id;
  const [approveModal, setApproveModal] = useState<boolean>(false);
  const [rejectModal, setRejectModal] = useState<boolean>(false);
  const [requestId, setRequestId] = useState<number | null>(null);

  const [annualLeavesQuery] = useQueries({
    queries: [
      {
        queryKey: ['annual_requests'],
        queryFn: () => getStaffAnnualRequests(Number(managerId)),
      },
    ],
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: { requestId: number; status: RequestStatus }) => {
      const { requestId, status } = data;
      return updateLeaveRequest(requestId, status);
    },
    onSuccess: () => {
      toast.success('Request answer sent successfully');
      setApproveModal(false);
      setRejectModal(false);
      queryClient.invalidateQueries({ queryKey: ['annual_requests'] });
    },
    onError: (error) => {
      toast.error(error.message);
      setApproveModal(false);
      setRejectModal(false);
    },
  });

  if (annualLeavesQuery.isPending) {
    return (
      <div className="m-auto">
        <LoadingSpinner />
      </div>
    );
  }
  if (annualLeavesQuery.isError) {
    <span className="text-red-800 text-xl m-auto">
      Error: {'Something went wrong, try again later'}
    </span>;
  }

  const annualLeaveRequests = annualLeavesQuery?.data || [];

  const handleReject = (requestId: number) => {
    setRequestId(requestId);
    setRejectModal(true);
  };
  const handleApprove = (requestId: number) => {
    setRequestId(requestId);
    setApproveModal(true);
  };

  return (
    <div className="mx-4 w-full">
      <section className="space-y-5">
        <div>
          <h2 className="text-2xl">Annual Leave Requests</h2>
          <p className="text-slate-500">
            You can approve or reject your employees' requests here.
          </p>
        </div>
        {annualLeaveRequests.length > 0 ? (
          <LeaveTable
            data={annualLeaveRequests}
            managerTable={true}
            rejectHandler={handleReject}
            approveHandler={handleApprove}
          />
        ) : (
          <p className="text-center text-red-600">
            There are no requests to show.
          </p>
        )}
      </section>
      <Toaster />
      <Modal
        title="Approve Request"
        description="Are you sure approve annual leave request?"
        onClose={() => setApproveModal(false)}
        onClick={() => {
          if (requestId !== null) {
            mutation.mutate({ requestId: requestId, status: 'approved' });
          }
        }}
        buttonText="Yes"
        isOpen={approveModal}
        isLoading={mutation.isPending}
      />
      <Modal
        title="Reject Request"
        description="Are you sure reject annual leave request?"
        onClose={() => setApproveModal(false)}
        onClick={() => {
          if (requestId !== null) {
            mutation.mutate({ requestId: requestId, status: 'rejected' });
          }
        }}
        buttonText="Yes"
        isOpen={rejectModal}
        isLoading={mutation.isPending}
      />
    </div>
  );
}
