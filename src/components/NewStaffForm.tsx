import { useForm, SubmitHandler } from 'react-hook-form';
import CustomButton from './CustomButton';
import { useRouter } from '@tanstack/react-router';

export default function NewStaffForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const router = useRouter();
  const onBack = () => router.history.back();

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
            </label>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="username"
              className="block border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            />
          </div>
          <div className="sm:col-span-3">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="name"
            >
              Surname:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="username"
              className="block flex-1 border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            />
          </div>
          <div className="sm:col-span-full">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="name"
            >
              Email:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="username"
              className="block border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            />
          </div>
          <div className="sm:col-span-3 sm:col-start-1">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="Password"
            >
              Password:
            </label>
            <input
              type="password"
              name="username"
              id="username"
              autoComplete="username"
              className="block border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            />
          </div>
          <div className="sm:col-span-3">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="Re-Password"
            >
              Re-Enter Password:
            </label>
            <input
              type="password"
              name="username"
              id="username"
              autoComplete="username"
              className="block border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            />
          </div>
          <div className="sm:col-span-3">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="name"
            >
              Phone:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="username"
              className="block flex-1 border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            />
          </div>
          <div className="sm:col-span-3">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="name"
            >
              Birthdate:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="username"
              className="block border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            />
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="name"
            >
              Office:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="username"
              className="block border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="name"
            >
              Manager:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="username"
              className="block flex-1 border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="name"
            >
              Department:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="username"
              className="block border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            />
          </div>
          <div className="sm:col-span-3">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="name"
            >
              Role:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="username"
              className="block flex-1 border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            />
          </div>
          <div className="sm:col-span-3">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="name"
            >
              Shift:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="username"
              className="block flex-1 border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            />
          </div>
          <div className="sm:col-span-3 sm:col-start-1">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="name"
            >
              Join Date:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="username"
              className="block flex-1 border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            />
          </div>
          <div className="sm:col-span-3">
            <label
              className="text-slate-800 block text-sm font-medium leading-6"
              htmlFor="name"
            >
              Salary:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="username"
              className="block flex-1 border-2 rounded-md bg-transparent py-1.5 pl-1 text-slate-900  focus:border-purple-600 sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none shadow-sm w-full"
            />
          </div>
        </div>
        <div className="flex justify-end gap-5 mt-10">
          <CustomButton onClick={onBack} text="Cancel" />
          <CustomButton
            onClick={() => onSubmit()}
            text="Save"
            color="secondary"
          />
        </div>
      </form>
    </div>
  );
}
