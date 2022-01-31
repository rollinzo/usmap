import React, {useEffect, useState} from 'react';
import {usMap} from './coords'
// import {usMapsmallest} from './maps/usMapsmallest.js';
import './Map.css';
import {svgParse2Resize} from './svgParse2Resize';

// const usMap = usMapsmallest;


export default function Map(){
  const [displayWidth, setDisplayWidth] = useState(getWidth());
  const [floatScaleFactor, setFloatScaleFactor] = useState(0.4);
  const [mapWidth, setMapWidth] = useState(600);
  const [mapHeight, setMapHeight] = useState(400);
  const [selectedState, setSelectedState] = useState("Click on a State");
  //for small state buttons
  const [topButtonY, setTopButtonY] = useState(0.125 * mapHeight);
  const [xAlignment, setXAlignment] = useState(0.65 * mapWidth);

  const handleResize = () => {
   //how to calculate FSF: setFloatScaleFactor((displayWidth/600) * 0.4);
   //    setMapHeight((2/3) * mapWidth);
   //    setTopButtonY(0.125 * mapHeight);

    setDisplayWidth(getWidth());
    if (displayWidth < 800) {
      setFloatScaleFactor(0.4);
      setMapWidth(600);
      setMapHeight(400);
      setTopButtonY(50);
      setXAlignment(480);

    } else if (displayWidth >= 800 && displayWidth < 1000) {
        setFloatScaleFactor(0.6);
        setMapWidth(750);
        setMapHeight(500);
        setTopButtonY(62.5);
        setXAlignment(580);
    } else {
      setFloatScaleFactor(0.9);
      setMapWidth(1000);
      setMapHeight(650);
      setTopButtonY(80);
      setXAlignment(850);
    }




  }

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
             return <State key={myState} state={myState} fsf={floatScaleFactor} fill="lightblue" stroke="black" announceMe={setSelectedState}/>
           //}
           // return <div>myState</div>
    });
  }

  const smallStateButtons = () => {
    //NH, VT, MA, RI, CT, RI, NJ, MD, DE, DC
    // const topButtonY = 0.125 * mapHeight;
    // const xAlignment =0.65 * mapWidth;
    const smallStates = ["nh", "vt", "ma", "ri", "ct", "nj", "md", "de", "dc"]
    return smallStates.map((myState, index) =>{
      let yAlignment = topButtonY + (index * (0.05 * mapHeight));
      return <SmallState key={"small" + myState} state={myState} x={xAlignment} y={yAlignment} />;
    });
  }

  const SmallState = (props) => {
    return (<React.Fragment>
             <text x={props.x} y={props.y} color="black">{props.state.toUpperCase()}</text>
            </React.Fragment>);
  }

  const displayMap = () => {
    return <div id="mapDiv">
             <svg id="theMap" width={mapWidth} height="600">
               {allStates()}
               {smallStateButtons()}

             </svg>
           </div>;
  }

  const altDisplay = () => {
    return <div id="mapDiv">Display Alternate to Map</div>;
  }

  const defaultFSF = 0.4;
  const minScreenSize = 600;
  const defaultScreenSize = 800
  const defaultMapSize = 600

  //calculate the float scale factor for svgParse2Resize
  const mapRatioFSF = () => {
    return defaultFSF * defaultMapSize / defaultScreenSize
  }

  const DisplayBasedOnWidth = () => {
    let myWidth = getWidth();
    if (myWidth > minScreenSize) {
      let myRatio
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
            <path d={svgParse2Resize(filterCommas(usMap[props.state]),props.fsf)} fill={myFill} stroke={myStroke} onMouseOver={highlightState} onMouseOut={deHighlightState} onClick={()=>{ window.location.href = "https://kevinrollins.com/" + props.state}}/>
         </>;
}
