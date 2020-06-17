import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  AreaSeries,
  BarSeries,
  SplineSeries,
  ScatterSeries,
  ArgumentAxis,
  ValueAxis,
  Title,
  Legend,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';

import {
  Stack,
  Animation,
  EventTracker,
  ArgumentScale,
  HoverState,
} from '@devexpress/dx-react-chart';
import { HOVERED } from '@devexpress/dx-chart-core';
import { connectProps } from '@devexpress/dx-react-core';
import { scaleBand } from '@devexpress/dx-chart-core';
import { format } from 'd3-format';

import { ChartInfo } from './tmpDummyData/data';

const totalReports = 'Total reports';
const reportColor = '#41c0f0';
const priceColor = '#fcd45a';

const makeLabel = (symbol, color) => ({ text, style, ...restProps }) => (
  <ValueAxis.Label
    text={`${text} ${symbol}`}
    style={{
      fill: color,
      ...style,
    }}
    {...restProps}
  />
);
const PriceLabel = makeLabel('$', priceColor);
const LabelWithThousand = makeLabel('k', reportColor);

const patchProps = ({ hoverIndex, ...props }) => ({
  state: props.index === hoverIndex ? HOVERED : null,
  ...props,
});

const BarPoint = props => (
  <BarSeries.Point {...patchProps(props)} />
);

const pointOptions = { size: 7 };
const getPointOptions = state => (state ? { size: 7 } : { size: 0 });

const AreaPoint = (props) => {
  const patched = patchProps(props);
  return <ScatterSeries.Point point={getPointOptions(patched.state)} {...patched} />;
};

const AreaWithPoints = ({ state, ...props }) => (
  <React.Fragment>
    <AreaSeries.Path {...props} />
    <ScatterSeries.Path {...props} />
  </React.Fragment>
);

const SplinePoint = props => (
  <ScatterSeries.Point point={pointOptions} {...patchProps(props)} />
);

const SplineWithPoints = props => (
  <React.Fragment>
    <SplineSeries.Path {...props} />
    <ScatterSeries.Path {...props} />
  </React.Fragment>
);

const series = [
  { name: 'Due date', key: 'due', color: '#08abbd' },
  { name: 'Quantity', key: 'quan', color: '#78bc97' },
  { name: 'Quality', key: 'qual', color: '#d4d67e' },
  {
    name: totalReports, key: 'total', color: reportColor, type: AreaSeries,
  },
];

const legendRootStyle = {
  display: 'flex',
  margin: 'auto',
  flexDirection: 'row',
};
const LegendRoot = props => (
  <Legend.Root {...props} style={legendRootStyle} />
);

const legendItemStyle = {
  flexDirection: 'column',
  marginLeft: '-2px',
  marginRight: '-2px',
};
const LegendItem = props => (
  <Legend.Item {...props} style={legendItemStyle} />
);

const legendLabelStyle = {
  whiteSpace: 'nowrap',
};
const LegendLabel = props => (
  <Legend.Label {...props} style={legendLabelStyle} />
);

const formatTooltip = format('.1f');
const TooltipContent = ({
  data, text, style, ...props
}) => {
  const alignStyle = {
    ...style,
    paddingLeft: '10px',
  };
  const items = series.map(({ name, key, color }) => {
    const val = data[key];
    return (
      <tr key={key}>
        <td>
          <svg width="10" height="10">
            <circle cx="5" cy="5" r="5" fill={color} />
          </svg>
        </td>
        <td>
          <Tooltip.Content style={alignStyle} text={name} {...props} />
        </td>
        <td align="right">
          <Tooltip.Content style={alignStyle} text={val ? formatTooltip(val) : 'N/A'} {...props} />
        </td>
      </tr>
    );
  });
  return (
    <table>
      {items}
    </table>
  );
};

const stacks = [
  { series: series.filter(obj => !obj.type).map(obj => obj.name) },
];

/*const modifyOilDomain = domain => [domain[0], 2200];
const modifyPriceDomain = domain => [domain[0], 110];*/

const getHoverIndex = ({ target }) => (target ? target.point : -1);

