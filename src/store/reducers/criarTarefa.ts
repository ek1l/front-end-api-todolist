import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceUrlTaskApi } from '../../api/apiTask';

const initialState = {
  loading: false,
};

export const criarTarefa = createAsyncThunk(
  'criarTarefas',
  async (formData: { title: string; content: string }) => {
    try {
      const { data } = await instanceUrlTaskApi.post('tasks', formData);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

const criarTarefaSlice = createSlice({
  name: 'criarTarefas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(criarTarefa.pending, (state) => {
        state.loading = true;
      })
      .addCase(criarTarefa.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(criarTarefa.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default criarTarefaSlice.reducer;
