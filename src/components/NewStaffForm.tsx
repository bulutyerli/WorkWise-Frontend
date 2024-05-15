import { useForm, SubmitHandler } from 'react-hook-form';
import CustomButton from './CustomButton';
import { useRouter } from '@tanstack/react-router';
import { AllCategoriesType, NewStaffType } from '../types/types';
import { useEffect, useRef } from 'react';

export default function NewStaffForm({
  formData,
  isLoading,
  data,
  formReset,
}: {
  formData: (data: NewStaffType) => void;
  isLoading: boolean;
  data: AllCategoriesType;
  formReset: boolean;
}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<NewStaffType>();

  const onSubmit: SubmitHandler<NewStaffType> = (data) => {
    formData(data);
  };
  const password = useRef({});
  password.current = watch('password', '');
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
      <h2 className="text-slate-700 text-3xl">Add New Staff</h2>
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
          <div className="sm:col-span-full">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="email"
            >
              Email:
              {errors.email && (
                <span className="text-red-700 float-end">
                  This field is required
                </span>
              )}
            </label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="block border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            />
          </div>
          <div className="sm:col-span-3 sm:col-start-1">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="Password"
            >
              Password:
              {errors.password && (
                <span className="text-red-700 float-end">
                  {errors.password.message}
                </span>
              )}
            </label>
            <input
              type="password"
              {...register('password', {
                required: 'This field is required',
                minLength: {
                  value: 8,
                  message: 'Min 8 characters with a number',
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
                  message: 'Password must contain letters and numbers',
                },
              })}
              className="block border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            />
          </div>
          <div className="sm:col-span-3">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="Re-Password"
            >
              Re-Enter Password:{' '}
              {errors.repassword && (
                <span className="text-red-700 float-end">
                  {errors.repassword.message}
                </span>
              )}
            </label>
            <input
              type="password"
              {...register('repassword', {
                required: 'This field is required',
                validate: (val: string) => {
                  if (watch('password') != val) {
                    return 'Your passwords do no match';
                  }
                },
              })}
              className="block border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
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
              {errors.birthdate && (
                <span className="text-red-700 float-end">
                  This field is required
                </span>
              )}
            </label>
            <input
              type="date"
              {...register('birthdate', { required: true })}
              className="block border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            />
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="office"
            >
              Office:
              {errors.office && (
                <span className="text-red-700 float-end">
                  This field is required
                </span>
              )}
            </label>
            <select
              {...register('office')}
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
              {errors.department && (
                <span className="text-red-700 float-end">
                  This field is required
                </span>
              )}
            </label>
            <select
              {...register('department')}
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
              htmlFor="shift"
            >
              Shift:
              {errors.shift && (
                <span className="text-red-700 float-end">
                  This field is required
                </span>
              )}
            </label>
            <select
              {...register('shift')}
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
          <div className="sm:col-span-3">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="role"
            >
              Role:
              {errors.role && (
                <span className="text-red-700 float-end">
                  This field is required
                </span>
              )}
            </label>
            <select
              {...register('role')}
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
          <div className="sm:col-span-3">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="department"
            >
              Manager:
              {errors.manager && (
                <span className="text-red-700 float-end">
                  This field is required
                </span>
              )}
            </label>
            <select
              {...register('manager')}
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
              {errors.joindate && (
                <span className="text-red-700 float-end">
                  This field is required
                </span>
              )}
            </label>
            <input
              type="date"
              {...register('joindate', { required: true })}
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
