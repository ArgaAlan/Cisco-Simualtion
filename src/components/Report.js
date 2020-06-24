import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import { Context } from "../context/user/userContext";
import TicketContext from '../context/ticket/ticketContext';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Title,
  Legend,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import * as d3Format from 'd3-format';
import { scaleBand } from '@devexpress/dx-chart-core';
import {
  ArgumentScale, Stack, Animation, EventTracker, HoverState, SelectionState,
} from '@devexpress/dx-react-chart';
import { withStyles } from '@material-ui/core/styles';
import ChartGrid from './ChartGrid';

import { ChartInfo as data } from './tmpDummyData/data';

const styles = theme => ({
  primaryButton: {
    margin: theme.spacing(1),
    width: '120px',
  },
  secondaryButton: {
    margin: theme.spacing(1),
    width: '170px',
  },
  leftIcon: {
    marginRight: theme.spacing(1),
    marginBottom: '1px',
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
    marginBottom: '1px',
  },
  text: {
    display: 'flex',
    flexDirection: 'row',
  },
  group: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  hoverGroup: {
    width: '300px',
  },
  name: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
});

const tooltipContentTitleStyle = {
  fontWeight: 'bold',
  paddingBottom: 0,
};
const tooltipContentBodyStyle = {
  paddingTop: 0,
};
const formatTooltip = d3Format.format(',');
const TooltipContent = (props) => {
  const { targetItem, text, ...restProps } = props;
  return (
    <div>
      <div>
        <Tooltip.Content
          {...restProps}
          style={tooltipContentTitleStyle}
          text={targetItem.series}
        />
      </div>
      <div>
        <Tooltip.Content
          {...restProps}
          style={tooltipContentBodyStyle}
          text={formatTooltip(text)}
        />
      </div>
    </div>
  );
};
const Root = withStyles({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
})(({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
));
const Label = withStyles({
  label: {
    whiteSpace: 'nowrap',
  },
})(({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
));

const TitleText = withStyles({ title: { marginBottom: '30px' } })(({ classes, ...restProps }) => (
  <Title.Text {...restProps} className={classes.title} />
));

const formatInfo = (target) => {
  if (!target) {
    return 'None';
  }
  const { series, point } = target;
  const value = data[point].series;
  const argument = data[point].month;
  return `${series} ${value} sales in ${argument}`;
};


const encodeTarget = ({ series, point }) => (2 * point + Number(series === 'China'));
const decodeTarget = code => ({ series: code % 2 ? 'China' : 'USA', point: Math.floor(code / 2) });

const compareTargets = (
  { series, point }, { series: targetSeries, point: targetPoint },
) => series === targetSeries && point === targetPoint;


class Report extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hover: null,
      selection: [{ series: 'USA', point: 3 }],
      tooltipTarget: null,
      tooltipEnabled: true,
    };

    this.click = ({ targets }) => {
      const target = targets[0];
      if (target) {
        this.setState(({ selection }) => ({
          selection: selection[0] && compareTargets(selection[0], target) ? [] : [target],
        }));
      }
    };
    this.changeHover = hover => this.setState({ hover });
    this.changeTooltip = targetItem => this.setState({ tooltipTarget: targetItem });

    this.clearSelection = () => this.setState({ selection: [] });
    this.turnPrevSelection = () => this.setState(({ selection }) => {
      const target = selection[0];
      if (!target) {
        return null;
      }
      const newTarget = decodeTarget(Math.max(encodeTarget(target) - 1, 0));
      return { selection: [newTarget] };
    });
    this.turnNextSelection = () => this.setState(({ selection }) => {
      const target = selection[0];
      if (!target) {
        return null;
      }
      const newTarget = decodeTarget(Math.min(encodeTarget(target) + 1, 2 * data.length - 1));
      return { selection: [newTarget] };
    });

    this.toggleTooltip = () => this.setState(({ tooltipEnabled }) => ({
      tooltipEnabled: !tooltipEnabled,
      tooltipTarget: null,
    }));

  }

  

  render() {
    const {
      hover, selection, tooltipTarget, tooltipEnabled,
    } = this.state;
    const { classes } = this.props;
    if (Array.isArray(this.props.tickets) && this.props.tickets.length){
      //Manipular info aquí
      var AnualSummary = []
      var yearsUpFar = [];
      var {year, month} = 0
      for(var i=0; i < this.props.tickets.length; i++){
        var currentTicket = this.props.tickets[i];
        var openDate = currentTicket.openDate.substring(0,10);

        year = parseInt(openDate.split("-")[0]);
        month = parseInt(openDate.split("-")[1]);

        // Año no registrado previamente
        if(!yearsUpFar.includes(year)){
          yearsUpFar.push(year);

          for(var j=0; j < 12; j++){
            var toPush = {
              month: j, year: year, dueDate: 0, quality: 0, quantity: 0, total: 0
            }
            AnualSummary.push(toPush);

          }
          //console.log("Registro del año creado"); 
        }

        AnualSummary[month].total += 1;

        //Checa el tipo de causa de ticket
        var toCompare = currentTicket.issueCategory.toString();
        //console.log(toCompare); 
        if (toCompare === "Material Lead Time"){
          AnualSummary[month].dueDate = AnualSummary[month].dueDate + 1;
        } else if (toCompare === "Material Quality") {
          AnualSummary[month].quality = AnualSummary[month].quality + 1;
        } else {
          AnualSummary[month].quantity = AnualSummary[month].quantity + 1;
        }
        
      }
      console.log(AnualSummary);
    }

    
    
    return (
      <Paper>
        <Chart
          data={AnualSummary}
        >
          <ArgumentScale factory={scaleBand} />
          <ArgumentAxis />
          <ValueAxis />
          <Title
            text="Side-by-side monthly reports comparison"
            textComponent={TitleText}
          />

          <BarSeries
            name="Material Lead Time"
            valueField="dueDate"
            argumentField="month"
          />
          <BarSeries
            name="Material Quality"
            valueField="quality"
            argumentField="month"
          />
          <BarSeries
            name="Material Quantity"
            valueField="quantity"
            argumentField="month"
          />
          <BarSeries
            name="Total"
            valueField="total"
            argumentField="month"
          />
          <Stack />
          <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
          <EventTracker onClick={this.click} />
          <HoverState hover={hover} onHoverChange={this.changeHover} />
          <Tooltip
            targetItem={tooltipEnabled && tooltipTarget}
            onTargetItemChange={this.changeTooltip}
            contentComponent={TooltipContent}
          />
          <SelectionState selection={selection} />
          <Animation />
        </Chart>
        <div className={classes.group} id="gridch">
          <ChartGrid data={this.props.data}/>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(Report);
