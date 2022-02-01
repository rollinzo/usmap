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
  // const [mapWidth, setMapWidth] = useState(600);
  // const [mapHeight, setMapHeight] = useState(400);
  // const [mapCoords, setMapCoords] = useState("Smallest");
  //smallState button display
  // const [topButtonY, setTopButtonY] = useState(0.125 * mapHeight);
  // const [xAlignment, setXAlignment] = useState(0.65 * mapWidth);


  // const [selectedState, setSelectedState] = useState("Click on a State");

//initialize map size
  useEffect(() => {
    handleResize();
  },[]);

  const handleResize = () => {
    setDisplayWidth(getWidth());
    // if (displayWidth < 600) {
    //   setMapCoords("altDisplay");
    // }
    // else if (displayWidth < 800) {
    //   setMapWidth(600);
    //   setMapHeight(400);
    //   setMapCoords("Smallest");
    //
    //   setTopButtonY(50);
    //   setXAlignment(480);
    //
    // } else if (displayWidth >= 800 && displayWidth < 1000) {
    //
    //     setMapWidth(750);
    //     setMapHeight(500);
    //     setMapCoords("Middle");
    //     setTopButtonY(62.5);
    //     setXAlignment(580);
    // } else {
    //
    //   setMapWidth(1000);
    //   setMapHeight(650);
    //   setMapCoords("Big");
    //   setTopButtonY(80);
    //   setXAlignment(850);
    // }
}

  function getWidth() {
    //https://stackoverflow.com/a/28241682
    return document.body.clientWidth || document.documentElement.clientWidth;

    // return Math.max(
      // document.body.scrollWidth,
      // document.documentElement.scrollWidth,
      // document.body.offsetWidth,
      // document.documentElement.offsetWidth,

    // );
  }

  //https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
  window.addEventListener('resize', handleResize);

  // const mapSwitch = () => {
  //   if (mapCoords==="Smallest") {
  //     return usMapSmallest;
  //   } else if (mapCoords==="Middle") {
  //     return usMapMiddle;
  //   } else {
  //     return usMapBig;
  //   }
  // }



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
              <path d={props.map} fill={myFill} stroke={myStroke} onMouseOver={highlightState} onMouseOut={deHighlightState} onClick={()=>{ props.clickAction(props.state)}}/>
           </>;
  }


  const smallStateButtons = (topButtonY, xAlignment, mapWidth, mapHeight) => {
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
           </div>
  }


  const altDisplay = () => {
    return <div id="mapDiv">Display Alternate to Map
            </div>;
  }

  const displayMapBasedOnWidth = () => {
    if (displayWidth < 600) {
    // if (displayWidth > minScreenWidth) {
      return altDisplay();
    }
    let mapWidth;
    let mapHeight;
    let smallStateTopY;
    let smallStateX;
    let myMapCoords;
    if (displayWidth >= 600 && displayWidth < 800) {
      mapWidth = 500;
      mapHeight = 330;
      myMapCoords = usMapSmallest;
    } else if (displayWidth >= 800 && displayWidth < 1300) {
      mapWidth = 670;
      mapHeight = 440;
      myMapCoords = usMapMiddle;
    } else {
      mapWidth = 1000;
      mapHeight = 660;
      myMapCoords = usMapBig;
    }
    return <div id="mapDiv">
              <svg id="theMap" width={mapWidth} height={mapHeight}>
                 {allStates(myMapCoords)}
              </svg>
           </div>;
} //end of displayMapBasedOfWidth

  const allStates = (myMap) => {
    return Object.keys(myMap).map((myState) => {
             return <State key={myState} state={myState} map={myMap[myState]} fill={normalStateFill} stroke={normalStateStroke} clickAction={visitStatePage} />
    });
  }

  return <div id="mapWrapper">
           {displayMapBasedOnWidth()}
           {displayDisplayData()}
         </div>;

} //end of Map()
