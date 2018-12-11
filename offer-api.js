const rp = require('request-promise');

const requestOffer = {   
    method: 'GET',
    url: "https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres",
    headers: {
      'cache-control': 'no-cache',
      Authorization: 'Bearer afcc25d7-88f6-46dc-96eb-99613cd0aecf',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    json: true
};

const findByCriteriaV1 = function (filters) {
  // console.log('test entrée !');
  // const url="https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres";
  rp(requestOffer)
  .then(function (res) {
    // console.log('test entrée !');
      console.log(res);
  })
  .catch(function (err) {
    console.log('error', err);
      // Crawling failed...
  });
}

module.exports = {
    findByCriteriaV1
};
