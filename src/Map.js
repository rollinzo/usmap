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
              <path d={filterCommas(svgParse2Resize(usMap[props.state], 2.0))} fill="lightgreen" stroke="black" />
           </>;
  }
  const allStates = () => {
    return Object.keys(usMap).map((myState) => {
           return <State state={myState} />
           // return <div>myState</div>
    });
  }
  // useEffect(()=>{
  //   console.log(allStates());
  // },[]);
  const someStates = () => {
    return [<State state="tx" />, <State state="va" />, <State state="nc" />];
  }

  return <div id="mapDiv">
    <svg id="theMap" height="1000" width="1000">
     {allStates()}
    </svg>
  </div>;
}
