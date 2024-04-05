/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Input/Input';
import styles from './ModalEdit.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useEffect } from 'react';
import {
  pegarUmaTarefa,
  setModalOpen,
} from '../../store/reducers/pegarUmaTarefa';
import { editarTarefa } from '../../store/reducers/editarTarefa';
import { TodasAsTarefas } from '../../store/reducers/todasAsTarefas';
import { toast } from 'react-toastify';

type FormData = {
  title: string;
  content: string;
};

type TDataAndId = {
  data: FormData;
  idTarefa: number;
};
const notifySuccessEdit = () => toast.success('Task editada com sucesso!');
const notifyErrorEdit = () => toast.error('Algo deu errado na edição da task!');

type CustomFieldValues = FieldValues & FormData;

const ModalEdit = () => {
  const dispatch = useAppDispatch();
  const { data, idTarefa } = useAppSelector<TDataAndId>(
    (state: any) => state.pegarUmaTarefaSlice,
  );

  const { handleSubmit, register } = useForm<CustomFieldValues>({
    values: {
      title: data?.title || '',
      content: data?.content || '',
    },
  });

  const submit: SubmitHandler<FormData> = async (formData) => {
    const { title, content } = formData;
    const ObjToSend = {
      data: {
        title,
        content,
      },
      id: idTarefa,
    };
    const response = await dispatch(editarTarefa(ObjToSend));
    if (response.type === 'editarTarefa/fulfilled') {
      dispatch(setModalOpen());
      dispatch(TodasAsTarefas());
      notifySuccessEdit();
    } else {
      notifyErrorEdit();
    }
  };
  const handleClosedModal = () => {
    dispatch(setModalOpen());
  };

  useEffect(() => {
    dispatch(pegarUmaTarefa(idTarefa));
  }, [dispatch, idTarefa]);

  return (
    <div className={styles.modalEditContainer}>
      <div className={styles.titleAndCloseModal}>
        <h1>Edite sua tarefa</h1>
        <button onClick={handleClosedModal}>X</button>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(submit)}>
        <Input label="Nova tarefa" type="text" {...register('title')} />
        <Input label="Nova descrição" type="text" {...register('content')} />
        <button type="submit">Editar tarefa</button>
      </form>
    </div>
  );
};

export default ModalEdit;
