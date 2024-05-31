import { createFileRoute, redirect } from '@tanstack/react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import logo from '/workwise.svg';
import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { MyRouterContext } from '../../__root';
import { useAuth } from '../../../providers/AuthProvider';
import { auth } from '../../../config/firebase-config';
import CustomButton from '../../../components/CustomButton';
import LoadingSpinner from '../../../components/LoadingSpinner';

interface SearchType {
  redirect: string | null;
}

export const Route = createFileRoute('/_layout/auth/sign-in')({
  beforeLoad: async ({
    context,
  }: {
    context: MyRouterContext;
    search: SearchType;
  }) => {
    const auth = context.auth.isAuthenticated;
    const isLoading = context.auth.isLoading;
    if (auth && !isLoading) {
      throw redirect({ to: '/' });
    }
  },
  component: SignIn,
});

type Inputs = {
  email: string;
  password: string;
};

function SignIn() {
  const [error, setError] = useState<string>();
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [demoLoading, setDemoLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = Route.useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoginLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError('Wrong email or password');
    } finally {
      setLoginLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate({ to: '/' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading]);

  const onDemoSubmit = async () => {
    try {
      setDemoLoading(true);
      const pass = import.meta.env.VITE_DEMO_USER;
      const email = import.meta.env.VITE_DEMO_EMAIL;
      await signInWithEmailAndPassword(auth, email, pass);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError('Demo is not active');
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div className="m-auto h-full items-center flex flex-col justify-center gap-10 w-full px-6 sm:max-w-96">
      <div className="flex flex-col items-center gap-5">
        <img src={logo} alt="WorkWise Logo" width={100} />
        <h2 className="text-xl text-slate-700 font-semibold">Sign in</h2>
        <p className="text-center text-slate-600">
          You can use Demo Login button to sign in without credentials
        </p>
      </div>
      <form
        className="flex flex-col items-center justify-start w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label
          className="text-start w-full text-slate-600 pb-2"
          htmlFor="email"
        >
          Email*{' '}
          {errors.email && <span className="text-red-700">is required</span>}
        </label>
        <input
          id="email"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-4 p-2"
          {...register('email', { required: true })}
        />

        <label
          className="text-start w-full text-slate-600 pb-2"
          htmlFor="password"
        >
          Password*{' '}
          {errors.password && <span className="text-red-700">is required</span>}
        </label>
        <input
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-10 p-2"
          id="password"
          type="password"
          {...register('password', { required: true })}
        />
        <span className="text-red-700 mb-2">{error && error}</span>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {loginLoading ? <LoadingSpinner /> : 'Sign in'}
        </button>
        <div className="pt-5">
          <CustomButton
            text="Demo Login"
            color="primary"
            onClick={onDemoSubmit}
            isLoading={demoLoading}
          />
        </div>
      </form>
    </div>
  );
}
