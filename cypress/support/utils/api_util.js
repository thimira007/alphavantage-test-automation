import { FUNCTION_TIME_SERIES_DAILY } from './constants';
import { QUERY_END_POINT } from './endpoints';

/**
 * Common Function to get the response from TIME_SERIES_DAILY
 */
export function get_time_series_daily(apikey, symbol, datatype, outputsize) {
    const qs = {
        function: FUNCTION_TIME_SERIES_DAILY,
        symbol: symbol,
        apikey: apikey,
        datatype: datatype,
        outputsize: outputsize
    }
    return cy.request({
        url: QUERY_END_POINT,
        qs: filterQueryVariables(qs)
    });
}

/**
 * Function to exclude null values from query variables
 */
function filterQueryVariables(qs) {
    const filteredQs = Object.fromEntries(
        Object.entries(qs).filter(([key, value]) => value != null)
    );
    console.log('filteredQs', filteredQs);
    return filteredQs;
}