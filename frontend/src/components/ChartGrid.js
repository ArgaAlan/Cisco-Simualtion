import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  RowDetailState,
  DataTypeProvider,
} from '@devexpress/dx-react-grid';
import {
  scaleBand,
} from '@devexpress/dx-chart-core';
import {
  ArgumentScale,
  Stack,
} from '@devexpress/dx-react-chart';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import {
  Grid, Table, TableBandHeader, TableHeaderRow,
  TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { causesCount, yearCount } from './tmpDummyData/data';

const detailContainerStyles = theme => ({
  detailContainer: {
    marginBottom: theme.spacing(3),
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: theme.typography.fontSize,
  },
  paper: {
    paddingTop: theme.spacing(3.5),
  },
});
const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});
const legendLabelStyles = () => ({
  label: {
    whiteSpace: 'nowrap',
  },
});

const AxisLabel = ({ text, ...restProps }) => (
  <ValueAxis.Label {...restProps} text={text} />
);

const CurrencyTypeProvider = props => (
  <DataTypeProvider
    {...props}
  />
);

const LegendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root
    {...restProps}
    className={classes.root}
  />
);
const LegendRoot = withStyles(legendStyles, { name: 'LegendRoot' })(LegendRootBase);

const LegendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const LegendLabel = withStyles(legendLabelStyles, { name: 'LegendLabel' })(LegendLabelBase);

const barSeriesForCity = regionCities => Object
  .keys(regionCities[0])
  .reduce((acc, item, index=0) => {
      //console.log(regionCities);
      //console.log(item);
      console.log(regionCities[index]);
    if (item !== 'cause') {
      acc.push(
        <BarSeries
          key={index.toString()}
          valueField={item}
          argumentField="cause"
          name={item}
        />,
      );
    }
    //console.log(regionCities);
    
    return acc;
  }, []);

const gridDetailContainerBase = data => ({ row, classes }) => {
    //console.log(data);
  const regionCities = data.reduce((acc, item) => {
      //console.log(acc);
      //console.log(item);
    const currentCities = item.reports.reduce((current, itemCity) => {
        //console.log(current);
        //console.log(itemCity);
      let currentObj = {};
      if (itemCity.year === row.year) {
        currentObj = { [itemCity.status]: itemCity.count };
        //console.log(currentObj);
      }
      return { ...current, ...currentObj };
    }, []);
    //console.log(item);
    return [...acc, { cause: item.cause, ...currentCities }];
  }, []);
  return (
    <div className={classes.detailContainer}>
      <h5 className={classes.title}>
        {`Reports of ${row.year}`}
      </h5>
      <Paper className={classes.paper}>
        <Chart
          data={regionCities}
          height={30}
        >
          <ArgumentScale
            factory={scaleBand}
          />
          <ArgumentAxis
            showTicks={false}
          />
          <ValueAxis
            labelComponent={AxisLabel}
          />
          {barSeriesForCity(regionCities)}
          <Stack />
          <Legend
            rootComponent={LegendRoot}
            labelComponent={LegendLabel}
            position="bottom"
          />
        </Chart>
      </Paper>
    </div>
  );

};
const gridDetailContainer = data => withStyles(detailContainerStyles, { name: 'ChartContainer' })(gridDetailContainerBase(data));

export default () => {
  const [columns] = useState([
    { name: 'year', title: 'Year' },
    { name: 'countDD', title: 'Due date' },
    { name: 'countQLT', title: 'Bad quality' },
    { name: 'countQNT', title: 'Low quantity' },
  ]);
  const [rows] = useState(causesCount);
  const [data] = useState(yearCount);
  const [columnBands] = useState([
    {
      title: 'Cause',
      children: [
        { columnName: 'countDD' },
        { columnName: 'countQLT' },
        { columnName: 'countQNT' },
      ],
    },
  ]);
  const [currencyColumns] = useState(['countDD', 'countQLT', 'countQNT']);

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
      >
        <CurrencyTypeProvider
          for={currencyColumns}
        />
        <RowDetailState
          defaultExpandedRowIds={[1]}
        />
        <Table />
        <TableHeaderRow />
        <TableRowDetail
          contentComponent={gridDetailContainer(data)}
        />
        <TableBandHeader
          columnBands={columnBands}
        />
      </Grid>
    </Paper>
  );
};
