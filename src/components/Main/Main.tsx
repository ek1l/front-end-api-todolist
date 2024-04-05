import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import styles from './Main.module.scss';
import Input from '../Input/Input';
import Task from '../Task/Task';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { criarTarefa } from '../../store/reducers/criarTarefa';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { TodasAsTarefas } from '../../store/reducers/todasAsTarefas';
type FormData = {
  title: string;
  content: string;
};

type CustomFieldValues = FieldValues & FormData;

const notifySuccessCreate = () => toast.success('Task criada com sucesso!');
const notifyErrorCreate = () =>
  toast.error('Algo deu errado na criação da task!');

const Main = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.TodasAsTarefasSlice);
  const { register, handleSubmit, reset } = useForm<CustomFieldValues>();

  const submit: SubmitHandler<FormData> = async (formData) => {
    const response = await dispatch(criarTarefa(formData));
    if (response.type === 'criarTarefas/fulfilled') {
      notifySuccessCreate();
      dispatch(TodasAsTarefas());
    } else {
      notifyErrorCreate();
    }
    reset();
  };

  useEffect(() => {
    dispatch(TodasAsTarefas());
  }, [dispatch]);
  return (
    <main className={styles.main}>
      <ToastContainer closeOnClick autoClose={2000} />
      <h1>Lista de tarefas</h1>
      <form className={styles.form} onSubmit={handleSubmit(submit)}>
        <Input type="text" label="Digite a sua tarefa" {...register('title')} />
        <Input
          type="text"
          label="Digite a descrição"
          {...register('content')}
        />
        <button type="submit">Criar Tarefa</button>
      </form>
      <div className={styles.containerTask}>
        {data.length > 0 ? (
          data.map(
            (task: {
              title: string;
              content: string;
              id: number;
              finished: boolean;
            }) => (
              <Task
                key={task.id}
                title={task.title}
                content={task.content}
                id={task.id}
                finished={task.finished}
              />
            ),
          )
        ) : (
          <h1>SEM TAREFAS...</h1>
        )}
      </div>
    </main>
  );
};

export default Main;
