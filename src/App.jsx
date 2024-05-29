import { Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import SignUp from "./pages/SignUp";
import UpdateTask from "./pages/UpdateTask";
import CreateTask from "./pages/CreateTask";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "../utils/ProtectedRoute";
import "./App.css"

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <ProtectedRoute exact path="/task" component={Tasks} />
          <ProtectedRoute exact path="/task/updated/:id" component={UpdateTask} />
          <ProtectedRoute exact path="/task/create" component={CreateTask} />
      </Switch>
    </div>
  )
}

export default App
