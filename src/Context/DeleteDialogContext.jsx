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
      // تفعيل جلسة supabase
      await supabase.auth.setSession({
        access_token: localStorage.getItem("access_token"),
        refresh_token: localStorage.getItem("refresh_token"),
      });

      // الحذف من الجدول المناسب
      const table =
        deleteType === "nurse"
          ? "nurses"
          : deleteType === "doctor"
          ? "doctors"
          : "beds";

      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;

      console.log(`Deleted ${deleteType} with ID: ${id}`);

      // تحديث الواجهة إذا فيه callback
      if (onDeleteFromUI) onDeleteFromUI(id);
      if (onDeleted) onDeleted(); // callback إضافي

      return true;
    } catch (error) {
      console.error("Delete error:", error.message || error);
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
      }}
    >
      {props.children}
    </DeleteDialogContext.Provider>
  );
}

export default DeleteDialogProvider;
