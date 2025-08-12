import { createContext, useState } from "react";
import supabase from "../Supabase/supabase_config";
export const AddDialogContext = createContext();
function AddDialogProvider(props) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [addType, setAddType] = useState(null);
  function openAddDialog(type) {
    setAddType(type);
    setIsAddDialogOpen(true);
  }
  function closeAddDialog() {
    setAddType(null);
    setIsAddDialogOpen(false);
  }
  async function handleAdd(newItem) {
    try {
      await supabase.auth.setSession({
        access_token: localStorage.getItem("access_token"),
        refresh_token: localStorage.getItem("refresh_token"),
      });
      let table = addType === "nurse" ? "nurses" : "beds";
      const { data, error } = await supabase
        .from(table)
        .insert([newItem])
        .select();
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error("Add error:", error.message);
      return null;
    }
  }
  return (
    <AddDialogContext.Provider value={{isAddDialogOpen,addType,openAddDialog,closeAddDialog,handleAdd}}>
      {props.children}
    </AddDialogContext.Provider>
  )
}

export default AddDialogProvider
