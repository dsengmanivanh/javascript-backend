import express from 'express';
import OfferService from './service/offer-service';
import TokenService from './service/token-service';
import Query from './model/query';

const app = express();


app.get('/', function (req, res) {
    const link = {};

    link.codeRome = {};
    link.codeRome.boulanger = "D1102";
    link.codeRome.boucher = "D1101";
    link.codeRome.conducteur = "A1101";

    link.criteria = {};
    link.criteria.default = "commune = '75101',codeRome = 'D1102',contractType = 'CDI'";
    link.criteria.cdd = "http://localhost:3000/v2/criteria?typeContrat=CDD";
    link.criteria.cdi = "http://localhost:3000/v2/criteria?typeContrat=CDI";
    link.criteria.codeRome = "http://localhost:3000/v2/criteria?codeRome=D1101";
    link.criteria.contractType = "http://localhost:3000/v2/criteria?contractType=CDI";

    link.criteriaold = {};
    link.criteriaold.default = "commune = '75101',codeRome = 'D1102',contractType = 'CDI'";
    link.criteriaold.cdd = "http://localhost:3000/v1/criteria?typeContrat=CDD";
    link.criteriaold.cdi = "http://localhost:3000/v1/criteria?typeContrat=CDI";
    link.criteriaold.codeRome = "http://localhost:3000/v1/criteria?codeRome=D1101";
    link.criteriaold.contractType = "http://localhost:3000/v1/criteria?contractType=CDI";


    link.token = {};
    link.token.url = "http://localhost:3000/v2/token";

    res.send(link);
});


app.get('/v2/criteria', function (req, res) {
    const query = getQuery(req.query);
    call(query, res);
});

app.get('/v1/criteria', function (req, res) {
    const query = getQuery(req.query);
    query.version = 1;
    call(query, res);
});


app.get('/v2/token', function (req, res) {
    let tokenService = new TokenService();
    const response = tokenService.handle();
    response.then(value => {
            res.send(JSON.stringify(value));
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

function call(query, res) {
    let offerService = new OfferService();
    const response = offerService.handle(query);
    response.then(value => {
            res.send(value)
        }
    );
}

function getQuery(request) {
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
