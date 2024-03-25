import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    messageSaved: "",
    notes: [],
    active: null,
    // active: {
    //     id: 'ABC123',
    //     title: '',
    //     body: '',
    //     date: 1234567,
    //     imageUrls: [] //arreglo ocon los urls de las imagenes
    // }
  },

  //Los Reducers son funciones puras que reciben el estado actual de la aplicación y la acción a realizar y devuelven un nuevo estado, sin modificar directamente el estado actual
  reducers: {
    savingNewNote: (state) =>{
      state.isSaving = true;  

    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload); //en el payload tenemos la nueva nota
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
    },
    setNotes: (state, action) => {},
    setSaving: (state) => {},
    updateNote: (state, action) => {},
    deleteNoteById: (state, action) => {},
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
  savingNewNote
} = journalSlice.actions;
