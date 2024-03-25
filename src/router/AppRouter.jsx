import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { CheckingAuth } from "../ui/components/checkingAuth";
import { useCheckAuth } from "../hooks";



export const AppRouter = () => {
  
  const {status} = useCheckAuth();

  //para mostrar el icono de carga antes de ingresar
  if (status === "checking") {
    return <CheckingAuth />;
  }
  
  return (

  <Routes>
    {
      (status === 'authenticated')
       ?  <Route path="/*" element={<JournalRoutes />} /> //si estoy logeado muestro estas rutas
       :  <Route path="/auth/*" element={<AuthRoutes />} /> //si no estoy logeado muestro estas rutas
    }
    <Route path='/*' element={<Navigate to='/auth/login'/>}/>
    <Route />
  </Routes>
  )
};

