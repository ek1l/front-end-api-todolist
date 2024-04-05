import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceUrlTaskApi } from '../../api/apiTask';

const initialState = {
  loading: false,
};

export const deleteTarefa = createAsyncThunk(
  'deleteTarefa',
  async (id: number) => {
    try {
      const { data } = await instanceUrlTaskApi.delete(`tasks/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

const deleteTarefaSlice = createSlice({
  name: 'deleteTarefa',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteTarefa.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTarefa.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteTarefa.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default deleteTarefaSlice.reducer;
