import { Provider } from 'react-redux'
import './App.css'
import store from './redux/store/store'
import Routing from './routes/Routing';
import jwtDecode from 'jwt-decode';
function App() {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  )
}

export default App
