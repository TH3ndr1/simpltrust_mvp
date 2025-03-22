import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
}

const ProtectedRoute = ({ children, requiredRoles = [] }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If auth is initialized (not loading) and there's no user, redirect to login
    if (!isLoading && !user) {
      router.push('/signin');
    }
    
    // Note: Role-based access is disabled for now until we implement organizational roles
    // For now, just check if the user is authenticated
  }, [user, isLoading, router]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Show nothing briefly while redirecting
  if (!user) {
    return null;
  }
  
  // User is authenticated, show the children components
  return <>{children}</>;
};

export default ProtectedRoute; 