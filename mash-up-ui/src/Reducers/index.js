import { combineReducers } from 'redux';

import { login } from './login.reducer';
import { viewControl } from './viewControl.reducer'

const rootReducer = combineReducers({
  login,
  viewControl
});

export default rootReducer;