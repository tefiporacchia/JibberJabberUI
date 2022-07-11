import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    url: "http://localhost:80/auth/",
    realm: "JibberJabber",
    clientId: "JibberJabberUI",
});

export default keycloak;
