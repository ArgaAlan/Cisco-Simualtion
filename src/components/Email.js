import React from 'react';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';

export default function Email() {
    return (
        <div>
            <h2 id="simple-modal-title">Enter Email</h2>
            <form noValidate autoComplete="off">
                <TextField id="standard-basic" label="Email" />
            </form>
            <SimpleModal />
            
        </div>
    )
}

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});