import React, { useState, useEffect } from 'react';
import Title from './Title';
import { NavLink } from 'react-router-dom';
import './Tickets.css';
import Action from './Action';


export default function Tickets() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const data = await fetch("http://localhost:8000/api/ticket-list/");
      const items = await data.json();
      console.log(items);
      setIsLoaded(true);
      setItems(items);
    } catch (error) {
      setIsLoaded(true);
      setError(error);
    }
  }

  useEffect(() => {
    fetchItems()
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <Title>Recent Tickets</Title>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Number ID</th>
              <th>Impacted User</th>
              <th>Category</th>
              <th>State</th>
              <th>Summary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.numberID}>
                <td>{item.numberID}</td>
                <td>{item.impactedUser}</td>
                <td>{item.category}</td>
                <td>{item.state}</td>
                <td>{item.summary}</td>
                <td>
                  <NavLink to={`/ticket/${item.numberID}`}>
                    <Action color="info" icon="&#xE88E;" />
                  </NavLink>
                  {/* add action to edit ticket */}
                  <Action color="edit" icon="&#xE254;" />
                  {/* add action to delete ticket */}
                  <Action color="delete" icon="&#xE872;" />
                </td>
            </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
