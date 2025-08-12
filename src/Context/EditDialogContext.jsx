import { createContext, useState } from "react";
export const EditDialogContext = createContext();
import supabase from "../Supabase/supabase_config";
function EditDialogProvider(props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editType, setEditType] = useState(null);
  const [editData, setEditData] = useState(null);
  function openDialog(type , item) {
    setEditType(type);
    setEditData(item);
    setIsDialogOpen(true);
  }
  function closeDialog() {
    setIsDialogOpen(false);
    setEditType(null);
    setEditData(null);
  }
  async function handleEdit(updatedItem) {
    try {
      await supabase.auth.setSession({
        access_token: localStorage.getItem("access_token"),
        refresh_token: localStorage.getItem("refresh_token"),
      });
      let table = editType === "nurse" ? "nurses" : "beds";
      const { data, error } = await supabase
        .from(table)
        .update(updatedItem)
        .eq("id", updatedItem.id)
        .select();
      if (error) throw error;
      return data[0]; 
    } catch (error) {
      console.error("Edit error:", error.message);
      return null;
    }
  } 
  return (
    <EditDialogContext.Provider value={{isDialogOpen, openDialog, closeDialog, editType, editData , handleEdit}}>
      {props.children}
    </EditDialogContext.Provider>
  )
}

export default EditDialogProvider

