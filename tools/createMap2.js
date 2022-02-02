const parser = require ('./svgParse2ResizeCommonJS.js');
//require ('../src/coords.js');
const coords = require('./coordsCommonJS.js');

const fs = require('fs');

//configure visitStatePage
const sitePath="http://kevinrollins.com/";

//color customization for states
const normalStateFill = "lightblue";
const normalStateStroke = "black";
const hoverStateFill = "red";
const clickStateFill = "darkred";


const visitStatePage = (myState) => {
  window.location.href = sitePath + myState;
}


const filterCommas = (stateData) => {
  return stateData.replace(/,/g,' ');
}


const mapsData = {
  "UsMapSmall": {
    mapWidth: 500,
    mapHeight: 330,
    mapFSF: 0.4
  },
  "UsMapMiddle": {
    mapWidth: 670,
    mapHeight: 440,
    mapFSF: 0.6,
  },
  "UsMapBig": {
    mapWidth: 1000,
    mapHeight: 660,
    mapFSF: 0.9
  }
}


const outputFilePath = "./generated_svg_maps/";

const generateOutputStr = (outputVariableName) => {
  let outputStr = "import React from 'react';\n";
  let svgwrapper = ""
  outputStr = outputStr + "export default function " + outputVariableName + "() {\n return ";
  //...
  return outputStr;
}








//Output SVG container

//Output State
  <path d={props.map} fill={myFill} stroke={myStroke} onMouseOver={highlightState} onMouseOut={deHighlightState} onClick={()=>{ props.clickAction(props.state)}}/>

Object.keys(coords.coords).map((key) => {
  outputStr = outputStr + "'" + key + "':" + "'";
  outputStr = outputStr + parser(filterCommas(coords.coords[key]), floatScaleFactor) + "',";
 });

// "chop!"
//h/t https://stackoverflow.com/a/952945
outputStr = outputStr.substring(0, outputStr.length - 1);

outputStr = outputStr + "}";
fs.writeFile(outputFilePath, outputStr,  err => {
  if (err) {
    console.error(err)
    return
  }
});
