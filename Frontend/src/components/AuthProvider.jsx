// Frontend/src/components/AuthProvider.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../api/user.api';
import { login, logout } from '../store/slice/authSlice';

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  
  // Check auth on mount
  const { data: user, isError } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: Infinity, // Don't refetch automatically
  });

  useEffect(() => {
    if (user) {
      dispatch(login(user));
    } else if (isError) {
      dispatch(logout());
    }
  }, [user, isError, dispatch]);

  return children;
};