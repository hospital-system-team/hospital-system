
import { createContext, useEffect, useState } from 'react'
import supabase from '../Supabase/supabase_config';




export let UserContext = createContext()

export default function UserContextProvider(props) {
   const [role, setRole] = useState('');

    useEffect(() => {
    checkRole()
    }, []);


async function checkRole() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: user_id } = await supabase
        .from("user_roles")
        .select("role_id")
        .eq("user_id", user.id)
        .single();

      if (user_id) {
        const { data: user_role } = await supabase
          .from("roles")
          .select("role_name")
          .eq("id", user_id.role_id)
          .single();
        if (user_role) {
          setRole(user_role.role_name);
        } else {
          setRole("");
        }
      } else {
        setRole("");
      }
    } else {
      setRole("");
    }
  } catch (error) {
    console.error("Error in checkRole:", error);
    setRole("");
  }
}
        

 
  

  return <UserContext.Provider value={{role,checkRole}}>
            {props.children}
         </UserContext.Provider>
}