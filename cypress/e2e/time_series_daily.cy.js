const { get_time_series_daily } = require("../api/time_series_daily_util");
const { API_KEY } = require("../support/utils/constants");
const { INVALID_API_KEY_MESSAGE } = require("../support/utils/message");


const base_url = 'https://www.alphavantage.co';
const query = '/query'

describe('[GET] TIME SERIES DAILY', { tags: '@smoke' }, () => {
    it('test1', () => {
        get_time_series_daily(API_KEY, 'IBM', 'json', 'compact')
            .then(response => {
                expect(response.status).to.eq(200)
                console.log('body', response.body)
            });
    });

    it('[Negative Test] Empty API key', () => {
        get_time_series_daily('', 'IBM', 'json', 'compact')
            .then(response => {
                expect(response.status).to.eq(200);
                expect(response.body["Error Message"]).to.eq(INVALID_API_KEY_MESSAGE)
            });
    });

    it('[Negative Test] Invalid API key', () => {
        get_time_series_daily('A123', 'IBM', 'json', 'compact')
            .then(response => {
                expect(response.status).to.eq(200);
                expect(response.body["Error Message"]).to.eq(INVALID_API_KEY_MESSAGE)
            });
    });

});
