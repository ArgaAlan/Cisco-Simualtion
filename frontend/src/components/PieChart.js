import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  PieSeries,
  Title,
} from "@devexpress/dx-react-chart-material-ui";

import { Animation } from "@devexpress/dx-react-chart";
import axios from 'axios';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        regression: {
          materialLeadTime: {
            transportIssue: [],
            demandSurge: [],
            productDesignChange: []
          },
          materialQuantity: {
            yieldIssue: [],
            scrapDueToEco: [],
          },
          materialQuality: {
            manufacturingIssue: [],
            designIssue: [],
            processIssue: [],
            trainingIssue: []
          }
        }
      },
      title: "Paises",
      data2: [
        { country: "Russia", area: 12 },
        { country: "Canada", area: 7 },
        { country: "USA", area: 7 },
        { country: "China", area: 7 },
        { country: "Brazil", area: 6 },
        { country: "Australia", area: 5 },
        { country: "India", area: 2 },
        { country: "Others", area: 55 },
      ],
      loading: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({ loading: true });
    const res = await axios.get('http://localhost:8000/simulation');
    this.setState({ data: res.data, loading: false });
    console.log(res.data);
  };

  render() {
    if (this.state.loading == true) {
      return <h1>Loading</h1>;
    }
    console.log(this.state.data);
    console.log(this.state.data.regression.materialLeadTime);
    return (
      <Paper>
        <Chart data={this.state.data2}>
          <PieSeries valueField="area" argumentField="country" />
          <Title text={this.state.title} />
          <Animation />
        </Chart>
        <Chart data={this.state.data2}>
          <PieSeries valueField="area" argumentField="country" />
          <Title text={this.state.title} />
          <Animation />
        </Chart>
        <Chart data={this.state.data2}>
          <PieSeries valueField="area" argumentField="country" />
          <Title text={this.state.title} />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}
