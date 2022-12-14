import React from "react";
import { Link } from "react-router-dom";

const HomePage = props => {
  return (
    <div className="jumbotron">
      <h1 className="display-3">Hello PayMyBuddy Team</h1>
      <hr className="my-4" />
      <p>
        Votre Banque en ligne
      </p>
      <div className="d-flex">
      
        <Link to="/contacts" className="btn btn-outline-danger btn-lg col-2 mx-10">
        <p>
        Vos contacts
        </p>
        </Link>
        <div className="col-1"></div>
        <Link to="/profil" className="btn btn-outline-danger btn-lg m-10 col-2">
        <p>
        Votre Profil
        </p>
        </Link>
        </div>
    </div>
  );
};

export default HomePage;