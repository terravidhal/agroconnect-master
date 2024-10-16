import React from 'react';
import { Redirect } from 'react-router-dom';

const CreateLocationPage = () => {
  const [redirect, setRedirect] = React.useState(false);

  const handleRedirect = () => {
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/create-location" />;
  }

  return (
    <div>
      <h1>Obtenez une geolocalisation</h1>
      <p>
        pou pouvoir vous authentifiez et beneficiez de service de livraison
        rapide et certains, veillez cliquez sur ce boutton afin d'etre reconduit vers osiris
        notre plateforme d'dressage numerique.
      </p>
      <button href = "" style={{ backgroundColor: 'green', color: 'white' }} onClick={handleRedirect}>
        Create Location
      </button>
    </div>
  );
};

export default CreateLocationPage;