const config = {};

config.token = {};
config.token.url= 'https://entreprise.pole-emploi.fr/connexion/oauth2/access_token';

config.api ={};
config.api.client_id="PAR_innooffresv2_e490bf36c97ce99c856fake";
config.api.client_secret="ed576963ceafake";
config.api.scope="api_offresdemploiv2 application_PAR_innooffresv2_e490bf36c97fake o2dsoffre";

config.api.oldclient_id="PAR_testpe_75b7ae5f77946ccffake";
config.api.oldclient_secret="ba59de484bf4bbdddf9f2e18cfake";
config.api.oldscope="api_offresdemploiv1 application_PAR_testpe_75b7ae5f77946ccfake o2dsoffre";


config.offer ={};
config.offer.url="https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres/search";
config.offer.oldurl="https://api.emploi-store.fr/partenaire/offresdemploi/v1/rechercheroffres";


module.exports = config;