import React from 'react';

const About = () => {
  return (
    <React.Fragment>
      <h4>About Page</h4>
      <h3>Cisco Mexico University Challenge</h3>
      <p>Special thanks to Cisco and Tec de Monterrey for making this possible.</p>
      <h4>Description of the challenge</h4>
      <p>The Northerners Team is a group of students from University of Tec de Monterrey. We are participants in this Cisco's challenge which its main focus is the <strong>supply chain</strong>. We were introduced to its main concepts, and our challenge was to provide a solution that could improve the way supply chain is currently implemented at Cisco.</p>
      <h5>The Problem</h5>
      <p>Cisco's ticketing system main functionality is to refer an issue inside the supply chain. These tickets contain valuable information that can be used for different stats and analytics.</p>
      <h5>The Solution</h5>
      <p>In order to save time and costs, based on the ticket data we can create a simulation of a component inside a supply chain, which can predict what situations are most likely to happen.</p>
      <h5>The main reasons a ticket is created</h5>
      <ul>
        <li>Demand Surge</li>
        <li>Transport Issue</li>
        <li>Product Design Change</li>
        <li>Scrap Due To ECO</li>
        <li>Yield Issue</li>
        <li>Manufacturing Issue</li>
        <li>Design Issue</li>
        <li>Process Issue</li>
        <li>Training Issue</li>
      </ul>
      <p>Our objective is to analyze the data from tickets, whether stored in the database or automatically generated.</p>
      <h4>Simulation with Bayesian Network</h4>
      <p>A bayesian network is a probabilistic graphical model that represents a set of variables and their conditional dependencies via a directed acyclic graph (DAG).
      This means that we can, based on conditional probabilities, compute the probability of the next event.
      Bayesian networks satisfy the local Markov property, which states that a node is conditionally independent of its non-descendants given its parents.</p>

    </React.Fragment>
  );
}

export default About;
