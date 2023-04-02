import { Provider } from 'react-redux'
import './App.css'
import store from './redux/store/store'
import Routing from './routes/Routing';
import jwtDecode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Provider store={store}>
      <Routing />
      <ToastContainer />
    </Provider>
  )
}

export default App
