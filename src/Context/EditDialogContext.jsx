import { createContext, useState } from "react";
export const EditDialogContext = createContext();
function EditDialogProvider(props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editType, setEditType] = useState(null);
  const [editData, setEditData] = useState(null);

  const [beds, setBeds] = useState([
    { id: "B001", room: "101", status: "available" },
    { id: "B002", room: "101", status: "occupied" },
  ]);
  
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
  return (
    <EditDialogContext.Provider value={{isDialogOpen, openDialog, closeDialog, editType, editData , beds , setBeds}}>
      {props.children}
    </EditDialogContext.Provider>
  )
}

export default EditDialogProvider

