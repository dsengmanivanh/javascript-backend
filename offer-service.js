const {
  findByCriteriaV1
} = require('./offer-api');

const findOffersWithCriteria = function (filters) {
  findByCriteriaV1("");
}

module.exports = {
    findOffersWithCriteria
};
