import React, {useEffect, useState} from 'react';
// import {usMap} from './coords'
import {usMapSmallest} from './maps/usMapSmallest.js';
import {usMapMediumSmall} from './maps/usMapMediumSmall.js';

import {usMapMiddle} from './maps/usMapMiddle.js';
import {usMapBig} from './maps/usMapBig.js';
import {usMapBigger} from './maps/usMapBigger.js';
import './Map.css';
import {svgParse2Resize} from './svgParse2Resize';
import {states} from './states.js';

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
  // useEffect(() => {
  //   handleResize();
  // },[]);

  const handleResize = () => {
    setDisplayWidth(getWidth());
}

  function getWidth() {
    //https://stackoverflow.com/a/28241682
    return document.body.clientWidth || document.documentElement.clientWidth;

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
      let yAlignment = topButtonY + (index * (0.07 * mapHeight));
      return <SmallState key={"small" + myState} state={myState} x={xAlignment} y={yAlignment} clickAction={visitStatePage} />;
    });
  }

  const SmallState = (props) => {
    const [rectClass, setRectClass] = useState("noHighlight");
    const highlightState = () => {
      setRectClass("highlight");
    }
    const deHighlightState = () => {
      setRectClass("noHighlight");
    }
    return (<React.Fragment>
             <rect className={rectClass} x={props.x-2} y={props.y-15} width="30" height="20" rx="3px" onMouseOver={highlightState} onMouseOut={deHighlightState} />
             <text x={props.x} y={props.y} color="black" onMouseOver={highlightState} onMouseOut={deHighlightState} onClick={()=>{ props.clickAction(props.state)}}>
               {props.state.toUpperCase()}
             </text>
            </React.Fragment>);
  }

  const displayDisplayData = () => {
    return <div id = "displayData">
             <p>displayWidth: {displayWidth}</p>
           </div>
  }


  const AltDisplay = () => {
    return <div>Display Map Alternate</div>;
    // const [stateIndex, setStateIndex] = useState(0);
    // const [scrollVal, setScrollVal] = useState(0);
    // useEffect(() => {
    //   console.log(scrollVal);
    // });
    // const statesList = () => {
    //   return states.map((stateObj) => {
    //     return <div>{stateObj["State"]}</div>;
    //   });
    // };
    //
    // // document.addEventListener('scroll', (e) => { setScrollVal(window.scrollY) });
    // var scrollPos = document.getElementByID('mapDiv')
    // return <div id="mapDiv">Display Alternate to Map
    //           <div>ScrollVal: {scrollVal}</div>
    //           <hr />
    //           <div id="statesList">{statesList()} </div>
    //         </div>;
  }

  const displayMapBasedOnWidth = () => {
    if (displayWidth < 600) {
    // if (displayWidth > minScreenWidth) {
      return <AltDisplay />;
    }
    let mapWidth;
    let mapHeight;
    let smallStateTopY;
    let smallStateX;
    let myMapCoords;
    if (displayWidth >= 600 && displayWidth < 650) {
      mapWidth = 500;
      mapHeight = 330;
      myMapCoords = usMapSmallest;
      smallStateTopY = 40;
      smallStateX = 390;
    } else if (displayWidth >= 650 && displayWidth < 715) {
      mapWidth = 585;
      mapHeight = 390;
      myMapCoords = usMapMediumSmall;
      smallStateTopY = 50;
      smallStateX = 430;
    } else if (displayWidth >= 715 && displayWidth < 800) {
      mapWidth = 670;
      mapHeight = 440;
      myMapCoords = usMapBig;
      smallStateTopY = 62.5;
      smallStateX = 580;
    } else if (displayWidth >= 800 && displayWidth < 990) {
      mapWidth = 750;
      mapHeight = 500;
      myMapCoords = usMapBigger;
      smallStateTopY = 70;
      smallStateX = 670;
    } else {
      mapWidth = 585;
      mapHeight = 390;
      myMapCoords = usMapMiddle;
      smallStateTopY = 50;
      smallStateX = 470;
    }
    return <div id="mapDiv">
              <svg id="theMap" width={mapWidth} height={mapHeight}>
                 {allStates(myMapCoords)}
                 {smallStateButtons(smallStateTopY, smallStateX, mapWidth, mapHeight)}
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

         </div>;

} //end of Map()
