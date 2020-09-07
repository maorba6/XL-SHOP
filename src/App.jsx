import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { Header } from './cmps/Header/Header'
import { Footer } from './cmps/Footer/Footer'
import { Home } from './pages/Home/Home'
import { Login } from './pages/Login/Login'
import { Main } from './pages/Main/Main'
import { Edit } from './pages/Edit/Edit'
import { Details } from './pages/Details/Details'
import './App.scss';

function App() {
  return (
    <div className="App">

      <Router>
        <Header></Header>
        <div className="app-container">
          <Switch>
            <Route component={Login} path="/login" />
            <Route component={Main} exact path="/main" />
            <Route component={Edit} path="/item/edit/:id" />
            <Route component={Edit} path="/item/edit" />
            <Route component={Details} path="/item/:id" />

            {/* Best way to send props to a route: */}
            {/* <Route render={ (props) => <About { ...props } someProp="popo" /> } path="/about" /> */}
            <Route component={Home} exact path="/" />
          </Switch>
        </div>
      </Router>
      <Footer></Footer>
    </div>
  );
}

export default App;
