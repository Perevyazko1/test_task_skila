import React from 'react';
import {Route, Routes} from "react-router-dom";
import {MainPage} from "../pages/MainPage";


function App() {
  return (
    <>
        <Routes>
            <Route path={"/test_task_skila"} element={<MainPage/>}/>
        </Routes>

    </>
  );
}

export default App;
