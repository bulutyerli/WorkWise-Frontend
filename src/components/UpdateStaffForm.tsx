import { useForm, SubmitHandler } from 'react-hook-form';
import CustomButton from './CustomButton';
import { useRouter } from '@tanstack/react-router';
import { AllCategoriesType, StaffData } from '../types/types';
import { useEffect } from 'react';

export default function UpdateStaffForm({
  formData,
  isLoading,
  data,
  formReset,
  staffData,
}: {
  formData: (data: StaffData) => void;
  isLoading: boolean;
  data: AllCategoriesType;
  formReset: boolean;
  staffData: StaffData;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StaffData>({
    defaultValues: {
      ...staffData,
      birthday: new Date(staffData.birthday).toISOString().substring(0, 10),
      join_date: new Date(staffData.join_date).toISOString().substring(0, 10),
    },
  });

  const onSubmit: SubmitHandler<StaffData> = (data) => {
    formData(data);
  };

  const router = useRouter();
  const onBack = () => router.history.back();

  const { offices, roles, departments, shifts, managers } = (
    data as AllCategoriesType
  ).data;

  useEffect(() => {
    if (formReset) {
      reset();
    }
  }, [formReset, reset]);

  return (
    <div className="mt-5 mx-2 md:mx-20 space-y-12">
      <h2 className="text-slate-700 text-3xl">Edit Staff</h2>
      <form
        className="mx-auto mt-10 border border-slate-200 p-10 rounded-lg shadow-sm"
        action=""
      >
        <div className="grid grid-cols-1 sm:grid-cols-6 items-center gap-6 sm:gap-10">
          <div className="sm:col-span-3 sm:col-start-1">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="name"
            >
              Name:
              {errors.name && (
                <span className="text-red-700 float-end">
                  This field is required
                </span>
              )}
            </label>
            <input
              type="text"
              {...register('name', { required: true })}
              className="block border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            />
          </div>
          <div className="sm:col-span-3">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="surname"
            >
              Surname:
              {errors.surname && (
                <span className="text-red-700 float-end">
                  This field is required
                </span>
              )}
            </label>
            <input
              type="text"
              {...register('surname', { required: true })}
              className="block flex-1 border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            />
          </div>

          <div className="sm:col-span-3">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="phone"
            >
              Phone:
              {errors.phone && (
                <span className="text-red-700 float-end">
                  This field is required
                </span>
              )}
            </label>
            <input
              type="text"
              {...register('phone', { required: true })}
              className="block flex-1 border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            />
          </div>
          <div className="sm:col-span-3">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="birthdate"
            >
              Birthdate:
              {errors.birthday && (
                <span className="text-red-700 float-end">
                  This field is required
                </span>
              )}
            </label>
            <input
              type="date"
              {...register('birthday', { required: true })}
              className="block border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            />
          </div>
          <div className="sm:col-span-2 sm:col-start-1">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="office"
            >
              Office:
              {errors.office_id && (
                <span className="text-red-700 float-end">
                  This field is required
                </span>
              )}
            </label>
            <select
              {...register('office_id')}
              className="block border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            >
              {offices.map((office) => {
                return (
                  <option key={office.id} value={office.id}>
                    {office.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="department"
            >
              Department:
              {errors.department_id && (
                <span className="text-red-700 float-end">
                  This field is required
                </span>
              )}
            </label>
            <select
              {...register('department_id')}
              className="block border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            >
              {departments.map((department) => {
                return (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="role"
            >
              Role:
              {errors.role_id && (
                <span className="text-red-700 float-end">
                  This field is required
                </span>
              )}
            </label>
            <select
              {...register('role_id')}
              className="block border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            >
              {roles.map((role) => {
                return (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                );
              })}
            </select>
          </div>
          {staffData.shift_id && (
            <div className="sm:col-span-2 sm:col-start-1">
              <label
                className="text-slate-800 block text-sm font-medium leading-6"
                htmlFor="shift"
              >
                Shift:
                {errors.shift_id && (
                  <span className="text-red-700 float-end">
                    This field is required
                  </span>
                )}
              </label>
              <select
                {...register('shift_id')}
                className="block border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
              >
                {shifts.map((shift) => {
                  return (
                    <option key={shift.id} value={shift.id}>
                      {shift.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          <div className="sm:col-span-4">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="department"
            >
              Manager:
              {errors.manager_id && (
                <span className="text-red-700 float-end">
                  This field is required
                </span>
              )}
            </label>
            <select
              {...register('manager_id')}
              className="block border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            >
              {managers.map((manager) => {
                const managerName = manager.name + ' ' + manager.surname;
                const shiftName = manager.shift ? `- (${manager.shift})` : '';
                const managerrole = manager.role_name;
                const managerOffice = manager.office;
                const value = `${managerName} - ${managerOffice} - ${managerrole}${shiftName}`;

                return (
                  <option key={manager.id} value={manager.id}>
                    {value}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="sm:col-span-3 sm:col-start-1">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="joindate"
            >
              Join Date:
              {errors.join_date && (
                <span className="text-red-700 float-end">
                  This field is required
                </span>
              )}
            </label>
            <input
              type="date"
              {...register('join_date', { required: true })}
              className="block flex-1 border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            />
          </div>
          <div className="sm:col-span-3">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="salary"
            >
              Salary:
              {errors.salary && (
                <span className="text-red-700 float-end">
                  This field is required
                </span>
              )}
            </label>
            <input
              type="number"
              {...register('salary', { required: true })}
              className="block flex-1 border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            />
          </div>
        </div>

        <div className="flex justify-end gap-5 mt-10">
          <CustomButton color="neutral" onClick={onBack} text="Cancel" />
          <CustomButton
            isLoading={isLoading}
            onClick={handleSubmit(onSubmit)}
            text="Save"
            color="secondary"
          />
        </div>
      </form>
    </div>
  );
}
