import marketDataAPIPage from '../../support/APIpages/marketDataAPIPage';
const marketData = new marketDataAPIPage();

describe('API Testcases of Public Market Data', function(){

    it('Verify Historical Data records count', () => {
        marketData.priceHistoryRecordSize(5);
    })

    it('Verify Symbol Name', () => {
        marketData.verifySymbol("OSTKO");
    })

    it('Verify each record date should be in between Start and end dates', () => {
        marketData.verifyDates();
    })

    it('Verify all data types of Historical Data table columns', () => {
        marketData.verifyColumnDataTypes();
    })

    it('Verify current page number count', () => {
        marketData.verifyCurrentPageCount(5);
    })   
    
        
        
})