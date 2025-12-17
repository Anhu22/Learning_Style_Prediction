/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Choose from "./Choose";
import ReadWrite1 from "./ReadWrite1";
import ReadWrite2 from "./ReadWrite2";
import ReadWrite3 from "./ReadWrite3";
import RW_Quiz1 from "./RW_Quiz1";
import RW_Quiz2 from "./RW_Quiz2";
import RW_Quiz3 from "./RW_Quiz3";
import Visual1 from "./Visual1";
import Visual_Quiz1 from "./Visual_Quiz1";
import Visual2 from "./Visual2";
import Visual_Quiz2 from "./Visual_Quiz2";
import Visual3 from "./Visual3";
import Visual_Quiz3 from "./Visual_Quiz3";
import Result from "./Result";
import Kinesthetic1 from "./Kinesthetic1";
import Kinesthetic2 from "./Kinesthetic2";
import Kinesthetic3 from "./Kinesthetic3";
import Kinesthetic_Quiz1 from "./Kinesthetic_Quiz1";
import Kinesthetic_Quiz2 from "./Kinesthetic_Quiz2";
import Kinesthetic_Quiz3 from "./Kinesthetic_Quiz3";
import Audio1 from "./Audio1";
import A_Quiz1 from "./Audio_Quiz1";
import Audio2 from "./Audio2";
import A_Quiz2 from "./Audio_Quiz2";
import Audio3 from "./Audio3";
import A_Quiz3 from "./Audio_Quiz3";
import SectionResult from "./SectionResult";
import SelfAssessment from "./SelfAssessment";
import Dashboard from "./Dashboard";
import ToDoList from "./To-do";
import Notes from "./Notes";
import Learning from "./Learning";
import { ScoreProvider } from "./ScoreProvider";


function App() {
  return (
    <ScoreProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/choose" element={<Choose/>}/>
            <Route path="/readwrite1" element={<ReadWrite1 />} />
            <Route path="/readwrite2" element={<ReadWrite2 />} />
            <Route path="/readwrite3" element={<ReadWrite3 />} />
            <Route path="/rw_quiz1" element={<RW_Quiz1 />} />
            <Route path="/rw_quiz2" element={<RW_Quiz2 />} />
            <Route path="/rw_quiz3" element={<RW_Quiz3 />} />
            <Route path="/visual1" element={<Visual1 />} />
            <Route path="/vquiz1" element={<Visual_Quiz1 />} />
            <Route path="/visual2" element={<Visual2 />} />
            <Route path="/vquiz2" element={<Visual_Quiz2 />} />
            <Route path="/visual3" element={<Visual3 />} />
            <Route path="/vquiz3" element={<Visual_Quiz3 />} />
            <Route path="/kinesthetic1" element={<Kinesthetic1 />} />
            <Route path="/Kinesthetic2" element={<Kinesthetic2/>} />
            <Route path="/kinesthetic3" element={<Kinesthetic3 />} />
            <Route path="/kinesthetic_quiz1" element={<Kinesthetic_Quiz1 />} />
             <Route path="/kinesthetic_quiz2" element={<Kinesthetic_Quiz2 />} />
            <Route path="/kinesthetic_quiz3" element={<Kinesthetic_Quiz3 />} />
            <Route path="/audio1" element={<Audio1 />} />
            <Route path="/a_quiz1" element={<A_Quiz1 />} />
            <Route path="/audio2" element={<Audio2 />} />
            <Route path="/a_quiz2" element={<A_Quiz2 />} />
            <Route path="/audio3" element={<Audio3 />} />
            <Route path="/a_quiz3" element={<A_Quiz3 />} />
            <Route path="/result" element={<Result />} />
            <Route path="/section-result" element={<SectionResult />} />
            <Route path="/SelfAssessment" element={<SelfAssessment />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/todo" element={<ToDoList />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/learning" element={<Learning />} />
          </Routes>
        </div>
      </Router>
    </ScoreProvider>
  );
}

export default App;
