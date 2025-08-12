
import AddDialogProvider from "../Context/AddDialogContext"
import DeleteDialogProvider from "../Context/DeleteDialogContext"
import EditDialogProvider from "../Context/EditDialogContext"
import ViewDialogProvider from "../Context/ViewDialogContext"


function AppProviders({ children }) {
  return (
    <AddDialogProvider>
    <ViewDialogProvider>
    <DeleteDialogProvider>
    <EditDialogProvider>
      {children}
    </EditDialogProvider>
    </DeleteDialogProvider>
    </ViewDialogProvider>
    </AddDialogProvider>
  )
}

export default AppProviders
