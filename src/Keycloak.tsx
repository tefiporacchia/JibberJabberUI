import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    url: "https://jibberjabberdev.ml/auth/",
    realm: "JibberJabber",
    clientId: "JibberJabberUI",
});

export default keycloak;
