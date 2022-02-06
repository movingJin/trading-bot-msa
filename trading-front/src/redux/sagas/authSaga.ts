import { call, put, all, fork, takeEvery } from 'redux-saga/effects';
import {
  loginActions,
  LOGIN_REQUEST,
  LoginAction,
  SIGNUP_REQUEST,
  signupActions,
  SignupAction,
  LOGOUT_REQUEST,
  logoutActions,
  USERS_REQUEST,
  usersActions,
  UsersAction,
  PRIVATEKEY_REQUEST,
  privateKeyActions,
  privateKeyAction,
  KEYCREATE_REQUEST,
  keyCreateAction,
  UpdateUsersAction,
  updateusersActions,
  UPDATEUSERS_REQUEST,
  ValidateKeyAction,
  validateKeyActions,
  VALIDATEKEY_REQUEST,
  clearActions,
  ClearAction,
  CLEAR_REQUEST,
  VALIDATE_TOKEN_REQUEST,
  ValidateTokenAction,
} from '@redux/reducers/authReducer';
import axios from '@utils/axios';
import { wsSaga } from '@redux/sagas/websocketSaga';
import { AxiosResponse } from 'axios';
// put: action을 dispatch 한다.
// call: 인자로 들어온 함수를 실행시킨다. 동기적인 함수 호출일 때 사용.
// all: all에 제네레이터 함수를 배열로 담아서 넘기면 제네레이터 함수들이
//      병렬적으로 실행 -> 전부 resolve 될 때까지 기다렸다가 결과를 리턴한다.
//      (Promise.all과 같은 역할)
// fork: 인자로 들어온 함수를 실행시킨다. 비동기적인 함수 호출일 때 사용. (순서 상관 없을 때

const loginAPI = (user: any) => {
  return axios.post('user-service/login', user);
};
function* login(action: LoginAction) {
  try {
    const res: AxiosResponse = yield call(loginAPI, action.payload);
    const token = res.headers?.authorization;
    yield put(loginActions.success(token));
  } catch (e) {
    yield put(loginActions.failure(e));
  }
}
function* watchLogin() {
  yield takeEvery(LOGIN_REQUEST, login);
}

const signupAPI = (user: any) => {
  return axios.post('user-service/users', user);
};
interface ISignUpResponse {
  data: {
    msg: string;
  };
}
function* signup(action: SignupAction) {
  try {
    const res: ISignUpResponse = yield call(signupAPI, action.payload);
    if (action.payload?.case === 'update')
      yield put(signupActions.success('update'));
    else yield put(signupActions.success(res));
  } catch (e) {
    yield put(signupActions.failure(e));
  }
}
function* watchSignup() {
  yield takeEvery(SIGNUP_REQUEST, signup);
}

function* logout() {
  try {
    yield put(logoutActions.success());
  } catch (e) {
    yield put(logoutActions.failure());
  }
}

function* watchLogout() {
  yield takeEvery(LOGOUT_REQUEST, logout);
}
const getUserAPI = () => {
  return axios.get('user-service/users');
};
const updateUserAPI = async (user: any) => {
  const res = await axios.post('user-service/users', user);
  let resValue;
  if (res.data === 'success') {
    resValue = getUserAPI();
  }
  return resValue;
};
const validateKeyAPI = (info: any) => {
  return axios.post('trading-service/api-validate', info);
};
const getPrivateAPI = () => {
  return axios.get('trading-service/user-api');
};
const createPrivateAPI = async (user: any) => {
  const res = await axios.post('trading-service/user-api', user);
  let resValue;
  if (res.data === 'success') {
    resValue = await getPrivateAPI();
  } else if (res.data === 'already registered') {
    resValue = res;
  }
  return resValue;
};
function* getUser(action: UsersAction) {
  try {
    const res: AxiosResponse = yield call(getUserAPI);
    yield put(usersActions.success(res.data));
  } catch (e) {
    yield put(usersActions.failure(e));
  }
}
function* getUserPrivate(action: privateKeyAction) {
  try {
    const res: AxiosResponse = yield call(getPrivateAPI);
    yield put(privateKeyActions.success(res.data));
  } catch (e) {
    yield put(privateKeyActions.failure(e));
  }
}
function* createUserPrivate(action: keyCreateAction) {
  try {
    const obj = {
      connectKey: action.payload.apiKey,
      secretKey: action.payload.secretKey,
    };
    const res: AxiosResponse = yield call(createPrivateAPI, obj);
    if (res.data === 'already registered') {
      yield put(privateKeyActions.failure('already registered'));
    } else if (res) {
      yield put(privateKeyActions.success(res.data));
    }
  } catch (e) {
    yield put(privateKeyActions.failure(e));
  }
}
function* updateUser(action: UpdateUsersAction) {
  try {
    // const obj = {
    //   connect_key: action.payload.apiKey,
    //   secret_key: action.payload.secretKey,
    // };
    const res: AxiosResponse = yield call(updateUserAPI, action.payload);
    if (res) {
      yield put(updateusersActions.success(res.data));
    }
  } catch (e) {
    yield put(updateusersActions.failure(e));
  }
}
function* validateKey(action: ValidateKeyAction) {
  const obj = {
    connectKey: action.payload.apiKey,
    secretKey: action.payload.secretKey,
  };
  const res: AxiosResponse = yield call(validateKeyAPI, obj);
  try {
    if (res) {
      yield put(validateKeyActions.success(res.data));
    }
  } catch (e) {
    yield put(validateKeyActions.failure(e));
  }
}
function* clear() {
  try {
    yield put(clearActions.success());
  } catch (e) {
    yield put(clearActions.failure(e));
  }
}
function* watchClear() {
  yield takeEvery(CLEAR_REQUEST, clear);
}
function* watchUser() {
  yield takeEvery(USERS_REQUEST, getUser);
  yield takeEvery(UPDATEUSERS_REQUEST, updateUser);
  yield takeEvery(VALIDATEKEY_REQUEST, validateKey);
}
function* watchUserPrivateKey() {
  yield takeEvery(PRIVATEKEY_REQUEST, getUserPrivate);
  yield takeEvery(KEYCREATE_REQUEST, createUserPrivate);
}

function validateTokenAPI() {
  return axios.get('user-service/validation/users');
}
function* validateToken(action: ValidateTokenAction) {
  try {
    const res: AxiosResponse = yield call(validateTokenAPI);
    if (res.status === 200 && action.payload) {
      yield put(loginActions.success(action.payload));
    } else {
      throw new Error('validate token failed!');
    }
  } catch (e) {
    yield put(loginActions.failure(e));
  }
}
function* watchValidateToken() {
  yield takeEvery(VALIDATE_TOKEN_REQUEST, validateToken);
}

export default function* authSaga() {
  yield all([
    fork(watchLogin),
    fork(watchSignup),
    fork(watchLogout),
    fork(watchUser),
    fork(watchUserPrivateKey),
    fork(watchClear),
    fork(watchValidateToken),
  ]);
}
