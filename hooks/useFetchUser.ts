"use client";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from '../lib/supabaseClient';
import { setUserId, setUsername } from '../features/user/userSlice';

const useFetchUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        console.error("Error fetching user:", error);
        return;
      }

      const userId = data.user.id;
      dispatch(setUserId(userId));

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        return;
      }

      if (profile?.username) {
        dispatch(setUsername(profile.username));
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useFetchUser;
