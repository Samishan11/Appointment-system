import { Provider } from 'react-redux'
import './App.css'
import store from './redux/store/store'
import Routing from './routes/Routing';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Provider store={store}>
      <Routing />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer style={{textAlign:"justify"}} />
    </Provider>
  )
}

export default App
