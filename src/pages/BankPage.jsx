import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Field from "../components/forms/Field";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';

const BankPage = () => {

    const [iban, setIban] = useState('');
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState("");
    const token = window.localStorage.getItem("authToken");
    const navigate = useNavigate();

    // Gestion des champs
  const handleChange = (e) => {
    e.preventDefault();
    setIban(e.target.value);
   
  };

  const handleChangeAmount = (e) => {
    e.preventDefault();
    setAmount(e.target.value);
   
  };

  // Gestion du submit
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/processTransactionBank', {
            "iban": iban,
            "amount": parseInt(amount)
        },
       {
            headers: {"Authorization": 'Bearer '+ token}})
      setError("");
      toast.success("Votre compte a été alimenté");
      navigate('/');
    } catch (error) {
      setError(
        "Une erreur avec cet iban email ou alors les informations ne correspondent pas !"
      );
      toast.error("Une erreur est survenue");
    }
  }; 
    return ( <>
     <form onSubmit={handleSubmit}>
        <Field
          label="Iban"
          name="iban"
          value={iban}
          onChange={ handleChange}
          placeholder="votre iban"
          error={error}
        />

        <Field
          label="Votre montant"
          name="amount"
          type="number"
          value={amount}
          onChange={ handleChangeAmount}
          placeholder="Amount"
          error={error}
        />

        <div className="form-group mt-3">
          <button type="submit" className="btn btn-outline-danger">
            Transferer
          </button>
        </div>
      </form>
        
        </> );
}
 
export default BankPage;