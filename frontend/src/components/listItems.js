import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListIcon from '@material-ui/icons/List';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import BarChartIcon from '@material-ui/icons/BarChart';
import InfoIcon from '@material-ui/icons/Info';
import { NavLink } from 'react-router-dom';

export const mainListItems = (
  <div>
    <NavLink to='/' className='nav-link-item' >
      <ListItem button>
        <ListItemIcon>
          <ListIcon />
        </ListItemIcon>
        <ListItemText primary="Ticket List" />
      </ListItem>
    </NavLink>
    <NavLink to='/simulation' className='nav-link-item' >
      <ListItem button>
        <ListItemIcon>
          <BubbleChartIcon />
        </ListItemIcon>
        <ListItemText primary="Simulation" />
      </ListItem>
    </NavLink>
    <NavLink to='/stats/' className='nav-link-item' >
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Ticket Stats" />
      </ListItem>
    </NavLink>
    
  </div>
);

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
