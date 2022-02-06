
// action types
export const GET_ITEMS_REQUEST = 'portfolio/GET_ITEMS_REQUEST' as const;
export const GET_ITEMS_SUCCESS = 'portfolio/GET_ITEMS_SUCCESS' as const;
export const GET_ITEMS_FAILURE = 'portfolio/GET_ITEMS_FAILURE' as const;

export const GET_ITEM_REQUEST = 'portfolio/GET_ITEM_REQUEST' as const;
export const GET_ITEM_SUCCESS = 'portfolio/GET_ITEM_SUCCESS' as const;
export const GET_ITEM_FAILURE = 'portfolio/GET_ITEM_FAILURE' as const;

export const GET_PORTFOLIO_REQUEST = 'portfolio/GET_PORTFOLIO_REQUEST' as const;
export const GET_PORTFOLIO_SUCCESS = 'portfolio/GET_PORTFOLIO_SUCCESS' as const;
export const GET_PORTFOLIO_FAILURE = 'portfolio/GET_PORTFOLIO_FAILURE' as const;

export interface Item {
    id: number,
    timeTag: string;
    coinName: string;
    uuid: string;
    price: number;
    quantity: number;
    isBid: boolean;
}

export type Items = Item[];

//
const getItemsRequest = () => ({ type: GET_ITEMS_REQUEST, payload: null });
const getItemsSuccess = (items: any) => ({type: GET_ITEMS_SUCCESS, payload: items,});
const getItemsFailure = (error: any) => ({type: GET_ITEMS_FAILURE, payload: error,});
export const getItemsActions = {
    request: getItemsRequest,
    success: getItemsSuccess,
    failure: getItemsFailure,
};
export type GetItemsAction =
    | ReturnType<typeof getItemsRequest>
    | ReturnType<typeof getItemsSuccess>
    | ReturnType<typeof getItemsFailure>;

//
const getItemRequest = (itemId: string) => ({type: GET_ITEM_REQUEST, payload: itemId,});
const getItemSuccess = (item: Item) => ({type: GET_ITEM_SUCCESS, payload: item,});
const getItemFailure = (error: any) => ({type: GET_ITEM_FAILURE, payload: error,});
export const getItemActions = {
    request: getItemRequest,
    success: getItemSuccess,
    failure: getItemFailure,
};
export type GetItemAction =
    | ReturnType<typeof getItemRequest>
    | ReturnType<typeof getItemSuccess>
    | ReturnType<typeof getItemFailure>;

//
const getPortfolioRequest = () => ({type: GET_PORTFOLIO_REQUEST,});
const getPortfolioSuccess = (portfolio: any) => ({type: GET_PORTFOLIO_SUCCESS, payload: portfolio,});
const getPortfolioFailure = (error: any) => ({type: GET_PORTFOLIO_FAILURE, payload: error,});
export const getPortfolioActions = {
    request: getPortfolioRequest,
    success: getPortfolioSuccess,
    failure: getPortfolioFailure,
};
export type GetPortfolioActions =
    | ReturnType<typeof getPortfolioRequest>
    | ReturnType<typeof getPortfolioSuccess>
    | ReturnType<typeof getPortfolioFailure>;

type ItemAction = GetItemsAction | GetItemAction | GetPortfolioActions;

export interface Portfolio {
    balance: number,
    tokenAsset: any;
}

interface IItemState {
    items: Items;
    item: Item;
    isLoading: boolean;
    portfolio: Portfolio;
}

const initialState: IItemState = {
    items: [],
    item: {} as Item,
    isLoading: false,
    portfolio: {} as Portfolio
};

export default function portfolioReducer(
    state: IItemState = initialState,
    action: ItemAction,
): IItemState {
    switch (action.type) {
        case GET_ITEMS_REQUEST:
        case GET_ITEM_REQUEST:
        case GET_PORTFOLIO_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case GET_ITEMS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                items: action.payload,
            };
        case GET_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                item: action.payload,
            };
            case GET_PORTFOLIO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                portfolio: action.payload.data,
            };
        case GET_ITEMS_FAILURE:
        case GET_ITEM_FAILURE:
        case GET_PORTFOLIO_FAILURE:
            return {
                ...state,
                isLoading: false,
                items: action.payload,
            };
        default:
            return state;
    }
}
