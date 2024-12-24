import React, { useState, useEffect } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [newCar, setNewCar] = useState({
    marque: '',
    matricule: '',
    model: '',
    clientId: ''
  });

  const API_URL = 'http://localhost:8888/voitures';
  const CLIENTS_URL = 'http://localhost:8888/clients';

  const fetchCars = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to fetch cars');
      const data = await response.json();
      setCars(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await fetch(CLIENTS_URL, {
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
    fetchCars();
    fetchClients();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar(prev => ({
      ...prev,
      [name]: name === 'clientId' ? value : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const carData = {
        ...newCar,
        clientId: parseInt(newCar.clientId)
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(carData)
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to add car');
      }

      await fetchCars();
      setNewCar({
        marque: '',
        matricule: '',
        model: '',
        clientId: ''
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error details:', err);
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Car Management System</h1>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="form-container">
        <h2 className="form-title">Add New Car</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Brand
              </label>
              <input
                type="text"
                name="marque"
                value={newCar.marque}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Registration Number
              </label>
              <input
                type="text"
                name="matricule"
                value={newCar.matricule}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Model
              </label>
              <input
                type="text"
                name="model"
                value={newCar.model}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                Select Client
              </label>
              <select
                name="clientId"
                value={newCar.clientId}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="">Select a client</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.nom} (ID: {client.id})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="submit-button"
          >
            Add Car
          </button>
        </form>
      </div>

      <div className="cars-grid">
        {cars.map((car) => (
          <div key={car.id} className="car-card">
            <h3 className="car-title">{car.marque} {car.model}</h3>
            <p className="car-registration">Registration: {car.matricule}</p>
            {car.client && (
              <div className="client-info">
                <p className="client-info-title">Client Information:</p>
                <p>Name: {car.client.nom}</p>
                <p>Age: {car.client.age}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;