import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  PieSeries,
  Title,
} from "@devexpress/dx-react-chart-material-ui";

import { Animation } from "@devexpress/dx-react-chart";
import axios from "axios";

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        regression: {
          materialLeadTime: {
            transportIssue: [],
            demandSurge: [],
            productDesignChange: [],
          },
          materialQuantity: {
            yieldIssue: [],
            scrapDueToEco: [],
          },
          materialQuality: {
            manufacturingIssue: [],
            designIssue: [],
            processIssue: [],
            trainingIssue: [],
          },
        },
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
      sumMaterialLeadTimeDemand: 0,
      sumMaterialLeadTimeDesign: 0,
      sumMaterialLeadTimeTransport: 0,
      sumMaterialQualityManufaturing: 0,
      sumMaterialQualityDesign: 0,
      sumMaterialQualityProcess: 0,
      sumMaterialQualityTraining: 0,
      sumMaterialQuantityYield: 0,
      sumMaterialQuantityScrap: 0,
      sumMaterialLeadTime: [],
      sumMaterialQuality: [],
      sumMaterialQuantity: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({ loading: true });
    const res = await axios.get("http://localhost:8000/simulation");
    this.setState({ data: res.data, loading: false });
  };

  render() {
    if (this.state.loading === true) {
      return <h1>Loading</h1>;
    }
    console.log(this.state.data.regression);
    //sum for materialLeadTime

    for (
      let index = 0;
      index < this.state.data.regression.materialLeadTime.demandSurge.length;
      index++
    ) {
      this.state.sumMaterialLeadTimeDemand += this.state.data.regression.materialLeadTime.demandSurge[
        index
      ];
      this.state.sumMaterialLeadTimeDesign += this.state.data.regression.materialLeadTime.productDesignChange[
        index
      ];
      this.state.sumMaterialLeadTimeTransport += this.state.data.regression.materialLeadTime.transportIssue[
        index
      ];
    }
    console.log(this.state.sumMaterialLeadTimeDemand);
    console.log(this.state.sumMaterialLeadTimeDesign);
    console.log(this.state.sumMaterialLeadTimeTransport);

    for (
      let index = 0;
      index < this.state.data.regression.materialQuality.designIssue.length;
      index++
    ) {
      this.state.sumMaterialQualityDesign += this.state.data.regression.materialQuality.designIssue[
        index
      ];
      this.state.sumMaterialQualityManufaturing += this.state.data.regression.materialQuality.manufacturingIssue[
        index
      ];
      this.state.sumMaterialQualityProcess += this.state.data.regression.materialQuality.processIssue[
        index
      ];
      this.state.sumMaterialQualityTraining += this.state.data.regression.materialQuality.trainingIssue[
        index
      ];
    }
    console.log(this.state.sumMaterialQualityDesign);
    console.log(this.state.sumMaterialQualityManufaturing);
    console.log(this.state.sumMaterialQualityProcess);
    console.log(this.state.sumMaterialQualityTraining);

    for (
      let index = 0;
      index < this.state.data.regression.materialQuantity.scrapDueToEco.length;
      index++
    ) {
      this.state.sumMaterialQuantityScrap += this.state.data.regression.materialQuantity.scrapDueToEco[
        index
      ];
      this.state.sumMaterialQuantityYield += this.state.data.regression.materialQuantity.yieldIssue[
        index
      ];
    }
    console.log(this.state.sumMaterialQuantityScrap);
    console.log(this.state.sumMaterialQuantityYield);

    this.state.sumMaterialLeadTime = [
      { country: "Design Change", area: this.state.sumMaterialLeadTimeDesign },
      { country: "Demand Surge", area: this.state.sumMaterialLeadTimeDemand },
      {
        country: "Transport Issue",
        area: this.state.sumMaterialLeadTimeTransport,
      },
    ];

    this.state.sumMaterialQuality = [
      {
        country: "Manufacturing Issue",
        area: this.state.sumMaterialQualityManufaturing,
      },
      { country: "Design Issue", area: this.state.sumMaterialQualityDesign },
      { country: "Process Issue", area: this.state.sumMaterialQualityProcess },
      {
        country: "Training Issue",
        area: this.state.sumMaterialQualityTraining,
      },
    ];

    this.state.sumMaterialQuantity = [
      {
        country: "Yield Issue",
        area: this.state.sumMaterialQuantityYield,
      },
      {
        country: "Scrap due to Eco",
        area: this.state.sumMaterialQuantityScrap,
      },
    ];

    return (
      <Paper>
        <Chart data={this.state.sumMaterialLeadTime}>
          <PieSeries valueField="area" argumentField="country" />
          <Title text="Lead Time Issue" />
          <Animation />
        </Chart>
        <Chart data={this.state.sumMaterialQuality}>
          <PieSeries valueField="area" argumentField="country" />
          <Title text="Quantity Issue" />
          <Animation />
        </Chart>
        <Chart data={this.state.sumMaterialQuantity}>
          <PieSeries valueField="area" argumentField="country" />
          <Title text="Quality Issue" />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}
