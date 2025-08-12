// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../../Supabase/supabase_config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      if (data.session) {
        await fetchUserInfo(data.session.user.id);
      }
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session) {
        await fetchUserInfo(session.user.id);
      } else {
        setUserInfo(null);
        setUserRole(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const fetchUserInfo = async (userId) => {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('display_name, phone')
      .eq('id', userId)
      .single();

    if (userError) {
      console.error('Error fetching user info:', userError.message);
      setUserInfo(null);
      setUserRole(null);
      return;
    }

    setUserInfo(userData);

    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('roles(role_name)')
      .eq('user_id', userId)
      .single();

    if (roleError) {
      console.error('Error fetching user role:', roleError.message);
      setUserRole(null);
      return;
    }

    setUserRole(roleData.roles.role_name);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUserInfo(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ session, loading, userInfo, userRole, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
