import { LensTwoTone } from '@mui/icons-material';

interface Data {
  name: string;
  currentPrice: string;
  rateOfChange: string;
  money: string;
  id: string;
}

const coinDataUtils = {
  init: (data: any, state: any) => {
    const newData: any = [];
    data.forEach((coin: any) => {
      newData.push({
        symbol: coin.symbol,
        tickType: coin.tickType,
        openPrice: coin.openPrice,
        closePrice: coin.closePrice,
        lowPrice: coin.lowPrice,
        highPrice: coin.highPrice,
        value: coin.value,
        volume: coin.volume,
        sellVolume: coin.sellVolume,
        buyVolume: coin.buyVolume,
        prevClosePrice: coin.prevClosePrice,
        chgRate: coin.chgRate,
        chgAmt: coin.chgAmt,
        timeTag: coin.timeTag,
      });
    });
    return newData;
  },
  update: (data: any, state: any) => {
    const targetCoin = state.coin.conList;
    // console.log('state:', targetCoin, 'data:', data);
  },
  convertData: (data: any) => {
    let newData: any = [];
    if (data.coinList.length) {
      newData = data.coinList.map((coin: any) => {
        return {
          id: coin.symbol,
          name: coin.symbol,
          currentPrice: `${parseInt(coin.closePrice, 10).toLocaleString()}원`,
          rateOfChange: coin.chgRate,
          money: `${parseInt(coin.value, 10).toLocaleString()}원`,
          color: coin.color,
          changeCell: coin.changeCell,
        };
      });
    }
    return newData || [];
  },
};
export { coinDataUtils };
