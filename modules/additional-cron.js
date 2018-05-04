
// app actions
const getTrendAndSave = require('../app-actions/get-trend-and-save');
const logPortfolioValue = require('../app-actions/log-portfolio-value');
const { default: recordStratPerfs } = require('../app-actions/record-strat-perfs');
const sellAllOlderThanTwoDays = require('../app-actions/sell-all-older-than-two-days');

// utils
const regCronIncAfterSixThirty = require('../utils/reg-cron-after-630');
const timeoutPromise = require('../utils/timeout-promise');

// rh actions
const sellAllIfWentUp = require('../app-actions/sell-all-if-went-up');
const sellAllStocks = require('../app-actions/sell-all-stocks');
const getAllTickers = require('../rh-actions/get-all-tickers');

// socket-server
const stratManager = require('../socket-server/strat-manager');

const additionalCronConfig = [
    // {
    //     name: 'sell all stocks',
    //     run: [0],
    //     fn: (Robinhood) => {
    //
    //         setTimeout(async () => {
    //             // daily at 6:30AM + 4 seconds
    //             await sellAllStocks(Robinhood);
    //             console.log('done selling all');
    //             //
    //             // timeoutPromise(5000);
    //             // console.log('selling all stocks that went up');
    //             // await sellAllIfWentUp(Robinhood);
    //             // console.log('logging portfolio value');
    //             // await logPortfolioValue(Robinhood);
    //
    //         }, 8);
    //
    //     }
    // },
    // sell all if went up
    // {
    //     name: 'sellAllIfWentUp',
    //     run: [90, 305],
    //     fn: sellAllIfWentUp
    // },
    // sell all if went up
    // {
    //     name: 'sellAllStocks',
    //     run: [8],   // 12pm
    //     fn: sellAllStocks
    // },
    // log port value
    // {
    //     name: 'log the portfolio value',
    //     run: [195, 292],
    //     fn: logPortfolioValue
    // },
    // log the trend
    // {
    //     name: 'log the trend',
    //     run: [75, 105, 180],
    //     fn: getTrendAndSave
    // },
    // record prev day strat performances,
    {
        name: 'record-strat-perfs',
        run: [9],
        fn: async (Robinhood, min) => {
            await recordStratPerfs(Robinhood, min);
            await stratManager.refreshPastData();
        }
    },
    {
        name: 'record-strat-perfs important!',
        run: [85, 230, 330],
        fn: recordStratPerfs
    },
    //sellAllOlderThanTwoDays
    // {
    //     name: 'sell all if older than one day',
    //     run: [45],
    //     fn: sellAllOlderThanTwoDays
    // },
    {
        name: 'getAllTickers',
        run: [1027],
        fn: getAllTickers
    }
];

const additionalCron = {
    init: (Robinhood) => {
        additionalCronConfig.forEach(cronConfig => {
            regCronIncAfterSixThirty(
                Robinhood,
                cronConfig
            );
        });
    }
};

module.exports = additionalCron;
