// action types
export const GET_BOTS_REQUEST = 'bot/GET_BOTS_REQUEST' as const;
export const GET_BOTS_SUCCESS = 'bot/GET_BOTS_SUCCESS' as const;
export const GET_BOTS_FAILURE = 'bot/GET_BOTS_FAILURE' as const;

export const GET_BOT_REQUEST = 'bot/GET_BOT_REQUEST' as const;
export const GET_BOT_SUCCESS = 'bot/GET_BOT_SUCCESS' as const;
export const GET_BOT_FAILURE = 'bot/GET_BOT_FAILURE' as const;

export const ADD_BOT_REQUEST = 'bot/ADD_BOT_REQUEST' as const;
export const ADD_BOT_SUCCESS = 'bot/ADD_BOT_SUCCESS' as const;
export const ADD_BOT_FAILURE = 'bot/ADD_BOT_FAILURE' as const;

export const UPDATE_BOT_REQUEST = 'bot/UPDATE_BOT_REQUEST' as const;
export const UPDATE_BOT_SUCCESS = 'bot/UPDATE_BOT_SUCCESS' as const;
export const UPDATE_BOT_FAILURE = 'bot/UPDATE_BOT_FAILURE' as const;

export const DELETE_BOT_REQUEST = 'bot/DELETE_BOT_REQUEST' as const;
export const DELETE_BOT_SUCCESS = 'bot/DELETE_BOT_SUCCESS' as const;
export const DELETE_BOT_FAILURE = 'bot/DELETE_BOT_FAILURE' as const;

type CoinName =
  | 'BTC'
  | 'ADA'
  | 'LTC'
  | 'XRP'
  | 'ETH'
  | 'LINK'
  | 'XLM'
  | 'BCH'
  | 'EOS'
  | 'TRX';

type BidReference =
  | 'HMA1'
  | 'HMA3'
  | 'HMA6'
  | 'HMA12'
  | 'DMA1'
  | 'DMA5'
  | 'DMA20'
  | 'DMA60'
  | 'DMA120';

export interface Bot {
  uuid?: string;
  id?: string;
  botName: string;
  coinName: CoinName;
  bidReference: BidReference;
  bidCondition: number;
  bidQuantity: number;
  isBidConditionExceed: boolean;
  askReference: string;
  askCondition: number;
  askQuantity: number;
  isActive: boolean;
  profit?: number;
  description?: string;
}

export type Bots = Bot[];

const getBotsRequest = () => ({ type: GET_BOTS_REQUEST, payload: null });
const getBotsSuccess = (bots: Bots) => ({
  type: GET_BOTS_SUCCESS,
  payload: bots,
});
const getBotsFailure = (error: any) => ({
  type: GET_BOTS_FAILURE,
  payload: error,
});
export const getBotsActions = {
  request: getBotsRequest,
  success: getBotsSuccess,
  failure: getBotsFailure,
};

const getBotRequest = (botId: string) => ({
  type: GET_BOT_REQUEST,
  payload: botId,
});
const getBotSuccess = (bot: Bot) => ({
  type: GET_BOT_SUCCESS,
  payload: bot,
});
const getBotFailure = (error: any) => ({
  type: GET_BOT_FAILURE,
  payload: error,
});
export const getBotActions = {
  request: getBotRequest,
  success: getBotSuccess,
  failure: getBotFailure,
};

const addBotRequest = (botInfo: Bot) => ({
  type: ADD_BOT_REQUEST,
  payload: botInfo,
});
const addBotSuccess = () => ({
  type: ADD_BOT_SUCCESS,
  payload: null,
});
const addBotFailure = (error: any) => ({
  type: ADD_BOT_FAILURE,
  payload: error,
});
export const addBotActions = {
  request: addBotRequest,
  success: addBotSuccess,
  failure: addBotFailure,
};

const updateBotRequest = (botInfo: Bot) => ({
  type: UPDATE_BOT_REQUEST,
  payload: botInfo,
});
const updateBotSuccess = (msg: string) => ({
  type: UPDATE_BOT_SUCCESS,
  payload: msg,
});
const updateBotFailure = (error: any) => ({
  type: UPDATE_BOT_FAILURE,
  payload: error,
});
export const updateBotActions = {
  request: updateBotRequest,
  success: updateBotSuccess,
  failure: updateBotFailure,
};

const deleteBotRequest = (botId: string) => ({
  type: DELETE_BOT_REQUEST,
  payload: botId,
});
const deleteBotSuccess = (msg: string) => ({
  type: DELETE_BOT_SUCCESS,
  payload: msg,
});
const deleteBotFailure = (error: any) => ({
  type: DELETE_BOT_FAILURE,
  payload: error,
});
export const deleteBotActions = {
  request: deleteBotRequest,
  success: deleteBotSuccess,
  failure: deleteBotFailure,
};

// TODO: delete bot
// TODO: get botdetail
// TODO: update bot

export type GetBotsAction =
  | ReturnType<typeof getBotsRequest>
  | ReturnType<typeof getBotsSuccess>
  | ReturnType<typeof getBotsFailure>;

export type GetBotAction =
  | ReturnType<typeof getBotRequest>
  | ReturnType<typeof getBotSuccess>
  | ReturnType<typeof getBotFailure>;

export type AddBotAction =
  | ReturnType<typeof addBotRequest>
  | ReturnType<typeof addBotSuccess>
  | ReturnType<typeof addBotFailure>;

export type UpdateBotAction =
  | ReturnType<typeof updateBotRequest>
  | ReturnType<typeof updateBotSuccess>
  | ReturnType<typeof updateBotFailure>;

export type DeleteBotAction =
  | ReturnType<typeof deleteBotRequest>
  | ReturnType<typeof deleteBotSuccess>
  | ReturnType<typeof deleteBotFailure>;

type BotAction =
  | GetBotsAction
  | GetBotAction
  | AddBotAction
  | UpdateBotAction
  | DeleteBotAction;

interface IBotState {
  bots: Bots;
  bot: Bot;
  // botInfo: BotInfo;
  isLoading: boolean;
}

const initialState: IBotState = {
  bots: [],
  bot: {} as Bot,
  // botInfo: {} as BotInfo,
  isLoading: false,
};

export default function botReducer(
  state: IBotState = initialState,
  action: BotAction,
): IBotState {
  switch (action.type) {
    case GET_BOTS_REQUEST:
    case GET_BOT_REQUEST:
    case ADD_BOT_REQUEST:
    case UPDATE_BOT_REQUEST:
    case DELETE_BOT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_BOTS_SUCCESS: {
      const bots = action.payload;
      const newBots: Bots = bots.map((bot: Bot) => {
        const copied: Bot = { ...bot };
        delete copied.uuid;
        return copied;
      });
      return {
        ...state,
        isLoading: false,
        bots: newBots,
      };
    }
    case GET_BOT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bot: action.payload,
      };
    case GET_BOTS_FAILURE:
    case GET_BOT_FAILURE:
      return {
        ...state,
        isLoading: false,
        bots: action.payload,
      };
    case ADD_BOT_SUCCESS:
      // alert('트레이딩 봇이 추가되었습니다!');
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_BOT_SUCCESS:
    case UPDATE_BOT_FAILURE:
    case DELETE_BOT_SUCCESS:
    case DELETE_BOT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
