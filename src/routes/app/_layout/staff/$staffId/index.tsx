import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { deleteStaff, getStaffById } from '../../../../../services/staff';
import dateFormat from '../../../../../utils/dateFormat';
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
import CustomButton from '../../../../../components/CustomButton';
import LoadingSpinner from '../../../../../components/LoadingSpinner';
import Modal from '../../../../../components/Modal';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export const Route = createFileRoute('/app/_layout/staff/$staffId/')({
  component: StaffDetails,
});

function StaffDetails() {
  const { staffId }: { staffId: number } = Route.useParams();
  const [modal, setModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['staff', staffId],
    queryFn: () => getStaffById(staffId),
  });

  const mutation = useMutation({
    mutationFn: () => {
      return deleteStaff(staffId);
    },
    onError: () => {
      toast.error('Could not delete staff, try again.');
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

  if (isPending) {
    return (
      <div className="m-auto">
        <LoadingSpinner />
      </div>
    );
  }
  if (isError) {
    return (
      <span className="text-red-800 text-xl m-auto">
        Error: {error.message}
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
    annual_leave,
    phone,
    department,
    role,
    shift,
    email,
    office,
  } = data;

  const formatSalary = `$${salary}`;
  const joinDate = dateFormat(join_date);
  const newBirthday = dateFormat(birthday);

  const handleEdit = () => {};
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
            <div className="flex space-x-2 text-slate-600 items-center border-b-2 w-44 mb-1">
              <GiIsland />
              <h4>Annual Leave</h4>
            </div>
            <span className="text-slate-900">{annual_leave}</span>
          </div>
          <div className="mb-10 text-nowrap">
            <div className="flex space-x-2 text-slate-600 items-center border-b-2 w-44 mb-1">
              <FaRegHospital />
              <h4>Sickness Leave</h4>
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
      <div className="flex gap-5">
        <CustomButton
          text="Edit"
          color="secondary"
          isLoading={false}
          onClick={handleEdit}
        />
        <CustomButton
          text="Delete"
          color="danger"
          isLoading={mutation.isPending}
          onClick={() => setModal(true)}
        />
      </div>
      {modal && (
        <Modal
          title="Delete Staff"
          description="Are you sure you want to delete this staff member? This action cannot be undone."
          onClick={handleDelete}
          isOpen={modal}
          onClose={handleClose}
        />
      )}
      <Toaster />
    </section>
  );
}
