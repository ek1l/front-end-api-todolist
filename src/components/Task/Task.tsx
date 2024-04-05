import { deleteTarefa } from '../../store/reducers/excluirTarefa';
import { setIdTarefa, setModalOpen } from '../../store/reducers/pegarUmaTarefa';
import { TodasAsTarefas } from '../../store/reducers/todasAsTarefas';
import { useAppDispatch } from '../../store/store';
import Check from '../Check/Check';
import styles from './Task.module.scss';
import { toast } from 'react-toastify';

const notifySuccessDelete = () => toast.success('Task deletada com sucesso!');
const notifyErrorDelete = () =>
  toast.error('Algo deu errado na exclusão da task!');

const Task = ({
  title,
  content,
  id,
  finished,
}: {
  title: string;
  content: string;
  id: number;
  finished: boolean;
}) => {
  const dispatch = useAppDispatch();
  const handleDeleteTask = async (id: number) => {
    const response = await dispatch(deleteTarefa(id));
    if (response.type === 'deleteTarefa/fulfilled') {
      notifySuccessDelete();
      dispatch(TodasAsTarefas());
    } else {
      notifyErrorDelete();
    }
  };
  const handleEditTask = (id: number) => {
    dispatch(setIdTarefa(id));
    dispatch(setModalOpen());
  };
  return (
    <div className={styles.taskContainer}>
      <Check id={id} finished={finished} />
      <div className={styles.task}>
        <div className={styles.titleTask}>
          <p>{title}</p>
          <p>{content}</p>
        </div>
        <div className={styles.editAndDeleteButtonTask}>
          <button onClick={() => handleEditTask(id)}>Editar</button>
          <button onClick={() => handleDeleteTask(id)}>Excluir</button>
        </div>
      </div>
    </div>
  );
};

export default Task;
