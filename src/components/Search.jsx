import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Field from "../components/forms/Field";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';

const Search = () => {
  const [mail, setMail] = useState('');
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const token = window.localStorage.getItem("authToken");
  const navigate = useNavigate();

  // Gestion des champs
  const handleChange = (e) => {
    e.preventDefault();
    setMail(e.target.value);
   
  };

  // Gestion du submit
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await axios.get('http://localhost:8080/api/getuserbyemail', { params: { email: mail } },
       {
            headers: {"Authorization": 'Bearer '+ token}}).then(
        (result) => {
        result.data === null ? setUser(null) : setUser(result.data);
                
                }
      );
      setError("");
      toast.success("!");
    } catch (error) {
      setError(
        "Aucun compte ne possède cette adresse email ou alors les informations ne correspondent pas !"
      );
      toast.error("Une erreur est survenue");
    }
  };

 const handleAdd =   async (id) => {
       let uri = 'http://localhost:8080/api/addFriend/';
       try {
            await axios.put(uri + parseInt(id), {
            headers: {"Authorization": 'Bearer '+ token},
        });
        toast.success("Le contact a bien été ajouté");
        setMail('');
        setUser({})
        navigate('/');
            } catch (error) {
                toast.error("Une erreur est survenue");
            } 
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Field
          label="Adresse email"
          name="mail"
          value={mail}
          onChange={ handleChange}
          placeholder="Adresse email du contact"
          error={error}
        />

        <div className="form-group mt-3">
          <button type="submit" className="btn btn-outline-danger">
            rechercher
          </button>
        </div>
      </form>
    {Object.keys(user).length === 0  ? <h6>Aucun compte ne possède cette adresse email</h6> : <table className="table">
            <thead>
                <tr>
                    <th>Nickname</th>
                    <th>Email Address</th>
                    <th>Ajouter Contact</th>
                </tr>
            </thead>
            <tbody  className="mt-5">
                    
                        <tr>
                            <td>{user.nickname}</td>
                            <td>{user.email}</td>
                           <td>
                            <Button className="nextButton" onClick={() => handleAdd(user.id)}>
                                Ajouter
                            </Button></td>
                        </tr>
        
            </tbody>
                </table>}

    </>
  );
};

export default Search;