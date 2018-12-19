const config = {};

config.token = {};
config.token.url= 'https://entreprise.pole-emploi.fr/connexion/oauth2/access_token';

config.api ={};
config.api.client_id="PAR_innooffresv2_e490bf36c97ce99c856eae96e44b68ed2aee3afb59ffb84b9625a322c1510895";
config.api.client_secret="ed576963ceafdb097ddc085496a966754c6f28ffa1906da4e8cdb751e23dd650";
config.api.scope="api_offresdemploiv2 application_PAR_innooffresv2_e490bf36c97ce99c856eae96e44b68ed2aee3afb59ffb84b9625a322c1510895 o2dsoffre";

config.offer ={};
config.offer.url="https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres/search";


module.exports = config;