// Context/DeleteDialogContext.jsx
import { createContext, useState } from "react";
import supabase from "../Supabase/supabase_config";

export const DeleteDialogContext = createContext();



function DeleteDialogProvider(props) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [deleteType, setDeleteType] = useState("");
  const [onDeleted, setOnDeleted] = useState(null); // callback

  const openDeleteDialog = (type, data, callback) => {
    setDeleteType(type);
    setDeleteData(data);
    setOnDeleted(() => callback); // نخزن الكول باك
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeleteData(null);
    setDeleteType("");
    setOnDeleted(null);
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

  const handleDelete = async (id) => {
    try {
      if (!id) return false;

      const access_token = localStorage.getItem("access_token");
      const refresh_token = localStorage.getItem("refresh_token");
      await supabase.auth.setSession({ access_token, refresh_token });

      if (deleteType === "doctor") {
        const { error } = await supabase.from("doctors").delete().eq("id", id);
        if (error) throw error;
      } else if (deleteType === "bed") {
        console.log(`Deleting bed with ID: ${id}`);
      } else if (deleteType === "nurse") {
        console.log(`Deleting nurse with ID: ${id}`);
      }

      if (onDeleted) onDeleted(); // شغّل الكول باك بعد الحذف
      return true;
    } catch (error) {
      console.error("Delete error:", error);
      return false;
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
        handleDelete,
      }}>
      {props.children}
    </DeleteDialogContext.Provider>
  );
}


export default DeleteDialogProvider;
