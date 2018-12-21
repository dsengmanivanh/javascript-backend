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

    link.v2 = {};
    link.v2.default = "commune = '75101',codeRome = 'D1102',contractType = 'CDI'";
    link.v2.cdi = "http://"+req.headers.host+"/v2/criteria?typeContrat=CDI&codeRome=D1101";

    link.v1 = {};
    link.v1.default = "commune = '75101',codeRome = 'D1102',contractType = 'CDI'";
    link.v1.cdi = "http://"+req.headers.host+"/v1/criteria?typeContrat=CDI&codeRome=D1101";


    link.token = {};
    link.token.url = "http://"+req.headers.host+"/v2/token";

    link.widget = {};
    link.widget.onlyfirefox = "http://"+req.headers.host+"/v2/widget?token=";

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

app.get('/v2/widget', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http'+req.headers.host);
    const dir = __dirname.replace("src","");
    res.sendFile(dir+'/widget.html');
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
