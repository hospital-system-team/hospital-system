import AddDialogProvider from "../Context/AddDialogContext";
import DeleteDialogProvider from "../Context/DeleteDialogContext";
import { DoctorProvider } from "../Context/DoctorContext";
import EditDialogProvider from "../Context/EditDialogContext";
import ViewDialogProvider from "../Context/ViewDialogContext";

function AppProviders({ children }) {
  return (
    <AddDialogProvider>
      <ViewDialogProvider>
        <DeleteDialogProvider>
          <DoctorProvider>
            <EditDialogProvider>{children}</EditDialogProvider>
          </DoctorProvider>
        </DeleteDialogProvider>
      </ViewDialogProvider>
    </AddDialogProvider>
  );
}

export default AppProviders;
