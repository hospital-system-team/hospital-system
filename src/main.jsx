import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './components/Context/authContext.jsx'
import UserContextProvider from './Context/UserContext.jsx'
import PatientsContextProvider from './Context/PatientsContext.jsx'
import AddDialogProvider from './Context/AddDialogContext.jsx'
import ViewDialogProvider from './Context/ViewDialogContext.jsx'
import DeleteDialogProvider from './Context/DeleteDialogContext.jsx'
import { DoctorProvider } from './Context/DoctorContext.jsx'
import EditDialogProvider from './Context/EditDialogContext.jsx'
import { ToastContainer } from 'react-toastify'


createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <UserContextProvider>
            <PatientsContextProvider>
                <AddDialogProvider>
                     <ViewDialogProvider>
                        <DeleteDialogProvider>
                            <DoctorProvider>
                                <EditDialogProvider>
                                     <App />
                                     <ToastContainer />
                                </EditDialogProvider>
                            </DoctorProvider>
                        </DeleteDialogProvider>
                    </ViewDialogProvider>
                 </AddDialogProvider>
            </PatientsContextProvider>
        </UserContextProvider>
    </AuthProvider>
)

