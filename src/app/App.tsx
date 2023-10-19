import React from 'react';
import {Route, Routes} from "react-router-dom";
import {MainPage} from "../pages/MainPage";
import {NavBarCustom} from "../widgets/NavBarCustom/NavBarCustom";


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
