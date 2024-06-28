import React from "react";
import { AssetStackComponent, Assets } from "./AssetStackComponent";

interface AssetBalanceComponentProp {
  assets: Assets;
  liabilities: Assets;
  assetWidth: number;
  personName: string;
  labelSize: number;
  locateOffset: number; // BS描画位置のオフセット
}

export const AssetBalanceComponent: React.FC<AssetBalanceComponentProp> = ({assets,liabilities,assetWidth,personName,labelSize,locateOffset}) => {
   return (<g>
    <text x={assetWidth} y={labelSize/2} dominantBaseline="middle" textAnchor="middle" fill="black" fontSize={labelSize}>{personName}</text>
    <text x={assetWidth/2} y={labelSize + labelSize/2} dominantBaseline="middle" textAnchor="middle" fill="black" fontSize={labelSize}>資産</text>
    <text x={assetWidth + assetWidth/2} y={labelSize + labelSize/2} dominantBaseline="middle" textAnchor="middle" fill="black" fontSize={labelSize}>負債</text>
    <g transform={`translate(${0},${labelSize*2 + locateOffset})`}>
      <AssetStackComponent assets={assets} width={assetWidth} textSize={labelSize}/>
    </g>
    <g transform={`translate(${assetWidth},${labelSize*2 + locateOffset})`}>
      <AssetStackComponent assets={liabilities} width={assetWidth} textSize={labelSize}/>
    </g>
   </g>);
}