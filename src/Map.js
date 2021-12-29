import React, {useEffect, useState} from 'react';
import {usMap} from './coords'
import './Map.css';
import {svgParse2Resize} from './svgParse2Resize';

export default function Map(){

  const [selectedState, setSelectedState] = useState("Click on a State");

  const announcedState = () =>{
    if (selectedState === "Click on a State") {
      return selectedState;
    } else {
      return "You clicked on :" + selectedState;
    }
  }

  const allStates = () => {
    return Object.keys(usMap).map((myState) => {
          // if (myState != "ak" && myState != "wa") {
             return <State key={myState} state={myState} fill="lightblue" stroke="black" announceMe={setSelectedState}/>
           //}
           // return <div>myState</div>
    });
  }
  // useEffect(()=>{
  //   console.log(svgParse2Resize("M 200 200 L 350 200 L 500 350 L 500 500 L 350 650 L 200 650 L 50 500 L 50 350  Z",1.0));
  // },[]);
  // const someStates = () => {
  //   return [<State state="tx" />, <State state="va" />, <State state="nc" />];
  // }

  return <div id="mapDiv">
    <svg id="theMap" width="500" height="300">
     {allStates()}
    </svg>
    <h1>{announcedState()}</h1>
    <div>{svgParse2Resize(filterCommas(usMap["mi"]),0.4)}</div>
  </div>;
}

const filterCommas = (stateData) => {
  return stateData.replace(/,/g,' ');
}

const State = (props) => {
  const [myFill, setMyFill] = useState(props.fill);
  const [myStroke, setMyStroke] = useState(props.stroke);
  const highlightState = () => {
    setMyFill("red");
  }
  const deHighlightState = () => {
    setMyFill("lightblue");
  }
  return <>
            <path d={svgParse2Resize(filterCommas(usMap[props.state]),0.4)} fill={myFill} stroke={myStroke} onMouseOver={highlightState} onMouseOut={deHighlightState} onClick={()=>{ window.location.href = "https://kevinrollins.com/" + props.state}}/>
         </>;
}
