import { setAuthToken } from '@utils/axios';

// action types
export const LOGIN_REQUEST = 'auth/LOGIN_REQUEST' as const;
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS' as const;
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE' as const;

export const SIGNUP_REQUEST = 'auth/SIGNUP_REQUEST' as const;
export const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS' as const;
export const SIGNUP_FAILURE = 'auth/SIGNUP_FAILURE' as const;

export const LOGOUT_REQUEST = 'auth/LOGOUT_REQUEST' as const;
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS' as const;
export const LOGOUT_FAILURE = 'auth/LOGOUT_FAILURE' as const;

export const PRIVATEKEY_REQUEST = 'auth/PRIVATEKEY_REQUEST' as const;
export const PRIVATEKEY_SUCCESS = 'auth/PRIVATEKEY_SUCCESS' as const;
export const PRIVATEKEY_FAILURE = 'auth/PRIVATEKEY_FAILURE' as const;

export const USERS_REQUEST = 'auth/USERS_REQUEST' as const;
export const USERS_SUCCESS = 'auth/USERS_SUCCESS' as const;
export const USERS_FAILURE = 'auth/USERS_FAILURE' as const;

export const UPDATEUSERS_REQUEST = 'auth/UPDATEUSERS_REQUEST' as const;
export const UPDATEUSERS_SUCCESS = 'auth/UPDATEUSERS_SUCCESS' as const;
export const UPDATEUSERS_FAILURE = 'auth/UPDATEUSERS_FAILURE' as const;

export const KEYCREATE_REQUEST = 'auth/KEYCREATE_REQUEST' as const;
export const KEYCREATE_SUCCESS = 'auth/KEYCREATE_SUCCESS' as const;
export const KEYCREATE_FAILURE = 'auth/KEYCREATE_FAILURE' as const;

export const VALIDATEKEY_REQUEST = 'auth/VALIDATEKEY_REQUEST' as const;
export const VALIDATEKEY_SUCCESS = 'auth/VALIDATEKEY_SUCCESS' as const;
export const VALIDATEKEY_FAILURE = 'auth/VALIDATEKEY_FAILURE' as const;

export const CLEAR_REQUEST = 'auth/CLEAR_REQUEST' as const;
export const CLEAR_SUCCESS = 'auth/CLEAR_SUCCESS' as const;
export const CLEAR_FAILURE = 'auth/CLEAR_FAILURE' as const;

export const VALIDATE_TOKEN_REQUEST = 'auth/VALIDATE_TOKEN_REQUEST' as const;
export const VALIDATE_TOKEN_SUCCESS = 'auth/VALIDATE_TOKEN_SUCCESS' as const;
export const VALIDATE_TOKEN_FAILURE = 'auth/VALIDATE_TOKEN_FAILURE' as const;

// action creators
const loginRequest = (user: any) => ({ type: LOGIN_REQUEST, payload: user });
const loginSuccess = (loginRes: any) => ({
  type: LOGIN_SUCCESS,
  payload: loginRes,
});
const loginFailure = (error: any) => ({ type: LOGIN_FAILURE, payload: error });
export const loginActions = {
  request: loginRequest,
  success: loginSuccess,
  failure: loginFailure,
};

const signupRequest = (user: any) => ({ type: SIGNUP_REQUEST, payload: user });
const signupSuccess = (res: any) => ({ type: SIGNUP_SUCCESS, payload: res });
const signupFailure = (error: any) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});
export const signupActions = {
  request: signupRequest,
  success: signupSuccess,
  failure: signupFailure,
};

const logoutRequest = () => ({ type: LOGOUT_REQUEST, payload: null });
const logoutSuccess = () => ({ type: LOGOUT_SUCCESS, payload: null });
const logoutFailure = () => ({ type: LOGOUT_FAILURE, payload: null });
export const logoutActions = {
  request: logoutRequest,
  success: logoutSuccess,
  failure: logoutFailure,
};

const usersRequest = () => ({ type: USERS_REQUEST, payload: null });
const usersSuccess = (res: any) => ({ type: USERS_SUCCESS, payload: res });
const usersFailure = (error: any) => ({ type: USERS_FAILURE, payload: error });
export const usersActions = {
  request: usersRequest,
  success: usersSuccess,
  failure: usersFailure,
};

