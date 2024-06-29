import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BalancesWithAnnotationComponent} from './components/BalancesWithAnnotationComponent';
import { DocumentComponent } from './components/DocumentComponent';
import { downloadSvgElement } from './lib/SvgDownloader';

type MoneyStat = {credits:number,monetaryBase:number, netWorth:number, moneyStock:number}


const App: React.FC = () => {
  const [stat, setStat] = useState<MoneyStat>({credits:100,monetaryBase:200,netWorth:300,moneyStock:400});
  const dx = 10;
  const depositCredit = useCallback(()=>{
    let newCredits = stat.credits - dx;
    if (newCredits < 0) {
      alert("もう全部預けました。");
    } else {
      setStat({...stat, credits:newCredits});
    }
  },[stat]);
  const withdrawCredit = useCallback(()=>{
    let newCredits = stat.credits + dx;
    if (newCredits > stat.monetaryBase) {
      alert("銀行が流動性危機です。");
    } else {
      setStat({...stat, credits:newCredits});
    }
  },[stat]);
  const createLoan = useCallback(()=>{
    setStat({...stat, moneyStock:stat.moneyStock+dx});
  },[stat]);
  const repayLoan = useCallback(()=>{
    let newMoneyStock = stat.moneyStock - dx;
    if (newMoneyStock < stat.netWorth) {
      alert("もう完済しました。");
    } else {
      setStat({...stat, moneyStock:newMoneyStock});
    }
  },[stat]);
  const buyOperationNoAlert = useCallback(()=>{
    let newMonetaryBase = stat.monetaryBase + dx;
    if (newMonetaryBase > stat.netWorth) {
      return false;
    } else {
      setStat({...stat, monetaryBase:newMonetaryBase});
      return true;
    }
  },[stat]);
  const buyOperation = useCallback(()=>{
    let newMonetaryBase = stat.monetaryBase + dx;
    if (newMonetaryBase > stat.netWorth) {
      alert("市場に国債がありません。財政赤字を出してください。");
    } else {
      setStat({...stat, monetaryBase:newMonetaryBase});
    }
  },[stat]);
  const sellOperationNoAlert = useCallback(()=>{
    let newMonetaryBase = stat.monetaryBase - dx;
    if (newMonetaryBase < stat.credits) {
      return false;
    } else {
      setStat({...stat, monetaryBase:newMonetaryBase});
      return true;
    }
  },[stat]);
  const sellOperation = useCallback(()=>{
    let newMonetaryBase = stat.monetaryBase - dx;
    if (newMonetaryBase < stat.credits) {
      alert("買い手に当預がありません。");
    } else {
      setStat({...stat, monetaryBase:newMonetaryBase});
    }
  },[stat]);
  const fiscalExpend = useCallback(()=>{
    setStat({...stat, netWorth:stat.netWorth+dx,moneyStock:stat.moneyStock+dx});
  },[stat]);
  const fiscalIncome = useCallback(()=>{
    let newNetworth = stat.netWorth - dx;
    if (newNetworth < 0) {
      alert("民間経済が破綻しました。");
    } else {
      let newMoneyStock = stat.moneyStock - dx;
      let newMonetaryBase = stat.monetaryBase;
      let newCredits = stat.credits;
      if (newNetworth < stat.monetaryBase) {
        newMonetaryBase = newNetworth;
        if (newMonetaryBase < stat.credits) {
          newCredits = newMonetaryBase;
        }
      }
      setStat({credits:newCredits,monetaryBase:newMonetaryBase, netWorth:newNetworth, moneyStock:newMoneyStock});
    }
  },[stat]);
  const buttonSize = "120px";
  // 決済資金需要を当預/預金で単純化して表す
  const [accPerDep, setAccPerDep] = useState((stat.monetaryBase  - stat.credits)/(stat.moneyStock  - stat.credits));
  useEffect(()=>{
    if (!accState) { // アコモデーションしないときは市井を反映
      setAccPerDep((stat.monetaryBase - stat.credits)/(stat.moneyStock - stat.credits));
    }
  },[stat,setAccPerDep]);
  const onChangeRate = useCallback((value:number)=>{
    if (accState) {
      if (1-value >= (stat.netWorth - stat.credits)/(stat.moneyStock - stat.credits)) {
        return;
      }
      setAccPerDep(1-value);
    }
  },[stat]);
  const rate = useMemo(()=>{return 1-accPerDep},[accPerDep]);

  // アコモデーション有効化：
  const [accState,setAccState] = useState(true);
  const onChangeAccState = useCallback((b:boolean)=>{
    setAccState(b)
  },[accState,setAccState]);

  // アコモデーション
  useEffect(()=>{
    if (accState) {
      let deposit = stat.moneyStock - stat.credits;
      let account = stat.monetaryBase - stat.credits;
      let reserve = deposit * accPerDep;
      if (reserve - account > dx) {
        if(!buyOperationNoAlert()) {
          // 目標を達成できないのでアコモデーションを解除
          alert("市場に国債がありません。財政赤字を出してください。");
          setAccState(false);
        }
      }
      if (reserve - account < (-dx)) {
        if(!sellOperationNoAlert()) {
          // 目標を達成できないのでアコモデ－ションを解除
          alert("中央銀行に資産がありません。");
          setAccState(false);
        }
      }
    }
  },[stat,accState,accPerDep]);
  return (
    <div>
      <div>
        <h3>資産を変化させる</h3>
        <div>
          <span style={{ marginRight: '10px' }}>現金操作</span>
          <button onClick={withdrawCredit} style={{ marginRight: '5px',width: buttonSize}}>現金を引き出す</button>
          <button onClick={depositCredit} style={{ width: buttonSize }}>現金を預入れる</button>
        </div>
        <div>
          <span style={{ marginRight: '10px' }}>民間融資</span>
          <button onClick={createLoan} style={{ marginRight: '5px' ,width: buttonSize}}>融資を受ける</button>
          <button onClick={repayLoan} style={{ width: buttonSize }}>融資を返済する</button>
        </div>
        <div>
          <span style={{ marginRight: '10px' }}>中央銀行</span>
          <button onClick={buyOperation} disabled={accState} style={{ marginRight: '5px' ,width: buttonSize}}>買いオペする</button>
          <button onClick={sellOperation} disabled={accState} style={{ width: buttonSize }}>売りオペする</button>
        </div>
        <div>
          <span style={{ marginRight: '10px' }}>政府財政</span>
          <button onClick={fiscalExpend} style={{ marginRight: '5px',width: buttonSize}}>財政赤字</button>
          <button onClick={fiscalIncome} style={{ width: buttonSize }}>財政黒字</button>
        </div>
        <div>
          <span style={{ marginRight: '10px' }}>金融政策</span>
          <input
            type="checkbox"
            checked={accState}
            onChange={(e) => onChangeAccState(e.target.checked)}
          />
          <span className="checkbox-label">{ accState ? "アコモデーション有効" : "アコモデーション無効(手動オペ)"}<sup><a href="#footnote1" id="ref1">注1</a></sup></span>
        </div>
        <div>
          <span style={{ marginRight: '10px' }}>{ accState ? "政策金利" : "市中金利"}</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={rate}
            onChange={(v) => {onChangeRate(parseFloat(v.target.value))}}
            disabled={!accState}
            className="slider"
          />
          <sup><a href="#footnote2" id="ref2">注2</a></sup>
        </div>
      </div>
      <div>
        <h3>4部門バランスシート <button onClick={()=>{downloadSvgElement("balanceSvg")}}>SVGのダウンロード</button></h3> 
        <BalancesWithAnnotationComponent credits={stat.credits} monetaryBase={stat.monetaryBase} governmentDebt={stat.netWorth} moneyStock={stat.moneyStock} />
      </div>

      <DocumentComponent/>
    </div>

  );
};

export default App;

