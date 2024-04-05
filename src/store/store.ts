import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import criarTarefaSlice from './reducers/criarTarefa';
import TodasAsTarefasSlice from './reducers/todasAsTarefas';
import deleteTarefaSlice from './reducers/excluirTarefa';
import pegarUmaTarefaSlice from './reducers/pegarUmaTarefa';
import editarTarefaSlice from './reducers/editarTarefa';
const store = configureStore({
  reducer: {
    criarTarefaSlice: criarTarefaSlice,
    TodasAsTarefasSlice: TodasAsTarefasSlice,
    deleteTarefaSlice: deleteTarefaSlice,
    pegarUmaTarefaSlice: pegarUmaTarefaSlice,
    editarTarefaSlice: editarTarefaSlice,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

export default store;
