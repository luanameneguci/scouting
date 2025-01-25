import { useState } from "react";
import axios from 'axios';
export default function Test() {
    const url = process.env.REACT_APP_API_URL;
    const [teste, setTeste] = useState("");
    async function testeAPI() {
        try {
            await axios.get(`${url}/equipa/teste`, { withCredentials: true }).then((response) => { setTeste(response.data.message) });
        } catch (error) {
            console.log(error.response.data.message);
            setTeste(error.response.data.message)
        }
    }
    testeAPI();
    return (
        <div>
            <p><br /><br /><br /><br />
                {teste}
            </p>
        </div>

    )
}