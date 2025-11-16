import React from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getUserUrlsApi } from '../api/user.api';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import DashboardUrlForm from '../components/dashboard/DashboardUrlForm';
import UrlsList from '../components/dashboard/UrlsList.jsx';

const DashBoardPage = () => {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  
 const { 
  data: urlsData, 
  isLoading: urlsLoading, 
  refetch: refetchUrls,
  error: urlsError 
} = useQuery({
  queryKey: ['userUrls'],
  queryFn: getUserUrlsApi,
  enabled: isAuthenticated,
  staleTime: 1000 * 10, // 10 seconds
  refetchInterval: 1000 * 10, // Auto-refetch every 10 seconds
  refetchIntervalInBackground: false, // Only when tab is active
  refetchOnWindowFocus: true, // Refetch when user returns to tab
});

  const urls = urlsData?.urls || [];

  return (
    <div className="min-h-screen bg-linear-to-br  from-slate-50 via-slate-100 to-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Welcome Section */}
        <WelcomeBanner user={user} urls={urls} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Create URL Form (Left Column) */}
          <div className="lg:col-span-1">
            <DashboardUrlForm onSuccess={refetchUrls} />
          </div>

          {/* URLs List (Right Column) */}
          <div className="lg:col-span-2">
            <UrlsList 
              urls={urls} 
              isLoading={urlsLoading} 
              error={urlsError}
              onRefresh={refetchUrls}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;