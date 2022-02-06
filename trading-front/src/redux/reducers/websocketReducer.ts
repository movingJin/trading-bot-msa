import { createConnectSocketSaga } from '@redux/sagas/websocketSaga';
import { coinDataUtils } from '@utils/utils';

export const START_INIT = 'coin/START_INIT' as const;

export const END_INIT = 'coin/END_INIT' as const;

const CONNECT_SOCKET = 'coin/CONNECT_SOCKET' as const;
const CONNECT_SOCKET_SUCCESS = 'coin/CONNECT_SOCKET_SUCCESS' as const;
const CONNECT_SOCKET_ERROR = 'coin/CONNECT_SOCKET_ERROR' as const;

export const FETCH_COIN_REQUEST = 'coin/FETCH_COIN_REQUEST' as const;
export const FETCH_COIN_SUCCESS = 'coin/FETCH_COIN_SUCCESS' as const;
export const FETCH_COIN_ERROR = 'coin/FETCH_COIN_ERROR' as const;

const fetchCoinRequest = () => ({ type: FETCH_COIN_REQUEST, payload: null });
const fetchCoinSuccess = (res: any) => ({
  type: FETCH_COIN_SUCCESS,
  payload: res,
});
const fetchCoinFailure = (res: any) => ({
  type: FETCH_COIN_ERROR,
  payload: res,
});
export const fetchCoinActions = {
  request: fetchCoinRequest,
  success: fetchCoinSuccess,
  failure: fetchCoinFailure,
};
export type fetchCoinAction =
  | ReturnType<typeof fetchCoinRequest>
  | ReturnType<typeof fetchCoinSuccess>
  | ReturnType<typeof fetchCoinFailure>;
export type websocketAction = fetchCoinAction;
export const startInit = () => ({ type: START_INIT });
export const endInit = () => ({ type: END_INIT });
export const postLivePriceData = (livePriceData: any) => {
  return {
    type: 'POST_LIVE_PRICE_DATA',
    data: livePriceData,
  };
};
export interface ICoinState {
  symbol: string;
  tickType: string;
  openPrice: string;
  closePrice: string;
  lowPrice: string;
  highPrice: string;
  value: string;
  volume: string;
  sellVolume: string;
  buyVolume: string;
  prevClosePrice: string;
  chgRate: string;
  chgAmt: string;
  timeTag: string;
  color?: any;
  changeCell?: string;
}
interface ICoinInit {
  coinList: ICoinInit[];
}
const initialState: ICoinInit = {
  coinList: [],
};
// TODO: init 초기 함수 key 갖고 있도록 바꾸기
const reducerUtils = {
  success: (state: any, payload: any, key: any) => {
    return {
      ...state,
      [key]: [...payload],
    };
  },
  error: (state: any, error: any, key: any) => ({
    ...state,
    [key]: {
      ...state[key],
      error,
    },
  }),
};
const requestActions = (type: any, key: any) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state: any, action: any) => {
    switch (action.type) {
      case SUCCESS:
        return reducerUtils.success(state, action.payload, key);
      case ERROR:
        return reducerUtils.error(state, action.payload, key);
      default:
        return state;
    }
  };
};
export const connectSocketSaga = createConnectSocketSaga(
  CONNECT_SOCKET,
  coinDataUtils.update,
);

export default function websocketReducer(
  state = initialState,
  action: any,
  // key: any,
) {
  switch (action.type) {
    case 'SUCCESS':
      return state;
    //   return reducerUtils.success(state, action.payload, key);
    case CONNECT_SOCKET_SUCCESS:
    case CONNECT_SOCKET_ERROR:
      return requestActions(CONNECT_SOCKET, 'coinList')(state, action);
    case FETCH_COIN_SUCCESS:
      return {
        ...state,
        coinList: action.payload,
      };
    case END_INIT:
      return {
        ...state,
        coinList: action.payload,
      };
    default:
      return state;
  }
}
