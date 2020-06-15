import React from 'react';
import Dashboard from './components/Dashboard';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import './App.css';
import SignIn from "./components/SignIn"
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/signin/" component={SignIn}></Route>
          <Route path="/" component={Dashboard}></Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
