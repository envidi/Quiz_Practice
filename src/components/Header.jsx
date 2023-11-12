import React, { useState } from 'react'
import ProgressCustom from './Progress'
import '../header.css'

function Header({timeRemaining,isClick,isCorrect}) {
    const {value, total} = timeRemaining
    let cssClass = ''
  if(total === 40){
    cssClass = 'progress-custom'
  }
  else if(total === 6){
    cssClass = 'progress-custom-answered'
  }
  else if(total === 7){
    cssClass = 'progress-custom-result'
  }
  else{
    cssClass = 'progress-custom'
  }
  return (
    <>
      { value > 0 &&
        <ProgressCustom 
        className={cssClass}
        style={{background:"#6a558a"}} 
        now={Math.round(value/total)} 
        label={`${Math.round(value/total)}`} />} 
 
        {/* {(value > 0  && isClick ) && 
        <ProgressCustom style={{background:"#6a558a"}} variant="warning"
        max={600}
        now={Math.floor(value)} 
        label={`${Math.floor(value/total)}`} />} 

         {(value > 0 && isCorrect   || isCorrect==false  ) && 
        <ProgressCustom variant="danger" 
        style={{background:"#6a558a"}}
        now={Math.floor(value/total)} 
        label={`${Math.floor(value/total)}`} />}  */}
    </>
  )
}

export default Header