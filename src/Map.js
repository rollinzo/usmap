import React, {useEffect} from 'react';
import {usMap} from './coords'

export default function Map(){

  const filterCommas = (stateData) => {
    return stateData.replace(',',' ');
  }

  const State = (props) => {
    return <>
              <path d={filterCommas(usMap[props.state])} fill="lightgreen" stroke="black" />
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

  return <div>
    <svg height="1000" width="1000">
     {allStates()}
    </svg>
  </div>;
}
