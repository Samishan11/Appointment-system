import { Provider } from 'react-redux'
import './App.css'
import store from './redux/store/store'
import Routing from './routes/Routing';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const startTimeStr = "10:36";
const endTimeStr = "10:40";
const startDate = new Date("2023-03-15T" + startTimeStr);
const endDate = new Date("2023-03-15T" + endTimeStr);
console.log(endDate)
const diffInMs = endDate.getTime() - startDate.getTime();
const diffInMin = Math.round(diffInMs / (1000 * 60)); // convert milliseconds to minutes

// console.log(`The difference between the two times is ${diffInMin} minutes`);
console.log(diffInMs)
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
      <ToastContainer />
    </Provider>
  )
}

export default App
