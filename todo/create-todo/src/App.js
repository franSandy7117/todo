import './App.css';
import Mainpage from './Components/Mainpage/Mainpage';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup'
import Completed from './Components/Completed/Completed';
import Incompleted from './Components/Incompleted/Incompleted';
import TimeNotArrived from './Components/TimeNotArrived/TimeNotArrived';
import CreateTodo from './Components/CreateTodo/CreateTodo';
import { useContext } from 'react';
import AuthContext from './Components/store/authCntext';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Redirect to='/mainpage' />
        </Route>
        <Route path='/mainpage'>
          <Mainpage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path='/login'>
            <Login />
          </Route>
        )}
        {!authCtx.isLoggedIn && (
          <Route path='/signup'>
            <Signup />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path='/completed'>
            <Completed />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path='/incompleted'>
            <Incompleted />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path='/createtodo'>
            <CreateTodo />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path='/timenotarrived'>
            <TimeNotArrived />
          </Route>
        )} 

      </Switch>
    </div>
  );
}
export default App;