const updateusersRequest = (res: any) => ({
  type: UPDATEUSERS_REQUEST,
  payload: res,
});
const updateusersSuccess = (res: any) => ({
  type: UPDATEUSERS_SUCCESS,
  payload: res,
});
const updateusersFailure = (error: any) => ({
  type: UPDATEUSERS_FAILURE,
  payload: error,
});
export const updateusersActions = {
  request: updateusersRequest,
  success: updateusersSuccess,
  failure: updateusersFailure,
};

const privateKeyRequest = () => ({
  type: PRIVATEKEY_REQUEST,
  // payload: form,
});
const privateKeyRequestSuccess = (res: any) => ({
  type: PRIVATEKEY_SUCCESS,
  payload: res,
});
const privateKeyRequestFailure = (error: any) => ({
  type: PRIVATEKEY_FAILURE,
  payload: error,
});

export const privateKeyActions = {
  request: privateKeyRequest,
  success: privateKeyRequestSuccess,
  failure: privateKeyRequestFailure,
};
const keyCreateRequest = (form: any) => ({
  type: KEYCREATE_REQUEST,
  payload: form,
});
const keyCreateRequestSuccess = (res: any) => ({
  type: KEYCREATE_SUCCESS,
  payload: res,
});
const keyCreateRequestFailure = (error: any) => ({
  type: KEYCREATE_FAILURE,
  payload: error,
});
export const keyCreateActions = {
  request: keyCreateRequest,
  success: keyCreateRequestSuccess,
  failure: keyCreateRequestFailure,
};
const validatekeyRequest = (form: any) => ({
  type: VALIDATEKEY_REQUEST,
  payload: form,
});
const validatekeySuccess = (res: any) => ({
  type: VALIDATEKEY_SUCCESS,
  payload: res,
});
const validatekeyFailure = (error: any) => ({
  type: VALIDATEKEY_FAILURE,
  payload: error,
});

export const validateKeyActions = {
  request: validatekeyRequest,
  success: validatekeySuccess,
  failure: validatekeyFailure,
};
const clearRequest = () => ({
  type: CLEAR_REQUEST,
  payload: null,
});
const clearSuccess = () => ({
  type: CLEAR_SUCCESS,
  payload: null,
});
const clearFailure = (error: any) => ({
  type: CLEAR_FAILURE,
  payload: error,
});

export const clearActions = {
  request: clearRequest,
  success: clearSuccess,
  failure: clearFailure,
};
const validateTokenRequest = (token: string | null) => ({
  type: VALIDATE_TOKEN_REQUEST,
  payload: token,
});
const validateTokenSuccess = () => ({
  type: VALIDATE_TOKEN_SUCCESS,
  payload: null,
});
const validateTokenFailure = () => ({
  type: VALIDATE_TOKEN_FAILURE,
  payload: null,
});
export const validateTokenActions = {
  request: validateTokenRequest,
  success: validateTokenSuccess,
  failure: validateTokenFailure,
};

export type LoginAction =
  | ReturnType<typeof loginRequest>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loginFailure>;
export type SignupAction =
  | ReturnType<typeof signupRequest>
  | ReturnType<typeof signupSuccess>
  | ReturnType<typeof signupFailure>;
export type LogoutAction =
  | ReturnType<typeof logoutRequest>
  | ReturnType<typeof logoutSuccess>
  | ReturnType<typeof logoutFailure>;
export type privateKeyAction =
  | ReturnType<typeof privateKeyRequest>
  | ReturnType<typeof privateKeyRequestSuccess>
  | ReturnType<typeof privateKeyRequestFailure>;
export type keyCreateAction =
  | ReturnType<typeof keyCreateRequest>
  | ReturnType<typeof keyCreateRequestSuccess>
  | ReturnType<typeof keyCreateRequestFailure>;
export type UsersAction =
  | ReturnType<typeof usersRequest>
  | ReturnType<typeof usersSuccess>
  | ReturnType<typeof usersFailure>;
