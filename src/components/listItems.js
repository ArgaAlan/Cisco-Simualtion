import React, { useContext } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListIcon from "@material-ui/icons/List";
import PersonIcon from "@material-ui/icons/Person";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import BarChartIcon from "@material-ui/icons/BarChart";
import InfoIcon from "@material-ui/icons/Info";
import { NavLink } from "react-router-dom";
import { Context } from "../context/user/userContext";

export const secondaryListItems = (
  <div>
    <ListSubheader inset>More</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText primary="About" />
    </ListItem>
  </div>
);
