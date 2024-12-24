import React, { useState, useEffect } from 'react';
import './ClientPage.css';

const ClientPage = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [newClient, setNewClient] = useState({
    nom: '',
    age: ''
  });

  const API_URL = 'http://localhost:8888/clients';

  const fetchClients = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to fetch clients');
      const data = await response.json();
      setClients(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nom: newClient.nom,
          age: parseInt(newClient.age)
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to add client');
      }

      await fetchClients();
      setNewClient({
        nom: '',
        age: ''
      });
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Client Management System</h1>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="form-container">
        <h2 className="form-title">Add New Client</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <input
              type="text"
              name="nom"
              value={newClient.nom}
              onChange={handleInputChange}
              placeholder="Name"
              className="form-input"
              required
            />
            <input
              type="number"
              name="age"
              value={newClient.age}
              onChange={handleInputChange}
              placeholder="Age"
              className="form-input"
              required
              min="0"
              max="150"
            />
          </div>
          <button
            type="submit"
            className="submit-button"
          >
            Add Client
          </button>
        </form>
      </div>

      <div className="clients-grid">
        {clients.map((client) => (
          <div key={client.id} className="client-card">
            <h3 className="client-title">Client #{client.id}</h3>
            <div className="client-info">
              <div>
                <span className="info-label">Name:</span>{' '}
                <span className="info-value">{client.nom}</span>
              </div>
              <div>
                <span className="info-label">Age:</span>{' '}
                <span className="info-value">{client.age}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientPage;