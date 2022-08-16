import TableTransactionReceive from "../components/TableTransactionReceive";
import TableTransactionSender from "../components/TableTransactionSender"

const TransferPage = () => {
    return (<>
    <h6>Mes transferts envoyés</h6>
    <TableTransactionSender/>
    <h6>Mes transferts reçus</h6>
    <TableTransactionReceive/>
    </> );
}
 
export default TransferPage;