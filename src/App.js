import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Mainpage from "./components/Mainpage";
import { Provider } from "react-redux";
import store from "./app/store";

const App = () => {
  return (
    <div className="app__root">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Auth />}></Route>
            <Route path="/vehicle" element={<Mainpage />}></Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
