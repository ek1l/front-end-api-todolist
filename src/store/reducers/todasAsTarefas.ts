import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceUrlTaskApi } from '../../api/apiTask';

const initialState = {
  loading: false,
  data: [],
};

export const TodasAsTarefas = createAsyncThunk('TodasAsTarefas', async () => {
  try {
    const { data } = await instanceUrlTaskApi.get('tasks');
    return data;
  } catch (error) {
    console.log(error);
  }
});

const TodasAsTarefasSlice = createSlice({
  name: 'TodasAsTarefas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(TodasAsTarefas.pending, (state) => {
        state.loading = true;
      })
      .addCase(TodasAsTarefas.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(TodasAsTarefas.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default TodasAsTarefasSlice.reducer;
