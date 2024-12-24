import React, { useState, useEffect } from 'react';

const ClientVoitureSelection = () => {
  const [clients, setClients] = useState([]);
  const [voitures, setVoitures] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');

  useEffect(() => {
    fetch('http://localhost:8888/clients') 
      .then(response => response.json())
      .then(data => setClients(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleClientChange = (event) => {
    const clientId = event.target.value;
    setSelectedClient(clientId);

    if (clientId) {
      fetch(`http://localhost:8888/voitures/client/${clientId}`) 
        .then(response => response.json())
        .then(data => setVoitures(data))
        .catch(error => console.error('Error:', error));
    } else {
      setVoitures([]);
    }
  };

  return (
    <div className="selection-container">
      <h1 className="title">Choisir un client et afficher ses voitures</h1>

      <div className="dropdown-container">
        <select className="dropdown" onChange={handleClientChange} value={selectedClient}>
          <option value="">Sélectionner un client</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>
              {client.id}
            </option>
          ))}
        </select>
      </div>

      {selectedClient && (
        <div className="table-container">
          <h2 className="subtitle">Voitures du Client:</h2>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Marque</th>
                <th>Matricule</th>
                <th>Modèle</th>
              </tr>
            </thead>
            <tbody>
              {voitures.map(voiture => (
                <tr key={voiture.id}>
                  <td>{voiture.marque}</td>
                  <td>{voiture.matricule}</td>
                  <td>{voiture.model}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style jsx>{`
        .selection-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          margin: 50px auto;
          max-width: 800px;
          background-color: #f8f9fa;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .title {
          font-size: 2rem;
          color: #343a40;
          margin-bottom: 20px;
        }

        .dropdown-container {
          width: 100%;
          max-width: 400px;
          margin-bottom: 20px;
        }

        .dropdown {
          width: 100%;
          padding: 10px;
          font-size: 1rem;
          border-radius: 5px;
          border: 1px solid #ccc;
          background-color: #fff;
        }

        .table-container {
          margin-top: 20px;
          width: 100%;
        }

        .subtitle {
          font-size: 1.5rem;
          color: #495057;
          margin-bottom: 10px;
        }

        .styled-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          font-size: 1rem;
          text-align: left;
        }

        .styled-table thead tr {
          background-color: #007bff;
          color: #ffffff;
        }

        .styled-table th, .styled-table td {
          padding: 10px 15px;
          border: 1px solid #ddd;
        }

        .styled-table tbody tr {
          transition: background-color 0.2s ease;
        }

        .styled-table tbody tr:hover {
          background-color: #f1f1f1;
        }
      `}</style>
    </div>
  );
};

export default ClientVoitureSelection;
