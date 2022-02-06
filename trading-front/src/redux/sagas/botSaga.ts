import {
  call,
  put,
  all,
  fork,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import axios from '@utils/axios';
import {
  AddBotAction,
  addBotActions,
  ADD_BOT_REQUEST,
  ADD_BOT_SUCCESS,
  Bot,
  deleteBotActions,
  DELETE_BOT_REQUEST,
  DELETE_BOT_SUCCESS,
  GetBotAction,
  getBotActions,
  getBotsActions,
  GET_BOTS_REQUEST,
  GET_BOT_REQUEST,
  updateBotActions,
  UPDATE_BOT_REQUEST,
  UPDATE_BOT_SUCCESS,
} from '@redux/reducers/botReducer';
import { AxiosResponse } from 'axios';

// GET bots
const getBotsAPI = () => {
  return axios.get('trading-service/bots');
};

interface IResponse<T> {
  data: T;
}

function* getBots() {
  try {
    const res: AxiosResponse = yield call(getBotsAPI);
    yield put(getBotsActions.success(res.data));
  } catch (e) {
    yield put(getBotsActions.failure(e));
  }
}

function* watchGetBots() {
  yield takeLatest(GET_BOTS_REQUEST, getBots);
}

// GET bots/{bot-id}
const getBotAPI = (botId: string) => {
  return axios.get(`trading-service/bots/${botId}`);
};

interface IgetBotResponse {
  'token-info': Bot;
}

function* getBot(action: GetBotAction) {
  try {
    const res: IResponse<IgetBotResponse> = yield call(
      getBotAPI,
      action.payload,
    );
    yield put(getBotActions.success(res.data['token-info']));
  } catch (e) {
    yield put(getBotActions.failure(e));
  }
}

function* watchGetBot() {
  yield takeEvery(GET_BOT_REQUEST, getBot);
}

// POST bots
const addBotAPI = (botInfo: Bot) => {
  return axios.post(`trading-service/bots`, botInfo);
};

function* addBot(action: AddBotAction) {
  try {
    const res: AxiosResponse = yield call(addBotAPI, action.payload);
    if (res.data !== 'success') {
      throw new Error('POST bots request failed!');
    }
    yield put(addBotActions.success());
    // yield put(getBotsActions.request());
  } catch (e) {
    yield put(addBotActions.failure(e));
  }
}

function* watchAddBot() {
  yield takeEvery(ADD_BOT_REQUEST, addBot);
}

// PATCH bots/{bot-id}
const updateBotAPI = (botInfo: Bot) => {
  return axios.patch(`trading-service/bots/${botInfo.id}`, botInfo);
};

function* updateBot(action: GetBotAction) {
  try {
    const res: AxiosResponse = yield call(updateBotAPI, action.payload);
    if (res.data !== 'success') {
      throw new Error('PATCH bots request failed!');
    }
    yield put(updateBotActions.success(res.data));
    // yield put(getBotsActions.request());
  } catch (e) {
    yield put(updateBotActions.failure(e));
  }
}

function* watchUpdateBot() {
  yield takeLatest(UPDATE_BOT_REQUEST, updateBot);
}

// DELETE bots/{bot-id}
const deleteBotAPI = (botId: string) => {
  return axios.delete(`trading-service/bots/${botId}`);
};

function* deleteBot(action: GetBotAction) {
  try {
    const res: AxiosResponse = yield call(deleteBotAPI, action.payload);
    if (res.data !== 'success') {
      throw new Error('DELETE bots request failed!');
    }
    yield put(deleteBotActions.success(res.data));
  } catch (e) {
    yield put(deleteBotActions.failure(e));
  }
}

function* watchDeleteBot() {
  yield takeLatest(DELETE_BOT_REQUEST, deleteBot);
}

function* afterSuccess() {
  yield put(getBotsActions.request());
}

function* watchSuccess() {
  yield takeLatest(
    [ADD_BOT_SUCCESS, UPDATE_BOT_SUCCESS, DELETE_BOT_SUCCESS],
    afterSuccess,
  );
}

export default function* botSaga() {
  yield all([
    fork(watchGetBots),
    fork(watchGetBot),
    fork(watchAddBot),
    fork(watchUpdateBot),
    fork(watchDeleteBot),
    fork(watchSuccess),
  ]);
}
