import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
function ProgressCustom({now,label,...prop}) {
  return (
    <ProgressBar {...prop}
    now={now} 
    label={` ${label}%`}
     />
  )
}

export default ProgressCustom