import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  //aqui recibo el formValidations

  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({}); //useState porque necesito manejar el estado

  useEffect(() => {
    createValidators();
  }, [formState]); //cada vez que el estado del formulario cambia(nombre, email o pw) mando a llamar el createValidators

  const isFormValid = useMemo( () =>{ 
    for ( const formValue of Object.keys(formValidation)){
        if (formValidation[formValue] !== null ) return false; //si el campo no es valido se sale del formulario  con el return false
    }
    return true;
  },[formValidation]) //useMemo porque quiero memorizar el valor que retorna la funcion

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues = {};
    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage = "Este campo es requerido."] = formValidations[formField];//desestructuro la funcion de validacion y el mensaje que viene del formvalidations basado en el formfield
      formCheckedValues[`${ formField }Valid`] = fn( formState[formField]) ? null : errorMessage;
    }

    setFormValidation(formCheckedValues); //establezco el setFormValidation tiene el nuevo valor (formCheckedValues)
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation, //envio las propiedades con el nombre del campo + valid con el texto si hay un error y un null si está bien
    isFormValid
  };
};
