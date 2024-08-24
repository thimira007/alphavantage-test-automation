import { get_real_gdp } from '../support/utils/api_util';
import { API_KEY, DATA_TYPE_JSON, CONTENT_TYPE_JSON, DATA_TYPE_CSV, CONTENT_TYPE_DOWNLOAD, INTERVAL_ANNUAL } from '../support/utils/constants';

/**
 * All Tests related to the function REAL_GDP will be added in this file
 */
describe('[GET] REAL GDP', { tags: '@smoke' }, () => {

    /**
     * [Test-2.1] Verify Successful Retrieval of Real GDP Data in json format annual
     * Steps: Send a [GET] request to REAL_GDP endpoint with following parameters
     * datatype: json, interval: annual
     * Expected Result: status code should be 200 OK
     */
    it('[Test-2.1] Verify Successful Retrieval of Real GDP Data in json format annual', { tags: '@regression' }, () => {
        get_real_gdp(API_KEY, INTERVAL_ANNUAL, DATA_TYPE_JSON)
            .then(response => {
                // verify response status code is 200
                expect(response.status).to.eq(200);

                // Verify that the response is in JSON format
                expect(response.headers['content-type']).to.eq(CONTENT_TYPE_JSON);

                // Response body should include the expected structure including 'Meta Data' and 'Time Series (Daily)' sections
                expect(response.body).to.have.property('name').to.eq('Real Gross Domestic Product');
                expect(response.body).to.have.property('interval').to.eq(INTERVAL_ANNUAL);
                expect(response.body).to.have.property('unit').to.eq('billions of dollars');

                // data section should include the date and value for each year
                cy.fixture('gdp_annual_data.json').then((expectedData) => {
                    expect(response.body.data).to.deep.eq(expectedData)
                });
            });
    });

    /**
     * [Test-2.2] Verify Successful Retrieval of Real GDP Data in csv format annual
     * Steps: Send a [GET] request to REAL_GDP endpoint with following parameters
     * datatype: csv, interval: annual
     * Expected Result: status code should be 200 OK
     */
    it('[Test-2.2] Verify Successful Retrieval of Real GDP Data in csv format annual', () => {
        get_real_gdp(API_KEY, INTERVAL_ANNUAL, DATA_TYPE_CSV)
            .then(response => {
                // verify response status code is 200
                expect(response.status).to.eq(200);

                // Verify that the response is in JSON format
                expect(response.headers['content-type']).to.eq(CONTENT_TYPE_DOWNLOAD);
                expect(response.headers['content-disposition']).to.contain('.csv');

                // Verify column names
                const csvRows = response.body.trim().split('\r\n');
                const headerRow = csvRows[0];
                const columns = headerRow.split(',');
                expect(columns).to.deep.eq(['timestamp', 'value']);

                // verify data
                cy.fixture('gdp_annual_data.json').then((expectedData) => {
                    const expectedHeaders = 'timestamp,value';
                    const expectedRows = expectedData.map(item => `${item.date},${item.value}`)
                    const expectedCsv = [expectedHeaders, ...expectedRows];
                    expect(csvRows).to.deep.eq(expectedCsv)
                });
            });
    });

});
