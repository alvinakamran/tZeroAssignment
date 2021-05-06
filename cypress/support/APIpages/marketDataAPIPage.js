import moment from 'moment';
const routes = require('../../fixtures/routes.json');
var queryParam = "OSTKO?start=2021-01-01&end=2021-05-05&page=5&size=3";

class marketDataAPIPage
{

priceHistoryRecordSize(recordSize){

    cy.request(
        'GET', Cypress.env('url')+routes.priceHistoryUrl+"OSTKO?start=2021-01-01&end=2021-05-05&page=5&size="+recordSize
    ).then(response => {
        expect(response.status).equal(200);
        expect(response.body.size).to.be.equal(recordSize);
        expect(response.body.priceHistories.length).equal(recordSize);
    })

}

verifySymbol(symbolName){

    cy.request(
        'GET', Cypress.env('url')+routes.priceHistoryUrl+symbolName+"?start=2021-01-01&end=2021-05-05&page=5&size=4"
    ).then(response => {

        for( var i =0; i<response.body.priceHistories.length; i++ ){
            expect(response.body.priceHistories[i].symbol).equal(symbolName);
        }
    })

}

verifyDates(){

    // Getting current date as end date and 5 days earlier as start date
    var endDate = moment().format('YYYY-MM-DD');
    var startDate = moment().subtract(5,'d').format('YYYY-MM-DD');

    cy.request(
        'GET', Cypress.env('url')+routes.priceHistoryUrl+"OSTKO?start="+startDate+"&end="+endDate+"&page=1&size=4"
    ).then(response => {

    for( var i =0; i<response.body.priceHistories.length; i++ ){

      var date = new Date(response.body.priceHistories[i].date).toLocaleDateString();
      if( date >= startDate && date <= endDate ){
        expect(true).to.be.true;
      }
      else{
          expect(false).to.be.false;
      }

    }
    
    })

}

verifyColumnDataTypes(){

    cy.request(
        'GET', Cypress.env('url')+routes.priceHistoryUrl+queryParam
    ).then(response => {

        for(var i =0; i<response.body.priceHistories.length; i++ ){
            expect(response.body.priceHistories[i].symbol).to.be.a('string');
            expect(response.body.priceHistories[i].date).to.be.a('string');
            expect(response.body.priceHistories[i].open).to.be.a('number');
            expect(response.body.priceHistories[i].high).to.be.a('number');
            expect(response.body.priceHistories[i].low).to.be.a('number');
            expect(response.body.priceHistories[i].close).to.be.a('number');
            expect(response.body.priceHistories[i].volume).to.be.a('number');
        }
    })
}

verifyCurrentPageCount(currPage){

    cy.request(
        'GET', Cypress.env('url')+routes.priceHistoryUrl+"OSTKO?start=2021-01-01&end=2021-05-05&page="+currPage+"&size=4"
    ).then(response => {
          expect(response.body.currentPage).equal(currPage);
    })
}

}

export default marketDataAPIPage;