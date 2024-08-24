const { get_time_series_daily } = require("../api/time_series_daily_util");
const { API_KEY, SYMBOL_IBM, DATA_TYPE_JSON, OUT_PUT_SIZE_COMPACT, CONTENT_TYPE_JSON, DYNAMIC_INPUT, DATA_TYPE_CSV, CONTENT_TYPE_DOWNLOAD } = require("../support/utils/constants");
const { INVALID_API_KEY_MESSAGE } = require("../support/utils/message");

/**
 * All Tests related to the function TIME_SERIES_DAILY will be added in this file
 */
describe('[GET] TIME SERIES DAILY', { tags: '@smoke' }, () => {

    /**
     * [Test-1.1]: Verify Successful retrieval of Daily Time Series Data - Json format, compact
     * Steps: Send a [GET] request to TIME_SERIES_DAILY endpoint with following parameters
     * symbol: IBM, datatype: json, outputsize: compact
     * Expected Result: status code should be 200 OK
     */
    it('[Test-1.1]: Verify Successful retrieval of Daily Time Series Data - json format, compact', () => {
        get_time_series_daily(API_KEY, SYMBOL_IBM, DATA_TYPE_JSON, OUT_PUT_SIZE_COMPACT)
            .then(response => {
                // verify response status code is 200
                expect(response.status).to.eq(200)
                cy.wait(1000)

                // Verify that the response is in JSON format
                expect(response.headers['content-type']).to.eq(CONTENT_TYPE_JSON)

                // Response body should include the expected structure including 'Meta Data' and 'Time Series (Daily)' sections
                expect(response.body).to.have.property('Meta Data');
                expect(response.body).to.have.property('Time Series (Daily)');

                // Meta data section should include the information, Symbol, Last Refreshed, Output Size and Time Zone information
                const metaData = response.body['Meta Data'];
                cy.fixture('time_series_daily_meta_data.json').then((expectedMetaData) => {
                    Object.keys(expectedMetaData).forEach((key) => {
                        expect(metaData).to.have.property(key);
                        // only verify static content (Eg. value of 'Last Refreshed' would be dynamic, hence only key is verified)
                        if (expectedMetaData[key] != DYNAMIC_INPUT) {
                            expect(metaData[key]).to.equal(expectedMetaData[key]);
                        }
                    });
                });

                const timeSeries = response.body['Time Series (Daily)'];
                const timeSeriesKeys = Object.keys(timeSeries);

                // it should return only 100 data points since the output size is compact
                expect(timeSeriesKeys).to.have.length(100)

                // Verify that the TimeSeries (Daily) object has the keys
                const firstEntry = timeSeries[timeSeriesKeys[0]];
                expect(firstEntry).to.have.property('1. open');
                expect(firstEntry).to.have.property('2. high');
                expect(firstEntry).to.have.property('3. low');
                expect(firstEntry).to.have.property('4. close');
                expect(firstEntry).to.have.property('5. volume');
            });
    });


    /**
    * [Test-1.3]: Verify Successful retrieval of Daily Time Series Data - csv format, compact
    * Steps: Send a [GET] request to TIME_SERIES_DAILY endpoint with following parameters
    * symbol: IBM, datatype: csv, outputsize: compact
    * Expected Result: status code should be 200 OK
     */
    it('[Test-1.3]: Verify Successful retrieval of Daily Time Series Data - csv format, compact', () => {
        get_time_series_daily(API_KEY, SYMBOL_IBM, DATA_TYPE_CSV, OUT_PUT_SIZE_COMPACT)
            .then(response => {
                // verify response status code is 200
                expect(response.status).to.eq(200)

                // Verify that the response is in csv format
                expect(response.headers['content-type']).to.eq(CONTENT_TYPE_DOWNLOAD)
                expect(response.headers['content-disposition']).to.contain('.csv')

                // Verify column names
                const rows = response.body.trim().split('\r\n');
                const headerRow = rows[0];
                const columns = headerRow.split(',');
                expect(columns).to.deep.eq(['timestamp', 'open', 'high', 'low', 'close', 'volume']);

                // it should return only 100 data points since the output size is compact
                // with header row, it should be 101
                expect(rows).to.have.length(101);
            });
    });

    it('[Test-1.5] Verify API Response with Empty API Key', () => {
        get_time_series_daily('', SYMBOL_IBM, DATA_TYPE_JSON, OUT_PUT_SIZE_COMPACT)
            .then(response => {
                expect(response.status).to.eq(200);
                expect(response.body["Error Message"]).to.eq(INVALID_API_KEY_MESSAGE)
            });
    });

    it('[Test-1.6] Verify API Response with Invalid API Key', () => {
        get_time_series_daily('A123', SYMBOL_IBM, DATA_TYPE_JSON, OUT_PUT_SIZE_COMPACT)
            .then(response => {
                expect(response.status).to.eq(200);
                expect(response.body["Error Message"]).to.eq(INVALID_API_KEY_MESSAGE)
            });
    });

});