function parseData(tktArray){
    // It's assumed that the only data gets passed as input to this function is from the SAME year

    var tktLen = tktArray.lenght;
    var i;
    // issueCategory - atribute to check
    // 1 - Due dates
    // 2 - Quality
    // 3 - Quantity 
    var monthlyTkt = [];
    for (i = 0; i < 12; i++) {
        monthlyTkt = new Array(3);
    }

    // Counts every ticket and asing it to its respective category in its respective month
    for (i = 0; i < tktLen; i++) {
        switch(tktArray[i].openDate["default"]){
            case "Due dates":
                monthlyTkt[tktArray[i].openDate.getMonth()][0]+=1;
                break;
            case "Quality":
                monthlyTkt[tktArray[i].openDate.getMonth()][1]+=1;
                break;
            case "Quantity":
                monthlyTkt[tktArray[i].openDate.getMonth()][2]+=1;
                break;
        }
    }

    return parseToJSON(monthlyTkt);
}

function parseToJSON(monthlyTkt){
    var data = {};
    var i, j;
    var due, qual, quan, total;
    for(i = 0; i < 11; i++) {
        data[i]=[]
    }
    
    for(i = 0; i < monthlyTkt.lenght; i++){
        due = monthlyTkt[i][0]
        qual = monthlyTkt[i][1]
        quan = monthlyTkt[i][2]
        total = due+qual+quan;


        data[i].append({
            'month': i,
            'due': due,
            'qual': qual,
            'quan': quan,
            'total': total
        })
    }
    return data;
}

export default class DataAnalysis extends React.PureComponent {
    constructor(props) {
        super(props);
    
        this.state = {
          data: ChartInfo,
          target: null,
        };
    
        this.changeHover = target => this.setState({
          target: target ? { series: totalReports, point: target.point } : null,
        });
    
        this.createComponents();
        this.createSeries();
      }
    
      componentDidUpdate(prevProps, prevState) {
        if (getHoverIndex(prevState) !== getHoverIndex(this.state)) {
          this.BarPoint.update();
          this.SplinePoint.update();
          this.AreaPoint.update();
          this.TooltipContent.update();
        }
      }
    
      createComponents() {
        const getHoverProps = () => ({
          hoverIndex: getHoverIndex(this.state),
        });
        this.BarPoint = connectProps(BarPoint, getHoverProps);
        this.SplinePoint = connectProps(SplinePoint, getHoverProps);
        this.AreaPoint = connectProps(AreaPoint, getHoverProps);
    
        this.TooltipContent = connectProps(TooltipContent, () => {
          const { data, target } = this.state;
          return { data: target ? data[target.point] : null };
        });
      }
    
      createSeries() {
        this.series = series.map(({
          name, key, color, type, scale,
        }) => {
          const props = {
            key: name,
            name,
            valueField: key,
            argumentField: 'year',
            color,
            scaleName: scale || 'reports',
            pointComponent: this.BarPoint,
          };
          if (type === AreaSeries) {
            props.seriesComponent = AreaWithPoints;
            props.pointComponent = this.AreaPoint;
          } else if (type) {
            props.seriesComponent = SplineWithPoints;
            props.pointComponent = this.SplinePoint;
          }
          return React.createElement(type || BarSeries, props);
        });
      }
    
/*<ValueScale
                name="oil"
                modifyDomain={modifyOilDomain}
              />
              <ValueScale
                name="price"
                modifyDomain={modifyPriceDomain}
              />*/

      render() {
        const { data, target } = this.state;
    
        return (
          <Paper>
            <Chart
              data={data}
            >
            <ArgumentScale factory={scaleBand} />
              <ValueAxis
                scaleName="oil"
                labelComponent={LabelWithThousand}
              />
              <ValueAxis
                scaleName="price"
                position="right"
                labelComponent={PriceLabel}
              />
    
              <Title
                text="Anual reports"
              />
    
              {this.series}
    
              <Animation />
              <Legend
                position="bottom"
                rootComponent={LegendRoot}
                itemComponent={LegendItem}
                labelComponent={LegendLabel}
              />
              <Stack stacks={stacks} />
              <EventTracker />
              <HoverState
                hover={target}
                onHoverChange={this.changeHover}
              />
              <Tooltip
                targetItem={target}
                contentComponent={this.TooltipContent}
              />
            </Chart>
          </Paper>
        );
      }
}