import './Check.scss';
import { useAppDispatch } from '../../store/store';
import { editChecked } from '../../store/reducers/editarTarefa';
import { TodasAsTarefas } from '../../store/reducers/todasAsTarefas';
const Check = ({ finished, id }: { finished: boolean; id: number }) => {
  const dispatch = useAppDispatch();

  const handleCheck = async () => {
    const objToSend = {
      data: {
        finished: !finished,
      },
      id: id,
    };
    const response = await dispatch(editChecked(objToSend));
    if (response.type === 'editChecked/fulfilled') {
      dispatch(TodasAsTarefas());
    }
  };

  return (
    <>
      <label className="container">
        <input onChange={handleCheck} checked={finished} type="checkbox" />
        <div className="checkmark"></div>
      </label>
    </>
  );
};

export default Check;
