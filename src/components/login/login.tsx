import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from 'react-router-dom';


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

    return (
        <div>
            {!keycloak.authenticated && (
                <button
                    type="button"
                    className="text-blue-800"
                    onClick={() => redirect()}
                >
                    Login
                </button>
            )}
            {!!keycloak.authenticated && (
                <button
                    type="button"
                    className="text-blue-800"
                    onClick={() => logout()}
                >
                    Logout ({keycloak.tokenParsed?.preferred_username})
                </button>
            )}
        </div>
    );
}
