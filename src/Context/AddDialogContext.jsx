import { createContext, useState } from "react";
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
  return (
    <AddDialogContext.Provider value={{isAddDialogOpen,addType,openAddDialog,closeAddDialog}}>
      {props.children}
    </AddDialogContext.Provider>
  )
}

export default AddDialogProvider
