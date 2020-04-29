import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, 'Cabeza cruz', 'Tornillo', 'Envio', 'Tornillio de cabeza de cruz', "2/19/2020","2/20/2020", "2/21/2020", "2/22/2020", "Excellent", "Nice", "High", "Alan"),
  createData(1, 'Cabeza cruz', 'Tornillo', 'Envio', 'Tornillio de cabeza de cruz', "2/19/2020","2/20/2020", "2/21/2020", "2/22/2020", "Excellent", "Nice", "High", "Alan"),
  createData(2, 'Cabeza cruz', 'Tornillo', 'Envio', 'Tornillio de cabeza de cruz', "2/19/2020","2/20/2020", "2/21/2020", "2/22/2020", "Excellent", "Nice", "High", "Alan"),
  createData(3, 'Cabeza cruz', 'Tornillo', 'Envio', 'Tornillio de cabeza de cruz', "2/19/2020","2/20/2020", "2/21/2020", "2/22/2020", "Excellent", "Nice", "High", "Alan"),
  createData(4, 'Cabeza cruz', 'Tornillo', 'Envio', 'Tornillio de cabeza de cruz', "2/19/2020","2/20/2020", "2/21/2020", "2/22/2020", "Excellent", "Nice", "High", "Alan"),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>numberID</TableCell>
            <TableCell>subclass</TableCell>
            <TableCell>category</TableCell>
            <TableCell>lifecycle</TableCell>
            <TableCell>description</TableCell>
            <TableCell>incorporation date</TableCell>
            <TableCell>release date</TableCell>
            <TableCell>effectivity date</TableCell>
            <TableCell>compliance calculated date</TableCell>
            <TableCell>overall compliance</TableCell>
            <TableCell>level compliance indicator</TableCell>
            <TableCell>compliance rolll up</TableCell>
            <TableCell>product hierarchy</TableCell>
            <TableCell>user</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.numberID}>
              <TableCell>{row.subclass}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.lifecycle}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.incorpDate}</TableCell>
              <TableCell>{row.releaseDate}</TableCell>
              <TableCell>{row.effectivityDate}</TableCell>
              <TableCell>{row.complianceCalculatedDate}</TableCell>
              <TableCell>{row.overallCompliance}</TableCell>
              <TableCell>{row.levelComplianceIndicator}</TableCell>
              <TableCell>{row.complianceRollUp}</TableCell>
              <TableCell>{row.productHierarchy}</TableCell>
              <TableCell>{row.user}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
