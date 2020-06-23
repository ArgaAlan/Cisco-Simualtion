function createData(week, numMlt, numMqnt, numMqlt, history) {
  return {
    week,
    numMlt,
    numMqnt,
    numMqlt,
    total: numMlt + numMqnt + numMqlt,
    history // tickets of week
  };
}

function createTicketData(date, impactedUser, reason, summary) {
  return {
    date,
    impactedUser,
    reason,
    summary
  }
}

export default [
  createData('Jun 22 - Jun 26', 50, 18, 3, [
    createTicketData('2020-06-22', 'juanperez2@gmail.com', 'design issue', 'subclass 3 ram problem'),
    createTicketData('2020-06-22', 'juanperez2@gmail.com', 'demand surge', 'check demand'),
    createTicketData('2020-06-24', 'juanperez2@gmail.com', 'design issue', 'subclass 3 ram problem')
  ]),
  createData('Jun 29 - Jul 03', 30, 40, 4, [
    createTicketData('2020-06-22', 'juanperez2@gmail.com', 'design issue', 'subclass 3 ram problem'),
    createTicketData('2020-06-22', 'juanperez2@gmail.com', 'demand surge', 'check demand'),
    createTicketData('2020-06-24', 'juanperez2@gmail.com', 'design issue', 'subclass 3 ram problem')
  ]),
  
];