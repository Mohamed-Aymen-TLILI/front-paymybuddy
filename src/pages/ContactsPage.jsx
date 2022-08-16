import { useEffect, useState } from "react";
import axios from "axios";
import { getContact_API } from '../config';
import Table from "../components/Table";
import Search from "../components/Search";

const ContactsPages = () => {

    const [users, setUsers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const userId = window.localStorage.getItem("id");
    const token = window.localStorage.getItem("authToken");

    useEffect(() => {
            axios({
            method: 'get',
            url: getContact_API,
            headers: {"Authorization": 'Bearer '+ token}})
        .then(
            (result) => {
                setIsLoaded(true);
                setUsers(result.data);
            },
            (error) => {
                setIsLoaded(true);
                setUsers(error);
            }
        )
    }, [token])
   
   return ( <>

   { <Table tableData={users}/>}
   <h1 className="mt-5">Ajoutez un nouveau contact</h1>
    <Search/>
    </> );
}
 
export default ContactsPages;