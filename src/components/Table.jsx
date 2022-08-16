import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';

function Table({tableData}) {

    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [description, setDescription] = useState('');
    const [contact, setContact] = useState();
    const [amount, setAmount] = useState(0);
    const token = window.localStorage.getItem("authToken");
    const userId = window.localStorage.getItem("id");
    const navigate = useNavigate();

    const clearState = () => {
    setDescription('');
    setAmount(0);
  };
    const handleShow = (contactId) => {
        setContact(contactId);
        setShow(true);
    };

    const handleShowDelete = (contactId) => {
        setContact(contactId);
        setShowDelete(true);
    };

    const handleClose = () => {
        setShow(false);
        clearState();
    };

     const handleCloseDelete = () => {
        setShowDelete(false);
    };
    const handleTransfer =   async (e) => {
        e.preventDefault();
       let uri = 'http://localhost:8080/api/transaction';
       try {
            await axios.post(uri, {
            "senderId": parseInt(userId),
            "receiverId": contact,
            "amount": parseInt(amount),
            "description": description
        }, {
            headers: {"Authorization": 'Bearer '+ token},
        });
        setShow(false);
        clearState();
        navigate('/transaction');
            toast.success("Le transfert a bien été crée");
            } catch (error) {
                setShow(false);
                clearState();
                toast.error("Une erreur est survenue");
            } 
  }

  const handleDelete =   async (e) => {
        e.preventDefault();
       let uri = 'http://localhost:8080/api/removeFriend/';
       try {
            await axios.put(uri + parseInt(contact), {
            headers: {"Authorization": 'Bearer '+ token},
        });
        setShowDelete(false);
        navigate('/');
            toast.success("Le contact a bien été supprimé");
            } catch (error) {
                setShowDelete(false);
                toast.error("Une erreur est survenue");
            } 
  }

    if (tableData && !!tableData.length) {
            return(<> <table className="table">
            <thead>
                <tr>
                    <th>Index</th>
                    <th>Nickname</th>
                    <th>Email Address</th>
                    <th>Envoyer d'argent</th>
                    <th>Supprimer Contact</th>
                </tr>
            </thead>
            <tbody  className="mt-5">
          
           {tableData.map((item, index) => 
                    
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.nickname}</td>
                            <td>{item.email}</td>
                           <td>
                            <Button className="nextButton" onClick={() => handleShow(item.id)}>
                                Envoyer
                            </Button></td>
                            <td>
                            <Button className="btn btn-danger" onClick={() => handleShowDelete(item.id)}>
                                supprimer
                            </Button></td>
                        </tr>
                    
                )}
        
            </tbody>
                </table>
                <Modal show={show} onHide={handleClose} backdrop='static' keyboard="False">
                <Modal.Header closeButton>
                <Modal.Title>Envoyer d'argent à votre contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     <div className="row">
                        <div className="form-group col-md-4">
                            <label>Description :</label>
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                         </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-4">
                            <label>Montant :</label>
                            <input type='number' value={parseInt(amount)} onChange={(e) => setAmount(e.target.value)}/>
                         </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button color="danger" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={e => handleTransfer(e)}>
                    Envoyer
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showDelete} onHide={handleCloseDelete} backdrop='static' keyboard="False">
                <Modal.Header closeButton>
                <Modal.Title>Supprimez votre contact</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                <Button color="danger" onClick={handleCloseDelete}>
                    Annuler
                </Button>
                <Button variant="primary" onClick={e => handleDelete(e)}>
                    confirmer
                </Button>
                </Modal.Footer>
            </Modal>
         </> )
    } else {
      return (<> <h1>Vous n'avez pas de contact</h1> </>);
            }
}
export default Table;