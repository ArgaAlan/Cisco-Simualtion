import React from "react";
import Dashboard from "./components/Dashboard";
import Loading from "./components/Loading";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import "./App.css";
import SignIn from "./components/SignIn";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TicketState from "./context/ticket/TicketState";
import UserState from "./context/user/userContext";
import { useAuth0 } from "./react-auth0-spa";

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <UserState>
      <TicketState>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route path="/signin/" component={SignIn}></Route>
              <Route path="/" component={Dashboard}></Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </TicketState>
    </UserState>
  );
}

export default App;
