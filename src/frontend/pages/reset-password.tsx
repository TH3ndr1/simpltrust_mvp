import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';
import UpdatePasswordForm from '../components/auth/UpdatePasswordForm';
import Logo from '../components/common/Logo';

const ResetPassword: NextPage = () => {
  const router = useRouter();
  
  // Check if this is a password reset confirmation (contains token in URL)
  const isPasswordReset = router.query.type === 'recovery';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>
          {isPasswordReset ? 'Update Password' : 'Reset Password'} | SimpleTrust
        </title>
        <meta 
          name="description" 
          content={isPasswordReset ? 'Update your SimpleTrust password' : 'Reset your SimpleTrust password'} 
        />
      </Head>

      <div className="flex flex-col items-center justify-center min-h-screen py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-8">
          <Logo className="w-auto h-12 mb-4" />
          <h2 className="text-xl font-bold text-gray-900">
            SimpleTrust
          </h2>
        </div>
        
        {isPasswordReset ? <UpdatePasswordForm /> : <ResetPasswordForm />}
      </div>
    </div>
  );
};

export default ResetPassword; 