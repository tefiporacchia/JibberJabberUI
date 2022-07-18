import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    url: "https://jibberjabber.ml/auth/",
    realm: "JibberJabber",
    clientId: "JibberJabberUI",
});

export default keycloak;
