import { FUNCTION_REAL_GDP, FUNCTION_TIME_SERIES_DAILY } from './constants';
import { QUERY_END_POINT } from './endpoints';

/**
 * Common Function to get the response from TIME_SERIES_DAILY
 * parse null to exclude any parameter from the request
 * @param {*} apikey Generated API key
 * @param {*} symbol Required value to get time series information (Eg. IBM)
 * @param {*} datatype json/ csv
 * @param {*} outputsize Strings compact and full are accepted with the following specifications: compact returns only the latest 100 data points; full returns the full-length time series of 20+ years of historical data
 */
export function get_time_series_daily(apikey, symbol, datatype, outputsize) {
    const qs = {
        function: FUNCTION_TIME_SERIES_DAILY,
        symbol: symbol,
        apikey: apikey,
        datatype: datatype,
        outputsize: outputsize
    };
    return cy.request({
        url: QUERY_END_POINT,
        qs: filterQueryVariables(qs)
    });
}


/**
 * Common Function to get the response from REAL_GDP request
 * parse null to exclude any parameter from the request
 * @param {*} apikey Generated API key
 * @param {*} interval Strings quarterly and annual are accepted
 * @param {*} datatype json and csv are accepted
 */
export function get_real_gdp(apikey, interval, datatype){
    const qs = {
        function: FUNCTION_REAL_GDP,
        apikey: apikey,
        interval: interval,
        datatype: datatype
    };
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