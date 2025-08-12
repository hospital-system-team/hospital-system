import { createContext, useState } from "react";
export const ViewDialogContext = createContext();
function ViewDialogProvider(props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewData, setViewData] = useState(null);
  function openViewDialog(item) {
    setViewData(item);
    setIsDialogOpen(true);
  }
  function closeViewDialog() {
    setViewData(null);
    setIsDialogOpen(false);
  }
  return (
    <ViewDialogContext.Provider value={{isDialogOpen,viewData,openViewDialog,closeViewDialog}}>
      {props.children}
    </ViewDialogContext.Provider>
  )
}

export default ViewDialogProvider;
