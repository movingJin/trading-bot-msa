import ADA from './ada.png';
import BCH from './bch.png';
import BTC from './btc.png';
import EOS from './eos.png';
import ETH from './eth.png';
import LINK from './link.png';
import LTC from './ltc.png';
import TRX from './trx.png';
import XLM from './xlm.png';
import XRP from './xrp.png';

export interface Icons {
  [key: string]: string;
  ADA: string;
  BCH: string;
  BTC: string;
  EOS: string;
  ETH: string;
  LINK: string;
  LTC: string;
  TRX: string;
  XLM: string;
  XRP: string;
}

const icons: Icons = { ADA, BCH, BTC, EOS, ETH, LINK, LTC, TRX, XLM, XRP };
export default icons;
