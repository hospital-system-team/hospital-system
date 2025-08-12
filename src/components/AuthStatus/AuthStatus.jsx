import { useEffect, useState } from 'react';
import { supabase } from '../../Supabase/supabase_config';

const AuthStatus = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = '/signin';
  };

  return (
    <div className="text-sm text-text-color">
      {user ? (
        <div className="flex items-center gap-2">
          <p>Hello, <span className="font-medium">{user.email}</span></p>
          <button
            onClick={handleLogout}
            className="text-danger-color underline hover:opacity-80 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>You are not signed in.</p>
      )}
    </div>
  );
};

export default AuthStatus;
