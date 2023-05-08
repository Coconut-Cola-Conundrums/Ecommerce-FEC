import React, {useState, useEffect} from 'react';
import starImage from '../Images/icons8-star-24.png';
import halfStar from '../Images/icons8-star-half-empty-50.png';
import noStar from '../Images/icons8-star-32.png';


export const Stars = ({rating}) => {

  var remainder = rating % 1;
  var wholeNum = Math.floor(rating)
  var emptyStar = 5 - wholeNum;

  return (
    <div>
      <div>{(() => {
        var result = '';
        for (var i = 1; i <= wholeNum; i++) {
          result += '<img src = "' + starImage + '" width = "20"/> ';
        }
        if (remainder< 0.5 && wholeNum !== 5) {
          result += '<img src = "' + noStar + '" width = "20"/> ';
      } else if (wholeNum !== 5){
          result += '<img src = "' + halfStar + '" width = "20"/> ';
        }
        if (emptyStar >= 2 && wholeNum !== 5) {
          for (var j = 2; j <= emptyStar; j ++){
            result += '<img src = "' + noStar + '" width = "20"/> ';
          }
        }


        return <p dangerouslySetInnerHTML={{ __html: result }} ></p>;
      })()}</div>
    </div>
  )
}