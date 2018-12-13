import rp from 'request-promise-native';

class OfferAPI{

  findByCriteriaV1(token){
    const options = { method: 'GET',
        url: 'https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres/search',
        qs:
            { qualification: '0',
                motsCles: 'informatique',
                commune: '51069,76322,46083,12172,28117',
                origineOffre: '2%0A' },
        headers:
            { 'Postman-Token': token,
                'cache-control': 'no-cache' } };
    rp(options)
    .then(function (res) {
        console.log(res);
    })
    .catch(function (err) {
      console.log('error1');
    });
  }
}


module.exports = new OfferAPI();