import type { NextPage } from 'next';
import Head from 'next/head';
import SignInForm from '../components/auth/SignInForm';
import Logo from '../components/common/Logo';

const SignIn: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Sign In | SimpleTrust</title>
        <meta name="description" content="Sign in to your SimpleTrust account" />
      </Head>

      <div className="flex flex-col items-center justify-center min-h-screen py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-8">
          <Logo className="w-auto h-12 mb-4" />
          <h2 className="text-xl font-bold text-gray-900">
            SimpleTrust
          </h2>
        </div>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignIn; 