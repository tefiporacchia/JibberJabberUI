import React, {useEffect} from "react";
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate} from 'react-router-dom';

export const Login = () => {
    const { keycloak, initialized } = useKeycloak();
    const navigate = useNavigate();


    const logout = () =>{
        console.log(keycloak);
        keycloak.logout();
    }

    const redirect = () =>{
        keycloak.login({redirectUri:"http://localhost:3000/home"});

    }

    useEffect(() => {
        if(!keycloak.authenticated){
            redirect();
        }else{
            navigate("/home");
        }

    }, [])

    return (
        <div>
        </div>
    );
}
