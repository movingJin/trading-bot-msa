import store from '../redux/store';
import { validateTokenActions } from '../redux/reducers/authReducer';

export default function preLogin(): void {
  try {
    if (sessionStorage.getItem('trb-token')) {
      store.dispatch(
        validateTokenActions.request(sessionStorage.getItem('trb-token')),
      );
    }
  } catch (e) {
    console.log(e);
  }
}