export type UpdateUsersAction =
  | ReturnType<typeof updateusersRequest>
  | ReturnType<typeof updateusersSuccess>
  | ReturnType<typeof updateusersFailure>;
export type ValidateKeyAction =
  | ReturnType<typeof validatekeyRequest>
  | ReturnType<typeof validatekeySuccess>
  | ReturnType<typeof validatekeyFailure>;
export type ClearAction =
  | ReturnType<typeof clearRequest>
  | ReturnType<typeof clearSuccess>
  | ReturnType<typeof clearFailure>;
export type ValidateTokenAction =
  | ReturnType<typeof validateTokenRequest>
  | ReturnType<typeof validateTokenSuccess>
  | ReturnType<typeof validateTokenFailure>;
export type AuthAction =
  | LoginAction
  | SignupAction
  | LogoutAction
  | privateKeyAction
  | UsersAction
  | keyCreateAction
  | UpdateUsersAction
  | ValidateKeyAction
  | ClearAction
  | ValidateTokenAction;

interface IAuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  email: string;
  name: string;
  password: string;
  // successMsg: string;
  errorMsg: string;
  apiKey: string | null;
  secretKey: string | null;
  responseMsg: string;
}

const initialState: IAuthState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  email: '',
  name: '',
  password: '',
  // successMsg: '',
  errorMsg: '',
  apiKey: '',
  secretKey: '',
  responseMsg: '',
};

export default function authReducer(
  state: IAuthState = initialState,
  action: AuthAction,
): IAuthState {
  switch (action.type) {
    case SIGNUP_REQUEST:
    case LOGIN_REQUEST:
    case USERS_REQUEST:
    case VALIDATE_TOKEN_REQUEST:
      return {
        ...state,
        errorMsg: '',
        isLoading: true,
      };
    case LOGIN_SUCCESS: {
      const token = action.payload;
      if (token) {
        sessionStorage.setItem('trb-token', token); // sessionStorage에 token 저장
        setAuthToken(token); // 모든 axios 요청 헤더에 token이 들어가게 설정
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          // email,
          // useranme,
        };
      }
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
      };
    }
    case LOGIN_FAILURE:
      alert('로그인 실패!');
      sessionStorage.removeItem('trb-token'); // 로그인 실패시 token 삭제
      setAuthToken(null);
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
      };
    case LOGOUT_FAILURE:
    case LOGOUT_SUCCESS:
      sessionStorage.removeItem('trb-token'); // 로그인 실패시 token 삭제
      setAuthToken(null);
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        // errorMsg: action.payload,
      };
    case SIGNUP_SUCCESS:
      if (action.payload !== 'update') alert('가입 되었습니다!');
      return {
        ...state,
        isLoading: false,
      };
    case SIGNUP_FAILURE:
      alert('가입 실패했습니다!');
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload.message,
      };

    case PRIVATEKEY_SUCCESS:
      return {
        ...state,
        apiKey: action.payload.connectKey,
        secretKey: action.payload.secretKey,
        errorMsg: '',
      };
    case KEYCREATE_SUCCESS:
      return {
        ...state,
        apiKey: action.payload.connectKey,
        secretKey: action.payload.secretKey,
        errorMsg: '',
        responseMsg: 'success',
      };
    case USERS_SUCCESS:
    case UPDATEUSERS_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.name,
      };
    case VALIDATEKEY_SUCCESS:
      return {
        ...state,
        errorMsg: `${action.payload}`,
      };
    case CLEAR_SUCCESS:
      return {
        ...state,
        errorMsg: '',
        responseMsg: '',
        apiKey: '',
      };
    case VALIDATE_TOKEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case VALIDATE_TOKEN_FAILURE:
      sessionStorage.removeItem('trb-token'); // 로그인 실패시 token 삭제
      setAuthToken(null);
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
      };
    case PRIVATEKEY_FAILURE:
      console.log(`PRIVATEKEY_FAILURE: ${action.payload}`);
      if (action.payload === 'already registered')
        alert('이미 등록된 키입니다.');
      return {
        ...state,
        apiKey: null,
        secretKey: null,
      };
    default:
      return state;
  }
}
