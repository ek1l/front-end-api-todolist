import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceUrlTaskApi } from '../../api/apiTask';

const initialState = {
  loading: false,
  data: [],
  idTarefa: 0,
  modalOpen: false,
};

export const pegarUmaTarefa = createAsyncThunk(
  'pegarUmaTarefa',
  async (id: number) => {
    try {
      const { data } = await instanceUrlTaskApi.get(`tasks/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

const pegarUmaTarefaSlice = createSlice({
  name: 'pegarUmaTarefa',
  initialState,
  reducers: {
    setIdTarefa: (state, { payload }) => {
      state.idTarefa = payload;
    },
    setModalOpen: (state) => {
      state.modalOpen = !state.modalOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(pegarUmaTarefa.pending, (state) => {
        state.loading = true;
      })
      .addCase(pegarUmaTarefa.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(pegarUmaTarefa.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default pegarUmaTarefaSlice.reducer;
export const { setIdTarefa, setModalOpen } = pegarUmaTarefaSlice.actions;
