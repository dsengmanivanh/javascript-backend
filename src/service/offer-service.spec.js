import OfferService from "./offer-service";
import Query from "../model/query";
import sinon from "sinon";
import chai from "chai";
const expect = chai.expect;

describe('handle return response when version equal 1', function () {

    let offerService;

    before(function () {
        offerService = new OfferService();
    });


    it('should return response', function () {
        sinon.stub(offerService, 'getOffer')
            .returns("ok");
        let query = new Query("75101","D1102","CDI",1);
        let result = offerService.handle(query);
        expect(result).equal("ok");
    });
});