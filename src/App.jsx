import { Provider } from "react-redux";
import "./App.css";
import store from "./redux/store/store";
import Routing from "./routes/Routing";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div id="body_main">
      <Provider store={store}>
        <Routing />
      </Provider>
    </div>
  );
}

export default App;
