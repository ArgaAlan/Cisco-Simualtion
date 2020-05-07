import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function createTicket(
  numberId,
  subclass,
  category,
  lifecycle,
  description,
  incorpDate,
  releaseDate,
  effectivityDate,
  complianceCalculatedDate,
  overallcompliance,
  levelComplianceIndicator,
  complianceRollUp,
  productHierarchy,
  user
) {
  console.log(numberId);
  console.log(subclass);
  console.log(category);
  console.log(lifecycle);
  console.log(description);
  console.log(incorpDate);
  console.log(releaseDate);
  console.log(effectivityDate);
  console.log(complianceCalculatedDate);
  console.log(overallcompliance);
  console.log(levelComplianceIndicator);
  console.log(complianceRollUp);
  console.log(productHierarchy);
  console.log(user);
}

export default function FormPropsTextFields() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Store Ticket</Title>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            required
            id="number-id"
            label="Number ID"
            /*helperText="Some important text"*/
          />
          <TextField
            id="subclass"
            label="Subclass" /*onChange={(event) => }*/
          />
          <TextField id="category" label="Category" />
          <TextField id="lifecycle" label="Life-cycle" />
          <TextField id="description" label="Description" />
          <TextField id="incorpDate" label="Incorporation Date" />
          <TextField id="releaseDate" label="Release Date" />
          <TextField id="effectivityDate" label="Effectivity Date" />
          <TextField id="complianceDate" label="Compliance Date" />
          <TextField id="levelCompliance" label="Level Compliance" />
          <TextField id="productHierarchy" label="Product Hierarchy" />
          <TextField id="user" label="User" />
        </div>
      </form>
    </React.Fragment>
  );
}

class InputTicket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: {
        numberId: null,
        subclass: "",
        category: "",
        lifecycle: "",
        description: "",
        incorpDate: "",
        releaseDate: "",
      },
    };
  }
}
