import { useMemo } from "react";
import { Assets } from "./AssetStackComponent";
import React from "react";
import { AssetBalanceComponent } from "./AssetBalanceComponent";

interface TotalBalancesComponentProps {
  credits:number; // 現金
  monetaryBase:number; // マネタリーベース
  governmentDebt:number; // 政府債務
  moneyStock:number; // マネーストック
  labelSize:number; // ラベルと字のサイズ
  assetWidth:number;
  mergin:number;
}


export const TotalBalancesComponent: React.FC<TotalBalancesComponentProps>= ({credits, monetaryBase,governmentDebt, moneyStock, labelSize, assetWidth, mergin}) =>  {

  // 民間資産
  const citizenAssets:Assets = useMemo(()=>{
    return [
      {name:"現金", amount:credits, colorString:"gold"},
      {name:"預金", amount:moneyStock-credits, colorString:"palegreen"},
    ];
  },[credits, monetaryBase,governmentDebt, moneyStock]);
  // 民間債務+純資産(名目勘定)
  const citizenLiabilities:Assets = useMemo(()=>{
    return [
      {name:"※純資産", amount:governmentDebt, colorString: "lightgray"},
      {name:"借入金", amount:moneyStock - governmentDebt, colorString:"orange"},
    ];
  },[credits, monetaryBase,governmentDebt, moneyStock])
  
  // 銀行資産
  const bankAssets:Assets = useMemo(()=>{
    return [
      // TODO 計算実装
      {name:"当預", amount:monetaryBase - credits, colorString:"deepskyblue"},
      {name:"国債", amount:governmentDebt - monetaryBase, colorString:"violet"},
      {name:"貸付金", amount:moneyStock - governmentDebt, colorString:"orange"},
    ];
  },[credits, monetaryBase,governmentDebt, moneyStock]);
  const bankLiabilities:Assets = useMemo(()=>{
    return [
      {name:"預金", amount:moneyStock - credits, colorString:"palegreen"},
    ];
  },[credits, monetaryBase,governmentDebt, moneyStock]);

  // 中央銀行資産
  const centralbankAssets:Assets = useMemo(()=>{
    return [
      // TODO 計算実装
      {name:"国債", amount:monetaryBase, colorString:"violet"},
    ];
  },[credits, monetaryBase,governmentDebt, moneyStock]);

  // 中央銀行負債
  const centralbankLiabilities:Assets = useMemo(()=>{
    return [
      // TODO 計算実装
      {name:"現金", amount:credits, colorString:"gold"},
      {name:"当預", amount:monetaryBase-credits, colorString:"deepskyblue"},
    ];
  },[credits, monetaryBase,governmentDebt, moneyStock]);

  // 政府純負債(名目勘定項目)
  const governmentAssets:Assets = useMemo(()=>{
    return [
      {name:"※純負債", amount:governmentDebt, colorString:"lightgray"},
    ]
  },[credits, monetaryBase,governmentDebt, moneyStock]);

  // 政府負債
  const governmentLiabilities:Assets = useMemo(()=>{
    return [
      {name:"国債", amount:governmentDebt, colorString:"violet"},
    ]
  },[credits, monetaryBase,governmentDebt, moneyStock]);
  
  return (
    <g>
      <g transform={`translate(${0},${0})`}>
        <AssetBalanceComponent assets={citizenAssets} assetWidth={assetWidth} liabilities={citizenLiabilities} personName={"民間"} labelSize={labelSize} locateOffset={0}/>
      </g>
      <g transform={`translate(${assetWidth*2+mergin},${0})`}>
        <AssetBalanceComponent assets={bankAssets} assetWidth={assetWidth} liabilities={bankLiabilities} personName={"銀行"} labelSize={labelSize} locateOffset={credits}/>
      </g>
      <g transform={`translate(${(assetWidth*2+mergin)*2},${0})`}>
        <AssetBalanceComponent assets={centralbankAssets} assetWidth={assetWidth} liabilities={centralbankLiabilities} personName={"中央銀行"} labelSize={labelSize} locateOffset={0}/>
      </g>
      <g transform={`translate(${(assetWidth*2+mergin)*3},${0})`}>
        <AssetBalanceComponent assets={governmentAssets} assetWidth={assetWidth} liabilities={governmentLiabilities} personName={"政府"} labelSize={labelSize} locateOffset={0}/>
      </g>
    </g>
  );
};