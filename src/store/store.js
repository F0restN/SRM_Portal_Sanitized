import { createStore } from '@reduxjs/toolkit';

const defaultState = {
  authenticationRole: false,
  jwtToken: false,
};

const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('authenticationStatus');
    if (serializedState === null) {
      return defaultState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return defaultState;
  }
};

const update = (state = {}, action) => {
  console.log(state);
  return state;
};

const store = createStore(update, loadState());
export default store;

// import { configureStore } from '@reduxjs/toolkit'
// import authenticationStatusReducer from "./reducer/authenticationSlice";
//
// const loadState = () => {
//     try { // 也可以容错一下不支持localStorage的情况下，用其他本地存储
//         const serializedState = localStorage.getItem('');
//         if (serializedState === null) {
//             return undefined;
//         } else {
//             return JSON.parse(serializedState);
//         }
//     } catch (err) {
//         // ... 错误处理
//         return undefined;
//     }
// }
//
// export default configureStore(loadState(), {
//     reducer: {
//         authenticationStatus: authenticationStatusReducer
//     },
// })
