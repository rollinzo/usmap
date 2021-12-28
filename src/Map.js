import React, {useEffect} from 'react';
import {usMap} from './coords'
import './Map.css';
import {svgParse2Resize} from './svgParse2Resize';

export default function Map(){


  const filterCommas = (stateData) => {
    return stateData.replace(',',' ');
  }

  const State = (props) => {
    return <>
              <path d={svgParse2Resize(filterCommas(usMap[props.state]),0.4)} fill="lightgreen" stroke="black" />
           </>;
  }
  const allStates = () => {
    return Object.keys(usMap).map((myState) => {
          // if (myState != "ak" && myState != "wa") {
             return <State key={myState} state={myState} />
           //}
           // return <div>myState</div>
    });
  }
  useEffect(()=>{
    console.log(svgParse2Resize("M 200 200 L 350 200 L 500 350 L 500 500 L 350 650 L 200 650 L 50 500 L 50 350  Z",1.0));
  },[]);
  const someStates = () => {
    return [<State state="tx" />, <State state="va" />, <State state="nc" />];
  }

  return <div id="mapDiv">
    <svg id="theMap" width="500" height="500">
     {allStates()}
    </svg>
  </div>;
}
