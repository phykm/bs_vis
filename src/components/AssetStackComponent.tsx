import React, { useMemo } from "react";

export type Assets = {name:string,amount:number,colorString: string}[];

export interface AssetStackComponentProps {
  assets :Assets;
  width: number;
  textSize:number;
}

export const AssetStackComponent: React.FC<AssetStackComponentProps> = ({assets,width,textSize}) => {
  const assetsWithAncher: {name:string,amount:number,colorString: string, height:number}[] = useMemo(()=>{
    let ret = [];
    let height = 0;
    for (let i = 0; i < assets.length; i++) {
      ret.push({...assets[i],height:height});
      height = height+assets[i].amount;
    }
    return ret
  },assets)
  return (<g>
    {
      assetsWithAncher.map((asset)=>{
        asset.name
        return (
          <g transform={`translate(${0},${asset.height})`}>
            <rect x={0} y={0} width={width} height={asset.amount} fill={asset.colorString}/>
            <text x={width/2} y={asset.amount / 2} dominantBaseline="middle" textAnchor="middle" fill="black" fontSize={textSize}>{asset.name}</text>
          </g>
        )
      })
    }
  </g>);
};