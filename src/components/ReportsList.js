import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TimelineIcon from '@material-ui/icons/Timeline';
import { NavLink } from "react-router-dom";

const ReportsList = () => {
  return (
    <div>
      <NavLink to="/analysis" className="nav-link-item">
        <ListItem button>
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
      </NavLink>
    </div>
  );
};

export default ReportsList;
