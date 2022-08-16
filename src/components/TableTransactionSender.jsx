import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function TableTransactionSender() {

    const [transfer, setTransfer] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const token = window.localStorage.getItem("authToken");
    const userId = window.localStorage.getItem("id");

    useEffect(() => {
            axios({
            method: 'get',
            url: 'http://localhost:8080/api/transactionlistbyusersender',
            headers: {"Authorization": 'Bearer '+ token}})
        .then(
            (result) => {
                setIsLoaded(true);
                setTransfer(result.data);
            },
            (error) => {
                setIsLoaded(true);
                setTransfer(error);
            }
        )
    }, [userId ,token])

    if (transfer && !!transfer.length) {
            return(<> <table className="table">
            <thead>
                <tr>
                    <th>Index</th>
                    <th>contact</th>
                    <th>Description</th>
                    <th>Montant</th>
                </tr>
            </thead>
            <tbody  className="mt-5">
          
           {transfer.map((item, index) => 
                    
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.nickNameContact}</td>
                            <td>{item.description}</td>
                            <td>{item.amount}</td>
                        </tr>
                    
                )}
        
            </tbody>
                </table>
         </> )
    } else {
      return (<> <h1>Vous n'avez pas de transferts</h1> </>);
            }
}
export default TableTransactionSender;