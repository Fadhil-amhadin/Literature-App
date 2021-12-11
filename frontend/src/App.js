import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthRoute, PrivateRoute } from './context/routes';
import LandingPage from './pages/LandingPage';
import Search from './pages/Search';
import SearchResult from './pages/SearchResult';
import AddLiterature from './pages/AddLiterature';
import Detail from './pages/Detail';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Collection from './pages/Collection';
import Test from './pages/Test';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path='/' component={LandingPage}/>
          <AuthRoute exact path='/search' component={Search}/>
          <AuthRoute exact path='/profile' component={Profile}/>
          <AuthRoute exact path='/add' component={AddLiterature}/>
          <AuthRoute exact path='/detail/:id' component={Detail}/>
          <AuthRoute exact path='/collection' component={Collection}/>
          <AuthRoute exact path='/search-result' component={SearchResult}/>
          <AuthRoute exact path='/search-result/:props' component={SearchResult}/>
          <PrivateRoute exact path='/admin-dashboard' component={AdminDashboard}/>
          <PrivateRoute exact path='/analytics' component={Analytics}/>
      </Switch>
    </Router>
  );
}

export default App;
