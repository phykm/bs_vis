import React from "react";
import { TotalBalancesComponent } from "./TotalBalancesComponent";
import { LineAnnotationComponent } from "./LineAnnotationComponent";


interface BalancesWithAnnotationComponentProps {
  credits: number;
  monetaryBase: number;
  governmentDebt:number;
  moneyStock:number;
}

export const BalancesWithAnnotationComponent : React.FC<BalancesWithAnnotationComponentProps> = ({credits, monetaryBase, governmentDebt, moneyStock}) => {
  const labelSize = 15;
  const padding = 5;
  const assetWidth = 70;
  const mergin = 30;
  const annotate = 150;
  const svgWidth = padding*2 + assetWidth*8 + mergin*3 + annotate;
  return(
  <svg className="mainSvg" width={svgWidth} height={moneyStock+labelSize*2 + 2*padding} xmlns="http://www.w3.org/2000/svg">
    <g transform={`translate(${padding},${padding})`}>
      <TotalBalancesComponent credits={credits} monetaryBase={monetaryBase} governmentDebt={governmentDebt} moneyStock={moneyStock} labelSize={labelSize} assetWidth={assetWidth} mergin={mergin}/>
    </g>
    <g transform={`translate(${padding}, ${monetaryBase + padding + labelSize*2})`}>
      <LineAnnotationComponent text={"マネタリーベース"} length={svgWidth - annotate} textSize={labelSize}/>
    </g>
    <g transform={`translate(${padding}, ${governmentDebt + padding + labelSize*2})`}>
      <LineAnnotationComponent text={"民間金融純資産"} length={svgWidth - annotate} textSize={labelSize}/>
    </g>
    <g transform={`translate(${padding}, ${moneyStock + padding + labelSize*2})`}>
      <LineAnnotationComponent text={"マネーストック"} length={svgWidth - annotate} textSize={labelSize}/>
    </g>
    <g transform={`translate(${padding}, ${padding + labelSize*2})`}>
      <LineAnnotationComponent text={""} length={svgWidth - annotate - padding*2} textSize={labelSize}/>
    </g>
  </svg>
  );
}