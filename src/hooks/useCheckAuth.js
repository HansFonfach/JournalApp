import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth";
import { FirebaseAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export const useCheckAuth = () => {
  //para mostrar el icono de carga antes de ingresar
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // esta funcion es para mantener la sesion iniciada al recargar la pagina
  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));
    });
  }, []);

  return {
    status,
  };
};
