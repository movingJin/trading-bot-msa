import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddlware from 'redux-saga';
import createRootReducer from '@redux/reducers';
import rootSaga from './sagas';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddlware();
const middlewres = [sagaMiddleware, routerMiddleware(history)]; // 액션 처리 요청 -> 미들웨어 작업 수행 -> 리듀서가 작업 처리

const initialState = {};
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // 크롬에서 리덕스 디버깅 하기 위한 익스텐션 설정
const composeEnhancer = process.env.NODE_ENV === 'production' ? compose : devtools || compose; // 개발 모드일 때만 devtools 적용

const store = createStore(createRootReducer(history), initialState, composeEnhancer(applyMiddleware(...middlewres)));
sagaMiddleware.run(rootSaga);

export default store;
