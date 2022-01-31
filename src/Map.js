import React, {useEffect, useState} from 'react';
// import {usMap} from './coords'
import {usMapSmallest} from './maps/usMapSmallest.js';
import {usMapMiddle} from './maps/usMapMiddle.js';
import {usMapBig} from './maps/usMapBig.js';
import './Map.css';
import {svgParse2Resize} from './svgParse2Resize';

export default function Map(){
  //Minimum screen width for map display:
  const minScreenWidth = 600;

  //configure vistStatePage
  const sitePath="http://kevinrollins.com/";

  //color customization for states
  const normalStateFill = "lightblue";
  const normalStateStroke = "black";
  const hoverStateFill = "red";
  const clickStateFill = "darkred";

  //map display data
  const [displayWidth, setDisplayWidth] = useState(getWidth());
  const [mapWidth, setMapWidth] = useState(600);
  const [mapHeight, setMapHeight] = useState(400);
  const [mapCoords, setMapCoords] = useState(usMapSmallest);
  //smallState button display
  const [topButtonY, setTopButtonY] = useState(0.125 * mapHeight);
  const [xAlignment, setXAlignment] = useState(0.65 * mapWidth);


  const [selectedState, setSelectedState] = useState("Click on a State");

//initialize map size
  useEffect(() => {
    handleResize();
  },[]);

  const handleResize = () => {

    setDisplayWidth(getWidth());
    if (displayWidth < 800) {
      setMapCoords(usMapSmallest);
      setMapWidth(600);
      setMapHeight(400);
      setTopButtonY(50);
      setXAlignment(480);

    } else if (displayWidth >= 800 && displayWidth < 1000) {
        setMapCoords(usMapMiddle);
        setMapWidth(750);
        setMapHeight(500);
        setTopButtonY(62.5);
        setXAlignment(580);
    } else {
      setMapCoords(usMapBig);
      setMapWidth(1000);
      setMapHeight(650);
      setTopButtonY(80);
      setXAlignment(850);
    }
}

  //getWidth() via https://stackoverflow.com/a/1038781
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

  const allStates = () => {
    return Object.keys(mapCoords).map((myState) => {
             return <State key={myState} state={myState} fill={normalStateFill} stroke={normalStateStroke} clickAction={visitStatePage} />
    });
  }

  //handler functions for mouseOver/Click, etc.

  const visitStatePage = (myState) => {
    window.location.href = sitePath + myState;
  }

  // const announcedState = () =>{
  //   if (selectedState === "Click on a State") {
  //     return selectedState;
  //   } else {
  //     return "You clicked on :" + selectedState;
  //   }
  // }

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
              <path d={filterCommas(mapCoords[props.state])} fill={myFill} stroke={myStroke} onMouseOver={highlightState} onMouseOut={deHighlightState} onClick={()=>{ props.clickAction(props.state)}}/>
           </>;
  }


  const smallStateButtons = () => {
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

  const displayDisplayData = () => {
    return <div id = "displayData">
             <p>displayWidth: {displayWidth}</p>
             <p>mapWidth: {mapWidth}</p>
             <p>mapHeight: {mapHeight}</p>
           </div>
  }

  const displayMap = () => {
    return <div id="mapDiv">
             <svg id="theMap" width={mapWidth} height={mapHeight}>
               {allStates()}
               {smallStateButtons()}
             </svg>
             {displayDisplayData()}
           </div>;
  }


  const altDisplay = () => {
    return <div id="mapDiv">Display Alternate to Map
               {displayDisplayData()}
            </div>;
  }

  const displayMapBasedOnWidth = () => {
    if (displayWidth > minScreenWidth) {
      return displayMap();
    } else {
      return altDisplay();
    }
  }

  return <div id="mapWrapper">
           {displayMapBasedOnWidth()}
         </div>;

} //end of Map()
