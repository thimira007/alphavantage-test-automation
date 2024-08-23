import { API_KEY, FUNCTION_TIME_SERIES_DAILY } from "../support/utils/constants";
import { QUERY_END_POINT } from "../support/utils/endpoints";

export function get_time_series_daily(apikey, symbol, datatype, outputsize) {
    return cy.request({
        url: QUERY_END_POINT,
        qs: {
            function: FUNCTION_TIME_SERIES_DAILY,
            symbol: symbol,
            apikey: apikey,
            datatype: datatype,
            outputsize: outputsize
        }
    });
}