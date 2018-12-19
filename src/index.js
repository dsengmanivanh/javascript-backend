import express from 'express';
import OfferService from './service/offer-service'
import Query from './model/query';

const app = express();


app.get('/', function (req, res) {
    const link={};

    link.criteria={};
    link.criteria.default= "commune = '75101',codeRome = 'D1102',contractType = 'CDI'" ;
    link.criteria.cdd = "http://localhost:3000/v2/criteria?typeContrat=CDD";
    link.criteria.cdi = "http://localhost:3000/v2/criteria?typeContrat=CDI";
    res.send(link);
});

app.get('/v2/criteria', function (req, res) {
    const query = getQuery(req.query);
    let offerService = new OfferService();
    const response = offerService.handle(query);
    response.then(value => {
            res.send(JSON.stringify(value.filtresPossibles));
        }
    );
});

app.post('/', function (req, res) {
    res.send('Got a POST request');
});

app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user');
});

app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user');
});

function getQuery(request){
    let query = new Query();
    if (request.typeContrat != null) {
        query.contractType = request.typeContrat;
    }
    if (request.commune != null) {
        query.commune = request.commune;
    }
    if (request.codeRome != null) {
        query.codeRome = request.codeRome;
    }
    return query;
}

app.listen(process.env.PORT || 3000, () => console.log('webhook is listening'));
