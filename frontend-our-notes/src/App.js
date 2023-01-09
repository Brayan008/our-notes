import "bootswatch/dist/morph/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'react-notifications/lib/notifications.css';
import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Tasks from './pages/Tasks';
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyTasks from "./pages/MyTasks";


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="my-tasks" element={<MyTasks />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
