import Main from './components/Main/Main';
import ModalEdit from './components/ModalEdit/ModalEdit';
import { useAppSelector } from './store/store';
import './styles/global.scss';
function App() {
  const { modalOpen } = useAppSelector((state) => state.pegarUmaTarefaSlice);
  return (
    <>
      <Main />
      {modalOpen && <ModalEdit />}
    </>
  );
}

export default App;
