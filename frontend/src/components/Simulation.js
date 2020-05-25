import React from 'react';
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';


export default function Simulation() {
    return (
        <div>
            <Container maxWidth="sm">
                <form noValidate autoComplete="off">
                    <div>
                     <TextField id="standard-basic" label="User" />
                     </div>
                     <div>
                     <TextField id="standard-basic" label="Date" />
                     </div>
                     <div>
                         <p></p>
                     </div>
                     <div>
                     <Button variant="outlined" color="primary">
                        Simulation
                    </Button>
                     </div>
                </form>
            </Container>
        </div>
    )
}
