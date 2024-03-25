import {Firestore, collection, doc, setDoc} from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote } from './journalSlice';

export const startNewNote = () =>{

    return async (dispatch, getState) => {
        dispatch(savingNewNote());
        const {uid} = getState().auth; //obtego el state del usuario conectado y ahi saco el id
        const newNote = {
            title:'',
            body: '',
            date: new Date().getTime(),
        }
       
        
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`) ) //ingreso la nota a la bd
        const setDocResp = await setDoc(newDoc, newNote);

        newNote.id = newDoc.id; //agrego un id a la nota

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    
       
    }

    

}