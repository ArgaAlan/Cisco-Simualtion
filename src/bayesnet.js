// Bayesian Network to determine 
// Events: 
// 	A. Probability product will fail due Material Lead Time Risk: Transport Issue
// 	B. Probability product will fail due Material Lead Time Risk: Demand Surge
// 	C. Probability product will fail due Material Lead Time Risk: Product Design Change
// 	D. Probability product will not fail on Material Lead Time stage
// 	E. Probability product will fail due Material Quantity Risk: Yield Issue
// 	F. Probability product will fail due Material Quantity Risk: Scrap due to ECO
//  G. Probability product will not fail at Material Quantity Stage
// 	H. Probability product will fail due Material Quality Risk: Manufacturing Issue
// 	I. Probability product will fail due Material Quality Risk: Design Issue
// 	J. Probability product will fail due Material Quality Risk: Process Issue
// 	K. Probability product will fail due Material Quality Risk: Training Issue
// 	L. Probability product will not fail in Material Quality Stage
//   
//   Network:
//   START
//     |
//   MLT RISK
//      |
//   MQuant RISK
//       |
//   MQuality RISK

export default function simulate() {

    // Main simulation
    const mlt_risk = [[0.20, 0.20, 0.10, 0.50]];
    const mqnt_risk = [[0.30, 0.30, 0.40], [0, 0, 1]];
    const mqlt_risk = [[0.10, 0.05, 0.25, 0.40, 0.20], [0, 0, 0, 0, 1]];

    var output, rand, failure, l, u, i, probs;

    output = [];

    // First random probability value (Material Lead Time)
    rand = random.random();
    failure = 0;
    l = 0;
    u = 0;
    i = 0;
    probs = mlt_risk[failure];
    for (let p in probs) {
        u += p;
        if (l < rand && rand <= u) {
            if (i == 0 || i == 1 || i   == 2) {
                failure = 1;
            } 
            if (i == 0) {
                output.push('Fail due to Material Lead Time Risk: Transport Issue');
                break;
            } else if (i == 1) {
                output.push('Fail due to Material Lead Time Risk: Demand Surge');
                break;
            } else if (i == 2) {
                output.push('Fail due to Material Lead Time Risk: Product Design Change');
                break;
            } else if (i == 3) {
                output.push('No errors in Material Lead Time');
                break;
            }
        }
        i++;
        l = u;
    }

    // Second random probability value (Material Quantity)
    rand = random.random();
    l = 0;
    u = 0;
    i = 0;
    probs = mqnt_risk[failure];
    for (let p in probs) {
        u += p;
        if (l < rand && rand <= u) {
            if (i == 0 || i == 1 ) {
                failure = 1;
            } 
            if (i == 0) {
                output.push('Fail due to Material Quantity: Yield Issue');
                break;
            } else if (i == 1) {
                output.push('Fail due to Material Quantity: Scrap due to ECO');
                break;
            } else if (i == 2) {
                output.push('No errors in Material Quantity');
                break;
            }
        }
        i++;
        l = u;
    }

    // Last random probability value (Material Quality)
    rand = random.random();
    l = 0;
    u = 0;
    i = 0;
    probs = mqlt_risk[failure];
    for (let p in probs) {
        u += p;
        if (l < rand && rand <= u) {
            if (i == 0 || i == 1 || i == 2 || i == 3) {
                failure = 1;
            } 
            if (i == 0) {
                output.push('Fail due to Material Quality: Manufacturing Issue');
                break;
            } else if (i == 1) {
                output.push('Fail due to Material Quality: Design Issue');
                break;
            } else if (i == 2) {
                output.push('Fail due to Material Quality: Process Issue');
                break;
            } else if (i == 3) {
                output.push('Fail due to Material Quality: Training Issue ');
                break;
            } else if (i == 4) {
                output.push('No errors in Material Quality');
                break;
            }
        }
        i++;
        l = u;
    }

    output.push(Boolean(failure));
    console.log(output);


}