import React from 'react';
import Header from './Header';
import Main from './Main';
import { withAuth0 } from '@auth0/auth0-react';

import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Profile from './components/Profile';
import Login from './Login';
import BestPlaces from './BestPlaces';


class App extends React.Component {

  render() {
    const {user , isAuthenticated} = this.props.auth0;
    return(
      <>
        <Router>
            <Header />
            <Switch>
              <Route exact path="/">
                {isAuthenticated ? <Main/> : <Login/>}
              </Route>

              <Route exact path="/profile">
                <Profile/>
              </Route>
              <Route exact path="/favplaces">
                <BestPlaces/>
              </Route>


            </Switch>
            <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
