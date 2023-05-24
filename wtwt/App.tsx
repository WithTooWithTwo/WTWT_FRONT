import * as React from 'react';

import {Provider, useSelector} from "react-redux";
import store from "./src/store";
import {RootState} from "./src/store/reducer";
import AppInner from "./AppInner";

// 어떤 페이지 들어가야 하는지 미리 정의해놓고 시작하기
export type LoggedInParamList = {
    Main : undefined;
    Chat : undefined;
    Group : undefined;
    // Complete: {orderId: string}; // delivery 안에 있음
};

// 조건이 달라서 페이지를 분리해놨음
export type RootStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
};

function App() {
  return (
      <Provider store={store}>
          <AppInner />
      </Provider>
  );
}

export default App;
