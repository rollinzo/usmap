const parser = require ('./svgParse2ResizeCommonJS.js');
//require ('../src/coords.js');
const coords = require('./coordsCommonJS.js');

const fs = require('fs');

const filterCommas = (stateData) => {
  return stateData.replace(/,/g,' ');
}
//TODO: print a comment in the output file with the parameters that are given to createMap

const outputFilePath = "./generated_coords/usMapSmallest.js";
const floatScaleFactor = 0.4;
const outputVariableName = "usMapSmallest";

let outputStr = "//FloatScaleFactor: " + floatScaleFactor + "\n";
outputStr = outputStr + "export const " + outputVariableName + "= {";

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
