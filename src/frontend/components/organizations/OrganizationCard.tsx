import Link from 'next/link';
import type { Organization } from '@/types/supabase';

interface OrganizationCardProps {
  organization: Organization;
  userRole?: string;
}

/**
 * Safely format a date string with validation
 * @param dateString The date string to format
 * @returns Formatted date string or fallback for invalid dates
 */
const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'Date unavailable';
  
  const date = new Date(dateString);
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Date unavailable';
  }
  
  return date.toLocaleDateString();
};

export const OrganizationCard = ({ organization, userRole }: OrganizationCardProps) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-lg">{organization.name}</h3>
        {userRole && (
          <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">{userRole}</span>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Created {formatDate(organization.created_at)}
      </p>
      <div className="flex flex-wrap gap-2">
        <Link
          href={`/organizations/${organization.id}`}
          className="text-sm px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          View Details
        </Link>
        <Link
          href={`/organizations/${organization.id}/manage`}
          className="text-sm px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          Manage
        </Link>
      </div>
    </div>
  );
}; 