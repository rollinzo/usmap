import React, {useEffect, useState} from 'react';
import {usMap} from './coords'
import './Map.css';
import {svgParse2Resize} from './svgParse2Resize';

export default function Map(){
  const [displayWidth, setDisplayWidth] = useState(getWidth());
  const [selectedState, setSelectedState] = useState("Click on a State");


  const handleResize = () => {
    setDisplayWidth(getWidth());
  }

  //https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
  window.addEventListener('resize', handleResize);

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

  const displayMap = () => {
    return <div id="mapDiv">
             <svg id="theMap" width="500" height="300">
               {allStates()}
             </svg>
           </div>;
  }

  const altDisplay = () => {
    return <div id="mapDiv">Display Alternate to Map</div>;
  }

  const DisplayBasedOnWidth = () => {
    let myWidth = getWidth();
    if (myWidth > 600) {
      return displayMap();
    } else {
      return altDisplay();
    }
  }

  useEffect(()=>{
    console.log("my width: " + displayWidth);
  });
  // useEffect(()=>{
  //   console.log(svgParse2Resize("M 200 200 L 350 200 L 500 350 L 500 500 L 350 650 L 200 650 L 50 500 L 50 350  Z",1.0));
  // },[]);
  // const someStates = () => {
  //   return [<State state="tx" />, <State state="va" />, <State state="nc" />];
  // }

  return <div id="mapWrapper">
           <DisplayBasedOnWidth />
         </div>;
}  //END OF Map Component

// ********************************************************

//getWidth() from JQuery via https://stackoverflow.com/a/1038781
function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
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
