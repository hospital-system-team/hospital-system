import { createContext, useState } from "react";
import supabase from "../Supabase/supabase_config";
export const DeleteDialogContext = createContext();

function DeleteDialogProvider(props) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [deleteType, setDeleteType] = useState("");

  const openDeleteDialog = (type, data) => {
    setDeleteType(type);
    setDeleteData(data);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeleteData(null);
    setDeleteType("");
  };
const handleDelete = async (id, onDeleteFromUI) => {
    try {
      await supabase.auth.setSession({
        access_token: localStorage.getItem("access_token"),
        refresh_token: localStorage.getItem("refresh_token"),
      });
      const { error } = await supabase
        .from(deleteType === "nurse" ? "nurses" : "beds")
        .delete()
        .eq("id", id);
      if (error) throw error;
      console.log(` Deleted ${deleteType} with ID: ${id}`);
      if (onDeleteFromUI) {
        onDeleteFromUI(id);
      }
    } catch (error) {
      console.error(" Delete error:", error.message);
    }
  };
  return (
    <DeleteDialogContext.Provider
      value={{
        isDeleteDialogOpen,
        deleteData,
        deleteType,
        openDeleteDialog,
        closeDeleteDialog,
        handleDelete
      }}
    >
      {props.children}
    </DeleteDialogContext.Provider>
  );
}


export default DeleteDialogProvider