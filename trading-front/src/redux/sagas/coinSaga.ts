import { call, put, all, fork, takeEvery } from 'redux-saga/effects';
import {
  CoinListAction,
  COINLIST_REQUEST,
  coinListActions,
} from '@redux/reducers/coinReducer';
import axios from '@utils/axios';
// put: action을 dispatch 한다.
// call: 인자로 들어온 함수를 실행시킨다. 동기적인 함수 호출일 때 사용.
// all: all에 제네레이터 함수를 배열로 담아서 넘기면 제네레이터 함수들이
//      병렬적으로 실행 -> 전부 resolve 될 때까지 기다렸다가 결과를 리턴한다.
//      (Promise.all과 같은 역할)
// fork: 인자로 들어온 함수를 실행시킨다. 비동기적인 함수 호출일 때 사용. (순서 상관 없을 때

const coinListGetAPI = (order: any) => {
  return axios.get(`coins?sort=${order}`);
};
interface ICoinResponse {
  data: {
    message: string;
  };
}
function* coinList(action: CoinListAction) {
  try {
    const res: ICoinResponse = yield call(coinListGetAPI, action.payload);
    // console.log(res);
    yield put(coinListActions.success(res));
  } catch (e) {
    yield put(coinListActions.failure(e));
  }
}
function* coinListGet() {
  yield takeEvery(COINLIST_REQUEST, coinList);
}
export default function* coinSaga() {
  yield all([fork(coinListGet)]);
}
