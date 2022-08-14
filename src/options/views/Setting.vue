<script lang="ts" setup>
const configPath = {
  base: {
    path: '//*[@id="sports"]/div/div/div[2]/div/div[2]/div', // 必须是仅靠联赛的那一层div
    begin: 0,
  },
  league: {
    path: '//*[@id="sports"]/div/div/div[2]/div/div[2]/div/div[lsNum]',
    begin: 1,
    name: '//*[@id="sports"]/div/div/div[2]/div/div[2]/div/div[lsNum]/div/div[1]/div[1]',
  },
  match: {
    path: '//*[@id="sports"]/div/div/div[2]/div/div[2]/div/div[lsNum]/div/div[2]', // 最靠近比赛的div
    time: '//*[@id="sports"]/div/div/div[2]/div/div[2]/div/div[lsNum]/div/div[2]/div[matNum]/div/div[1]/div[1]/div[1]/div[2]',
    scoreHome: '//*[@id="sports"]/div/div/div[2]/div/div[2]/div/div[lsNum]/div/div[2]/div[matNum]/div/div[2]/div/div[1]/div/div[1]/div/div[1]/div',
    scoreAway: '//*[@id="sports"]/div/div/div[2]/div/div[2]/div/div[lsNum]/div/div[2]/div[matNum]/div/div[2]/div/div[1]/div/div[2]/div/div[1]/div',
    home: '//*[@id="sports"]/div/div/div[2]/div/div[2]/div/div[lsNum]/div/div[2]/div[matNum]/div/div[2]/div/div[1]/div/div[1]/div/div[1]/text()',
    away: '//*[@id="sports"]/div/div/div[2]/div/div[2]/div/div[lsNum]/div/div[2]/div[matNum]/div/div[2]/div/div[1]/div/div[2]/div/div[1]/text()',
    begin: 1,
  },
  OuH1Pk: {
    path: '#sports > div > div > div.Container_routetView__2Rkdw > div > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(2) > div > div.Column_wrapper__9z8O4.Row_column__23hTl.Row_first-column__H2IKA.Football_simple-market-box__28y8f > div > div:nth-child(1) > div > div.Column_wrapper__9z8O4.Row_column__23hTl.Row_last-column__7Ff7G.Football_odds-block-container__1h32s > div:nth-child(3) > div > div > div.title',
    begin: 1,
  },
  OuH1O: {
    path: '#sports > div > div > div.Container_routetView__2Rkdw > div > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(2) > div > div.Column_wrapper__9z8O4.Row_column__23hTl.Row_first-column__H2IKA.Football_simple-market-box__28y8f > div > div:nth-child(1) > div > div.Column_wrapper__9z8O4.Row_column__23hTl.Row_last-column__7Ff7G.Football_odds-block-container__1h32s > div:nth-child(3) > div > div > div.odds',
    begin: 1,
  },
  OuH1U: {
    path: '#sports > div > div > div.Container_routetView__2Rkdw > div > div:nth-child(2) > div > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(2) > div > div.Column_wrapper__9z8O4.Row_column__23hTl.Row_first-column__H2IKA.Football_simple-market-box__28y8f > div > div:nth-child(2) > div > div.Column_wrapper__9z8O4.Row_column__23hTl.Row_last-column__7Ff7G.Football_odds-block-container__1h32s > div:nth-child(3) > div > div > div.odds',
    begin: 1,
    test: '#root > div > div.header_wrapper__2-BX8.header_no-print__2MB8p > div.header_menu-container__16ICC > div > div.TimeDropdown_timeDropdown__WyKgH > div > div:nth-child(1) > div > div.TimeDropdown_arrow__3Tfyw',
  },
}
const oddScript = ref('')
const getRealPath = (long: string, short: string) => long.slice(short.length + 3)
const calc = () => {
  const leagueNameScript = getRealPath(configPath.league.name, configPath.league.path)
  const matchContainerScript = configPath.match.path
  const matchHomeNameScript = configPath.match.home
  const matchAwayNameScript = configPath.match.away
  const script = `
  function doXpath(x) {
    return document.evaluate(x, document.documentElement, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue || {}
  }
  const main = '//*[@id="sports"]/div/div/div[2]/div/div[2]/div'; // 最外层
  const leag = '//*[@id="sports"]/div/div/div[2]/div/div[2]/div/div[lsNum]/div/div[1]/div[1]'; // 联赛名
  const matc = '//*[@id="sports"]/div/div/div[2]/div/div[2]/div/div[lsNum]/div/div[2]' // 比赛最外层
  const zhuu = '//*[@id="sports"]/div/div/div[2]/div/div[2]/div/div[lsNum]/div/div[2]/div[matNum]/div/div[2]/div/div[1]/div/div[1]/div/div[1]/text()'
  const keeu = '//*[@id="sports"]/div/div/div[2]/div/div[2]/div/div[lsNum]/div/div[2]/div[matNum]/div/div[2]/div/div[1]/div/div[2]/div/div[1]/text()'
  const zhus = '//*[@id="sports"]/div/div/div[2]/div/div[2]/div/div[lsNum]/div/div[2]/div[matNum]/div/div[2]/div/div[1]/div/div[1]/div/div[1]/div'
  const kees = '//*[@id="sports"]/div/div/div[2]/div/div[2]/div/div[lsNum]/div/div[2]/div[matNum]/div/div[2]/div/div[1]/div/div[2]/div/div[1]/div'
  const time = '//*[@id="sports"]/div/div/div[2]/div/div[2]/div/div[lsNum]/div/div[2]/div[matNum]/div/div[1]/div[1]/div[1]/div[2]'
  // 全场盘口
  const pana = '//*[@id="sports"]/div/div/div[2]/div/div[2]/div/div[lsNum]/div/div[2]/div[matNum]/div/div[2]/div/div[1]/div/div[1]/div/div[2]/div[2]/div/div/div[1]'
  const paod = '//*[@id="sports"]/div/div/div[2]/div/div[2]/div/div[lsNum]/div/div[2]/div[matNum]/div/div[2]/div/div[1]/div/div[1]/div/div[2]/div[2]/div/div/div[2]'
  const paox = '//*[@id="sports"]/div/div/div[2]/div/div[2]/div/div[lsNum]/div/div[2]/div[matNum]/div/div[2]/div/div[1]/div/div[2]/div/div[2]/div[2]/div/div/div[2]'
  // 上半场盘口
  const phna = '//*[@id="sports"]/div/div/div[2]/div/div[2]/div/div[lsNum]/div/div[2]/div[matNum]/div/div[2]/div/div[1]/div/div[1]/div/div[3]/div[2]/div/div/div[1]'
  const phod = '//*[@id="sports"]/div/div/div[2]/div/div[2]/div/div[lsNum]/div/div[2]/div[matNum]/div/div[2]/div/div[1]/div/div[1]/div/div[3]/div[2]/div/div/div[2]'
  const phox = '//*[@id="sports"]/div/div/div[2]/div/div[2]/div/div[lsNum]/div/div[2]/div[matNum]/div/div[2]/div/div[1]/div/div[2]/div/div[3]/div[2]/div/div/div[2]'
  let obj = {}
  let allLea = doXpath(main).childNodes || []
  for (let ls = 0; ls < allLea.length; ls++) {
    //这里循环联赛
    let leagueStr = leag.replace(/lsNum/g, ls + 1);
    let lsObj = doXpath(leagueStr)
    if (!lsObj) return
    obj[lsObj.innerText] = {
      lsName: lsObj.innerText,
      matches: {

      }
    }
    const allMatch = doXpath(matc.replace(/lsNum/g, ls + 1)).childNodes
    // console.log('当前联赛比赛场数,', allMatch.length)
    for (let m = 0; m < allMatch.length; m++) {
      let zhuStr = doXpath(zhuu.replace(/lsNum/g, ls + 1).replace(/matNum/g, m + 1))
      let keStr = doXpath(keeu.replace(/lsNum/g, ls + 1).replace(/matNum/g, m + 1))
      let zhusStr = doXpath(zhus.replace(/lsNum/g, ls + 1).replace(/matNum/g, m + 1))
      let keusStr = doXpath(kees.replace(/lsNum/g, ls + 1).replace(/matNum/g, m + 1))
      let timeStr = doXpath(time.replace(/lsNum/g, ls + 1).replace(/matNum/g, m + 1))

      let qcpk = doXpath(pana.replace(/lsNum/g, ls + 1).replace(/matNum/g, m + 1))
      let qcod = doXpath(paod.replace(/lsNum/g, ls + 1).replace(/matNum/g, m + 1))
      let qcox = doXpath(paox.replace(/lsNum/g, ls + 1).replace(/matNum/g, m + 1))
      const dz = zhuStr.data + ' -vs- ' + keStr.data
      const mBf = zhusStr.innerText + '-' + keusStr.innerText
      if (!qcpk.innerText) continue
      let pkd = qcpk.innerText.replace(/大 /g, '')
      if (pkd.indexOf('/') >= 0) {
        pkd = '(' + eval(pkd.replace(/\//g, "+")) / 2 + ')';
      } else {
        pkd = '(' + pkd + ')';
      }
      if (!zhuStr.data || !zhusStr.innerText) continue
      obj[lsObj.innerText].matches[dz] = {
        mDuizhen: dz,
        mTime: timeStr.innerText,
        mBf: mBf,
        '全场大/小': {},
        '上半场大/小': {}
      }
      obj[lsObj.innerText].matches[dz]['全场大/小'][pkd] =
      {
        pk: pkd,
        odd_D: parseFloat(qcod.innerText),
        odd_X: parseFloat(qcox.innerText),
        odd_D_Selecter: paod.replace(/lsNum/g, ls + 1).replace(/matNum/g, m + 1),
        odd_X_Selecter: paox.replace(/lsNum/g, ls + 1).replace(/matNum/g, m + 1)
      }
      let bcpk = doXpath(phna.replace(/lsNum/g, ls + 1).replace(/matNum/g, m + 1))
      if (!bcpk.innerText) continue
      let pkx = bcpk.innerText.replace(/大 /g, '')
      if (pkx.indexOf('/') >= 0) {
        pkx = '(' + eval(pkx.replace(/\//g, "+")) / 2 + ')';
      } else {
        pkx = '(' + pkx + ')';
      }
      obj[lsObj.innerText].matches[dz]['上半场大/小'][pkx] = {
        pk: pkx,
        odd_D: parseFloat(doXpath(phod.replace(/lsNum/g, ls + 1).replace(/matNum/g, m + 1)).innerText),
        odd_X: parseFloat(doXpath(phox.replace(/lsNum/g, ls + 1).replace(/matNum/g, m + 1)).innerText),
        odd_D_Selecter: phod.replace(/lsNum/g, ls + 1).replace(/matNum/g, m + 1),
        odd_X_Selecter: phox.replace(/lsNum/g, ls + 1).replace(/matNum/g, m + 1)
      }
    }
  }
  `
  oddScript.value = script
}
</script>

<template>
  <div>
    <div>设置页面</div>
    <ul>
      <li v-for="(item, key) in configPath" :key="key">
        <div class="flex">
          <div class="px-2 py-1 mt-2 min-w-16 text-left">
            {{ key }}:
          </div>
          <input v-model="item.path" type="text"
            class="flex-1 border dark:bg-transparent border-gray-400 rounded px-2 py-1 mt-2">
        </div>
      </li>
    </ul>
    <textarea v-model="oddScript" class="dark:bg-transparent border w-[calc(100%-1rem)] h-150" />
    <button class="w-20 h-10 border-light-50 bg-dark-50 border-r-amber-50" @click="calc">
      计算
    </button>
  </div>
</template>
