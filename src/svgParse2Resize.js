export function svgParse2Resize(inputStr, floatScaleFactor) {
  let inputArr = Array.from(inputStr);
  //console.log(inputArr);
  let fsf = floatScaleFactor;
  let outputStr = "";
  const numChars = ["0","1","2","3","4","5", "6","7","8","9","."]
  const isNum = (myChar) => {
    return (numChars.includes(myChar));
  }

  let i = 0;
  let parseNumMode = false;
  let currNumStr = "";
  let currNum = 0.0;
  let currCharIsNum = false;
  let nextCharIsNum = false;
  //ASSUMPTION: last input char should always be a 'z'
  //therefore, we should never end up in parseNumMode
  //on the last element of inputArr
  while (i < inputArr.length) {
    if (parseNumMode) {
      currCharIsNum = isNum(inputArr[i]);
      nextCharIsNum = isNum(inputArr[i+1])
      if (currCharIsNum && nextCharIsNum){
        currNumStr = currNumStr + inputArr[i];
      } else if (currCharIsNum) {
        currNumStr = currNumStr + inputArr[i];
        //do conversion
        //console.log("A: " + currNumStr);
        currNum = parseFloat(currNumStr) * fsf;

        outputStr = outputStr + currNum;
        currNumStr = "";
        parseNumMode = false;
      } else {
        //do conversion
        //console.log("B: " + currNumStr);

        currNum = parseFloat(currNumStr) * fsf;
        outputStr = outputStr + currNum;
        currNumStr = "";
        parseNumMode = false;
      }
    } else {
      //parseCharMode
      if (isNum(inputArr[i])) {
        currNumStr = currNumStr + inputArr[i];
        parseNumMode = true;
      } else {
        outputStr = outputStr + inputArr[i];
      }
    }
    i++;
  } //end of while

  return outputStr;
}//end of svgParse2Resize()
