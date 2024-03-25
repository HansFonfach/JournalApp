import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkingAuthentication,
  startCreatingUserWithEmailPassowrd,
} from "../../store/auth/thunks";

export const RegisterPage = () => {
  const formData = {
    email: "",
    password: "",
    displayName: "",
  };

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector((state) => state.auth); //hook para tomar el state

  const isChekingAuthentication = useMemo(
    () => status === "checking",
    [status]
  ); // para validar el estado de la autenticacion, valido si el valor que viene del status es igual a checking

  //creo un objeto con los campos que quiero validar, el primer campo evalua, el segundo envia el mensaje de error
  const formValidations = {
    email: [(value) => value.includes("@"), "El correo debe tener un @"],
    password: [
      (value) => value.length >= 6,
      "La contraseña debe contener mínimo 6 letras.",
    ],
    displayName: [(value) => value.length >= 1, "El nombre es obligatorio."],
  };

  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    displayNameValid,
    emailValid,
    passwordValid,
    isFormValid,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true); //cuando se toca el boton de envio del formulario

    if (!isFormValid) return; //si no es valido no hago nada

    dispatch(startCreatingUserWithEmailPassowrd(formState));
  };

  
  return (
    <AuthLayout title="Create Account">
      <form  className="animate__animated animate__fadeIn animate__faster" onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre Completo"
              type="text"
              placeholder="Hans Fonfach"
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              fullWidth
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="correo"
              type="email"
              placeholder="correo@google.com"
              name="email"
              value={email}
              onChange={onInputChange}
              fullWidth
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              name="password"
              value={password}
              onChange={onInputChange}
              fullWidth
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}> // si en el errorMessage no hay nada lo convierte en un string vacio
              <Alert severity="error"> {errorMessage} </Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
               disabled={isChekingAuthentication}
                type="submit"
                variant="contained"
                fullWidth
               
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ya tengo cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
