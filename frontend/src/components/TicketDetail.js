import React, { useState, useEffect } from 'react';

export default function TicketDetail({ match }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);

  const fetchItem = async () => {
    try {
      const data = await fetch(`http://localhost:8000/api/ticket-detail/${match.params.id}/`);
      const item = await data.json();
      console.log(item);
      setIsLoaded(true);
      setItem(item);
    } catch(err) {
      setIsLoaded(true);
      setError(error);
    }
  }

  useEffect(() => {
    fetchItem()
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
          <p>{JSON.stringify(item)}</p>
      </div>
    );
  }
  
}