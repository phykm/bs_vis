import React from "react"

interface LineAnnotationComponentProps {
  text:string
  textSize:number
  length: number
}

export const LineAnnotationComponent: React.FC<LineAnnotationComponentProps> = ({text,textSize,length}) => {
  return (<g>
      <line 
        x1="0" 
        y1="0" 
        x2={length + 10} 
        y2="0" 
        stroke="black" 
        strokeWidth="2" 
        strokeDasharray="5,5" 
      />
      <text x={length+10} y={0} dominantBaseline="middle" textAnchor="left" fill="black" fontSize={textSize}>{text}</text>
  </g>)
}