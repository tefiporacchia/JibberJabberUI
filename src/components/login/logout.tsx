import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import Button from '@mui/material/Button';

export const Logout = () => {
    const { keycloak, initialized } = useKeycloak();

    const logout = () =>{
        console.log(keycloak);
        keycloak.logout({redirectUri:"http://localhost:3000/"});
    }

    return (
        <div>
            {!!keycloak.authenticated && (

                <Button variant="text" onClick={() => logout()}>Logout</Button>

            )}
        </div>
    );
}
