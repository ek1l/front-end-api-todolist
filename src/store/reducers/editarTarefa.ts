import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceUrlTaskApi } from '../../api/apiTask';

const initialState = {
  loading: false,
};

export const editarTarefa = createAsyncThunk(
  'editarTarefa',
  async (dataObj: { data: { title: string; content: string }; id: number }) => {
    try {
      const { data } = await instanceUrlTaskApi.patch(
        `tasks/${dataObj.id}`,
        dataObj.data,
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const editChecked = createAsyncThunk(
  'editChecked',
  async (dataObj: { data: { finished: boolean }; id: number }) => {
    try {
      const { data } = await instanceUrlTaskApi.patch(
        `tasks/${dataObj.id}`,
        dataObj.data,
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

const editarTarefaSlice = createSlice({
  name: 'editarTarefa',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editarTarefa.pending, (state) => {
        state.loading = true;
      })
      .addCase(editarTarefa.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editarTarefa.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default editarTarefaSlice.reducer;
