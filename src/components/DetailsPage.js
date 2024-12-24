import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailsPage = () => {
  const { id } = useParams();
  const [voiture, setVoiture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchVoiture = async () => {
      try {
        const response = await axios.get(`http://localhost:8888/voitures/${id}`);
        setVoiture(response.data);
      } catch (error) {
        setErrorMessage('Erreur de connexion');
      } finally {
        setLoading(false);
      }
    };
    fetchVoiture();
  }, [id]);

  if (loading) return <div className="loading">Chargement...</div>;
  if (errorMessage)
    return <div className="alert alert-danger text-center mt-5">{errorMessage}</div>;

  return (
    <div className="details-container">
      <div className="card">
        <div className="card-header primary-header">
          <h3> vehicle details</h3>
        </div>
        <div className="card-body">
          <p>
            <strong>Brand :</strong> {voiture.marque}
          </p>
          <p>
            <strong>Model :</strong> {voiture.model}
          </p>
          <p>
            <strong>Registration number :</strong> {voiture.matricule}
          </p>
        </div>
      </div>
      <div className="card mt-4">
        <div className="card-header secondary-header">
          <h3>Associated Client</h3>
        </div>
        <div className="card-body">
          {voiture.client ? (
            <div>
              <p>
                <strong>Name :</strong> {voiture.client.nom}
              </p>
              <p>
                <strong>Age :</strong> {voiture.client.age}
              </p>
            </div>
          ) : (
            <p>Aucun client associé</p>
          )}
        </div>
      </div>
      <style jsx>{`
        .details-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 50px auto;
          max-width: 600px;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .card {
          width: 100%;
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }

        .card-header {
          padding: 15px;
          color: white;
          font-size: 1.5rem;
        }

        .primary-header {
          background-color: #007bff;
        }

        .secondary-header {
          background-color: #6c757d;
        }

        .card-body {
          padding: 20px;
          font-size: 1.2rem;
          color: #333;
        }

        .loading {
          font-size: 1.5rem;
          color: #6c757d;
          text-align: center;
          margin-top: 50px;
        }

        p {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default DetailsPage;
