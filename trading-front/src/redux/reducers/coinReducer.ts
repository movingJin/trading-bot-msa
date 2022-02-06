// action types
export const COINLIST_REQUEST = 'coin/COINLIST_REQUEST' as const;
export const COINLIST_SUCCESS = 'coin/COINLIST_SUCCESS' as const;
export const COINLIST_FAILURE = 'coin/COINLIST_FAILURE' as const;

const coinListRequest = (sort: any) => ({ type: COINLIST_REQUEST, payload: sort });
const coinListSuccess = (res: any) => ({ type: COINLIST_SUCCESS, payload: res });
const coinListFailure = (error: any) => ({ type: COINLIST_FAILURE, payload: error });
export const coinListActions = {
  request: coinListRequest,
  success: coinListSuccess,
  failure: coinListFailure,
};
export type CoinListAction =
  | ReturnType<typeof coinListRequest>
  | ReturnType<typeof coinListSuccess>
  | ReturnType<typeof coinListFailure>;

interface ICoinState {
  isLoading: boolean;
  errorMsg: string;
}
const initalState: ICoinState = {
  isLoading: false,
  errorMsg: '',
};
export default function coinReducer(state: ICoinState = initalState, action: CoinListAction): ICoinState {
  switch (action.type) {
    case COINLIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMsg: '',
      };
    case COINLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMsg: '',
      };
    case COINLIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload.detail.msg,
      };
    default:
      break;
  }
  return {
    ...state,
    isLoading: false,
    errorMsg: '',
  };
}
