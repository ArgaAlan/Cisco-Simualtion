import React, {
  Fragment,
  Component,
  useContext,
  useEffect,
  useState,
} from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { secondaryListItems } from "./listItems";
import SimulationList from "./SimulationList";
import Tickets from "./tickets/Tickets";
import TicketDetail from "./tickets/TicketDetail";
import InputTicket from "./InputTicket";
import PieChart from "./PieChart";
import NavBar from "./NavBar";
import Profile from "./Profile";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Context } from "../context/user/userContext";
import { useAuth0 } from "../react-auth0-spa";
import Loading from "./Loading";
import Simulation from "./Simulation";
import UpdateTicketModal from "./UpdateTicketModal";
import axios from "axios";
import TableStats from "./pages/TableStats";
import TicketList from "./TicketList";
import ProfileList from "./ProfileList";
import StatsList from "./StatsList";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        CMUC : Material UI
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const match = useRouteMatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const { loading, user } = useAuth0();
  const [privilege, setPrivilege] = useContext(Context);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (isAuthenticated) {
    axios({
      method: "post",
      url: "https://cisco-project.herokuapp.com/api/user/role",
      data: {
        email: user.email,
      },
    }).then(
      (response) => {
        setPrivilege(response.data.role);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  if (!isAuthenticated) {
    loginWithRedirect({});
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {loading && <Loading />}
          {isAuthenticated &&
            (privilege == "Normal" || privilege == "Admin") && <TicketList />}
          {isAuthenticated &&
            (privilege == "Analyst" || privilege == "Admin") && (
              <SimulationList />
            )}
          {isAuthenticated &&
            (privilege == "Analyst" || privilege == "Admin") && <StatsList />}
          {isAuthenticated && <ProfileList />}
        </List>
        <Divider />
        <List>{secondaryListItems}</List>
        <Divider />
        <List>
          <NavBar />
        </List>
      </Drawer>
      {isAuthenticated && privilege.privilege == "Not logged in" && (
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <h2>
                  Your account is correctly created, but you still don't have
                  any role in the database. Please contact technical support
                </h2>
              </Grid>
            </Grid>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      )}
      {isAuthenticated && privilege.privilege != "Not logged in" && (
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Switch>
                  <Route path="/" exact component={Tickets} />
                  <Route path="/ticket/:ticketId" component={TicketDetail} />
                  <Route path="/input-ticket/" component={InputTicket} />
                  <Route path="/simulation/" component={Simulation} />
                  <Route
                    path="/update-ticket-modal/"
                    component={UpdateTicketModal}
                  />
                  <Route path="/simulation/" component={Simulation} />
                  <Route path="/stats/" component={TableStats} />
                  <Route path="/profile/" component={Profile} />
                </Switch>
              </Grid>
            </Grid>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      )}
    </div>
  );
}
