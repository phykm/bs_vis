import React from "react";

export const DocumentComponent: React.FC<any> = ({})=> {
  return(<div>
    <p>※現実の準備率はもっと低い。</p>
    <p>※中央銀行のアコモデーションは、現在は国債金利orコール金利に目標金利を設定することで行われている。金利は資金決済需要/金融取引需要で日々変化しており、ここには直接現れない。中央銀行が受動的にオペをする様子のデモンストレーションとして準備率を目標にしただけであることに注意。</p>
    <p>この図式では次が仮定されている。</p>
    <ul>
        <li>民間と銀行のバランスシートはそれぞれ統合されている。</li>
        <li>中央銀行の収益は即座に報酬/給与/国庫納付に費やされる(中央銀行の金融純資産はゼロ)。</li>
        <li>銀行の収益は即座に報酬/給与/投資等に費やされる(銀行の金融純資産はゼロ)。</li>
        <li>銀行は待ち時間なしで中央銀行当座預金の預け入れと引き出しができる(現金預け金は全て当預)。</li>
        <li>政府の国庫は即座に償還か支出に利用されて滞留しない(国庫は常に空)。</li>
    </ul>
  </div>)
};