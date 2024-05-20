import { useMutation, useQueries } from '@tanstack/react-query';
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  FaPhoneAlt,
  FaBirthdayCake,
  FaRegHospital,
  FaSignature,
} from 'react-icons/fa';
import { GiIsland } from 'react-icons/gi';
import { GiMoneyStack } from 'react-icons/gi';
import { MdAbc } from 'react-icons/md';
import { ImOffice } from 'react-icons/im';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { deleteStaff, getStaffById } from '../../../../../../services/staff';
import LoadingSpinner from '../../../../../../components/LoadingSpinner';
import dateFormat from '../../../../../../utils/dateFormat';
import Modal from '../../../../../../components/Modal';
import CustomButton from '../../../../../../components/CustomButton';
import { useAuth } from '../../../../../../providers/AuthProvider';
import { getCurrentAnnual } from '../../../../../../services/annual';

export const Route = createFileRoute(
  '/app/_layout/_authenticated/staff/$staffId/'
)({
  component: StaffDetails,
});

function StaffDetails() {
  const isAdmin = useAuth().user?.isAdmin;
  const { staffId }: { staffId: number } = Route.useParams();
  const [modal, setModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const [staffQuery, annualQuery] = useQueries({
    queries: [
      {
        queryKey: ['staff', staffId],
        queryFn: () => getStaffById(staffId),
      },
      {
        queryKey: ['annual_leave', staffId],
        queryFn: () => getCurrentAnnual(staffId),
      },
    ],
  });

  const mutation = useMutation({
    mutationFn: () => {
      return deleteStaff(staffId);
    },
    onError: (error) => {
      toast.error(error.message);
      setModal(false);
    },
    onSuccess: () => {
      setModal(false);
      navigate({ to: '/app/staff' });
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  if (staffQuery.isPending) {
    return (
      <div className="m-auto">
        <LoadingSpinner />
      </div>
    );
  }
  if (staffQuery.isError) {
    return (
      <span className="text-red-800 text-xl m-auto">
        Error: {staffQuery.error.message}
      </span>
    );
  }
  const {
    name,
    surname,
    birthday,
    salary,
    join_date,
    sickness_leave,
    phone,
    department,
    role,
    shift,
    email,
    office,
  } = staffQuery.data;

  const formatSalary = `$${salary}`;
  const joinDate = dateFormat(join_date);
  const newBirthday = dateFormat(birthday);

  const annual_leave = annualQuery?.data?.data;

  const handleClose = () => {
    setModal(false);
  };

  return (
    <section className="w-full mx-2 md:mx-20">
      <h2 className="text-red-700 mb-5">Staff Details</h2>

      <article className="flex flex-col md:mx-auto mt-10 lg:text-xl">
        <div className="flex justify-between items-center mb-10">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl lg:text-4xl xl:text-6xl text-slate-600 border-b-red-300 border-b-2">
              {name} {surname}
            </h3>
            <div className="flex justify-between">
              <span className="text-lg lg:text-xl xl:text-3xl text-slate-600">
                {role}
              </span>
              <span className="text-lg lg:text-xl xl:text-3xl italic text-slate-500">
                {department}
              </span>
            </div>
          </div>
        </div>
        <div className="mb-10">
          <div className="flex space-x-2 text-slate-600 items-center border-b-2 w-40 mb-1">
            <GiMoneyStack />
            <h4>Email</h4>
          </div>
          <a href={`mailto:${email}`} className="text-slate-900">
            {email}
          </a>
        </div>
        <div className="flex flex-col md:flex-row lg:gap-60 ">
          {shift && (
            <div className="mb-10">
              <div className="flex space-x-2 text-slate-600 items-center border-b-2 w-44 mb-1">
                <MdAbc />
                <h4>Shift</h4>
              </div>
              <span className="text-slate-900">{shift}</span>
            </div>
          )}

          <div className="mb-10">
            <div className="flex space-x-2 text-slate-600 items-center border-b-2 w-44 mb-1">
              <FaPhoneAlt />
              <h4>Phone</h4>
            </div>
            <span className="text-slate-900">{phone}</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row lg:gap-60">
          <div className="mb-10">
            <div className="flex space-x-2 text-slate-600 items-center border-b-2 w-44 mb-1">
              <FaSignature />
              <h4>Join Date</h4>
            </div>
            <span className="text-slate-900">{joinDate}</span>
          </div>
          <div className="mb-10">
            <div className="flex space-x-2 text-slate-600 items-center border-b-2 w-44 mb-1">
              <FaBirthdayCake />
              <h4>Birthdate</h4>
            </div>
            <span className="text-slate-900">{newBirthday}</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row lg:gap-60">
          <div className="mb-10">
            {annualQuery.isPending ? (
              <LoadingSpinner />
            ) : (
              <div className="flex space-x-2 text-slate-600 items-center border-b-2 w-44 mb-1">
                <GiIsland />
                <h4 className="text-nowrap">Annual Leave Left</h4>
              </div>
            )}
            <span className="text-slate-900">{annual_leave}</span>
          </div>
          <div className="mb-10 text-nowrap">
            <div className="flex space-x-2 text-slate-600 items-center border-b-2 w-44 mb-1">
              <FaRegHospital />
              <h4 className="text-nowrap">Used Sickness Leave</h4>
            </div>
            <span className="text-slate-900">{sickness_leave}</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row lg:gap-60">
          <div className="mb-10">
            <div className="flex space-x-2 text-slate-600 items-center border-b-2 w-44 mb-1">
              <ImOffice />
              <h4>Office</h4>
            </div>
            <span className="text-slate-900">{office}</span>
          </div>
          <div className="mb-10">
            <div className="flex space-x-2 text-slate-600 items-center border-b-2 w-44 mb-1">
              <GiMoneyStack />
              <h4>Salary</h4>
            </div>
            <span className="text-slate-900">{formatSalary}</span>
          </div>
        </div>
      </article>
      {isAdmin && (
        <div className="flex gap-5">
          <Link
            className="inline-flex justify-center items-center text-purple-600 font-semibold hover:underline hover:text-purple-700"
            to="/app/staff/update/$staffId"
            params={{ staffId: String(staffQuery.data.id) }}
          >
            Edit
          </Link>

          <CustomButton
            text="Delete"
            color="danger"
            isLoading={mutation.isPending}
            onClick={() => setModal(true)}
          />
        </div>
      )}
      {modal && (
        <Modal
          title="Delete Staff"
          description="Are you sure you want to delete this staff member? This action cannot be undone."
          onClick={handleDelete}
          isOpen={modal}
          onClose={handleClose}
          buttonText="Delete"
        />
      )}
      <Toaster />
    </section>
  );
}
