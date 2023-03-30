import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import './App.css'
import store from './redux/store/store'
import Routing from './routes/Routing'
function App() {

  return (
    <Provider store={store}>
      <Routing />
      <ToastContainer />
    </Provider>
  )
}

export default App
