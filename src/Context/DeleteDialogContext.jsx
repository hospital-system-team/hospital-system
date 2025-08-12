import { createContext, useState } from "react";
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
  const handleDelete = async (id) => {
    try {
      if (deleteType === "bed") {
        console.log(`Deleting bed with ID: ${id}`);
      } else if (deleteType === "nurse") {
        console.log(`Deleting nurse with ID: ${id}`);
        
      }
      console.log(`Deleted ${deleteType} with ID: ${id}`);
    } catch (error) {
      console.error("Delete error:", error);
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
