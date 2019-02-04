import React, { Component } from 'react';

import getTrend from '../utils/get-trend';
import avgArray from '../utils/avg-array';

import Pick from '../components/Pick';
import TrendPerc from '../components/TrendPerc';

class TodaysStrategies extends Component {
    render() {
        let { pmPerfs, settings, predictionModels, admin, positions } = this.props;

        const toDisplay = {
            dayAge: 'days old',
            ticker: 'ticker',
            ...!admin ? {
                'percent of total invested': pos => pos.percTotal + '%',
            } : {
                equity: 'equity',
                'avg': 'average_buy_price',
                'current': 'currentPrice',
                'return $': 'returnDollars',
                'return %': pos => <TrendPerc value={pos.returnPerc} />,
            },
            'buy strategies': 'buyStrategy',
        };
        return (
            <div style={{ padding: '15px' }}>

                <table>
                    <thead>
                        {
                            Object.keys(toDisplay).map(header => 
                                <th>{header}</th>
                            )
                        }
                    </thead>
                    <tbody>
                        {
                            positions.map(pos => (
                                <tr>
                                    {
                                        Object.keys(toDisplay).map(header => {
                                            const render = toDisplay[header];
                                            const v = typeof render === 'function' ? render(pos) : pos[render]; 
                                            return (
                                                <td>{v}</td>
                                            );
                                        })
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TodaysStrategies;