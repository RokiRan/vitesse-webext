<script lang="ts" setup>
const configPath = {
  base: {
    path: '#sports > div > div > div.Container_routetView__2Rkdw > div > div:nth-child(2) > div', // 必须是仅靠联赛的那一层div
    begin: 0,
  },
  league: {
    path: '#sports > div > div > div.Container_routetView__2Rkdw > div > div:nth-child(2) > div > div:nth-child(%league%)',
    begin: 1,
    name: '#sports > div > div > div.Container_routetView__2Rkdw > div > div:nth-child(2) > div > div:nth-child(%league%) > div > div.LeagueHeaderCollapse_league-header__-b9m8 > div.LeagueHeaderCollapse_text__1TKS3',
  },
  match: {
    path: '#sports > div > div > div.Container_routetView__2Rkdw > div > div:nth-child(2) > div > div:nth-child(%league%) > div > div:nth-child(2)', // 最靠近比赛的div
    time: '#sports > div > div > div.Container_routetView__2Rkdw > div > div:nth-child(2) > div > div:nth-child(%league%) > div > div:nth-child(2) > div:nth-child(%match%) > div > div.Row_wrapper__bOn8n.header > div.Column_wrapper__9z8O4.Row_column__23hTl.Row_first-column__H2IKA > div.Column_wrapper__9z8O4.Football_flexible-topic__5Msz5 > div.PeriodTime_time__rntWc > span',
    scoreHome: '#sports > div > div > div.Container_routetView__2Rkdw > div > div:nth-child(2) > div > div:nth-child(%league%) > div > div:nth-child(2) > div:nth-child(%match%) > div > div:nth-child(2) > div > div.Column_wrapper__9z8O4.Row_column__23hTl.Row_first-column__H2IKA.Football_simple-market-box__28y8f > div > div:nth-child(1) > div > div.Column_wrapper__9z8O4.Row_column__23hTl.Row_first-column__H2IKA.Football_match__2TPjE.Football_flexible-topic__5Msz5 > div.Football_score__3vSBL',
    scoreAway: '#sports > div > div > div.Container_routetView__2Rkdw > div > div:nth-child(2) > div > div:nth-child(%league%) > div > div:nth-child(2) > div:nth-child(%match%) > div > div:nth-child(2) > div > div.Column_wrapper__9z8O4.Row_column__23hTl.Row_first-column__H2IKA.Football_simple-market-box__28y8f > div > div:nth-child(2) > div > div.Column_wrapper__9z8O4.Row_column__23hTl.Row_first-column__H2IKA.Football_match__2TPjE.Football_flexible-topic__5Msz5 > div.Football_score__3vSBL',
    home: '#sports > div > div > div.Container_routetView__2Rkdw > div > div:nth-child(2) > div > div:nth-child(%league%) > div > div:nth-child(2) > div:nth-child(%match%) > div > div.Row_wrapper__bOn8n.Row_has-row__MWJ1U.Football_row-content__1fMCW > div > div.Column_wrapper__9z8O4.Row_column__23hTl.Row_first-column__H2IKA.Football_simple-market-box__28y8f > div > div:nth-child(1) > div > div.Column_wrapper__9z8O4.Row_column__23hTl.Row_first-column__H2IKA.Football_match__2TPjE.Football_flexible-topic__5Msz5 > div',
    away: '#sports > div > div > div.Container_routetView__2Rkdw > div > div:nth-child(2) > div > div:nth-child(%league%) > div > div:nth-child(2) > div:nth-child(%match%)) > div > div.Row_wrapper__bOn8n.Row_has-row__MWJ1U.Football_row-content__1fMCW > div > div.Column_wrapper__9z8O4.Row_column__23hTl.Row_first-column__H2IKA.Football_simple-market-box__28y8f > div > div:nth-child(2) > div > div.Column_wrapper__9z8O4.Row_column__23hTl.Row_first-column__H2IKA.Football_match__2TPjE.Football_flexible-topic__5Msz5 > div',
    begin: 1,
  },
  OuH1Pk: {
    path: '#sports > div > div > div.Container_routetView__2Rkdw > div > div:nth-child(2) > div > div:nth-child(%league%) > div > div:nth-child(2) > div:nth-child(%match%) > div > div:nth-child(2) > div > div.Column_wrapper__9z8O4.Row_column__23hTl.Row_first-column__H2IKA.Football_simple-market-box__28y8f > div > div:nth-child(1) > div > div.Column_wrapper__9z8O4.Row_column__23hTl.Row_last-column__7Ff7G.Football_odds-block-container__1h32s > div:nth-child(3) > div > div > div.title',
    begin: 1,
  },
  OuH1O: {
    path: '#sports > div > div > div.Container_routetView__2Rkdw > div > div:nth-child(2) > div > div:nth-child(%league%) > div > div:nth-child(2) > div:nth-child(%match%) > div > div:nth-child(2) > div > div.Column_wrapper__9z8O4.Row_column__23hTl.Row_first-column__H2IKA.Football_simple-market-box__28y8f > div > div:nth-child(1) > div > div.Column_wrapper__9z8O4.Row_column__23hTl.Row_last-column__7Ff7G.Football_odds-block-container__1h32s > div:nth-child(3) > div > div > div.odds',
    begin: 1,
  },
  OuH1U: {
    path: '#sports > div > div > div.Container_routetView__2Rkdw > div > div:nth-child(2) > div > div:nth-child(%league%) > div > div:nth-child(2) > div:nth-child(%match%) > div > div:nth-child(2) > div > div.Column_wrapper__9z8O4.Row_column__23hTl.Row_first-column__H2IKA.Football_simple-market-box__28y8f > div > div:nth-child(2) > div > div.Column_wrapper__9z8O4.Row_column__23hTl.Row_last-column__7Ff7G.Football_odds-block-container__1h32s > div:nth-child(3) > div > div > div.odds',
    begin: 1,
    test: '#root > div > div.header_wrapper__2-BX8.header_no-print__2MB8p > div.header_menu-container__16ICC > div > div.TimeDropdown_timeDropdown__WyKgH > div > div:nth-child(1) > div > div.TimeDropdown_arrow__3Tfyw',
  },
}
const oddScript = ref('')
const calc = () => {
  const leagueNameScript = configPath.league.name.slice(configPath.league.path.length + 3)
  const matchContainerScript = configPath.match.path.slice(configPath.league.path.length + 3)
  const matchHomeNameScript = configPath.match.home.slice(configPath.match.path.length + 28)
  const matchAwayNameScript = configPath.match.away.slice(configPath.match.path.length + 29)
  const script = `
  let matches = {};
  let allLeagues = document.querySelector("${configPath.base.path}"); 
  if(allLeagues.hasChildNodes()) {
    for(let leagueIndex = 0; leagueIndex < allLeagues.childNodes.length; leagueIndex++){
      let leagueName = allLeagues.children[leagueIndex].querySelector("${leagueNameScript}").innerText;
      if(!leagueName) continue;
      matches[leagueName]=[];
      let allMatches = allLeagues.children[leagueIndex].querySelector("${matchContainerScript}");
      console.log('比赛：',allMatches)
      if(allMatches.hasChildNodes()){
        for(let matchIndex = 0; matchIndex < allMatches.childNodes.length; matchIndex++){
          let home = allMatches.children[matchIndex].querySelector("${matchHomeNameScript}").innerText;
          let away = allMatches.children[matchIndex].querySelector("${matchAwayNameScript}").innerText;
          matches[leagueName].push({
            dz: home + '-vs-' + away
          })
        }
      }
    }
  }
  console.log(matches);
  `
  oddScript.value = script
}
</script>

<template>
  <div>
    <div>设置页面</div>
    <ul>
      <li v-for="(item,key) in configPath" :key="key">
        <div class="flex">
          <div class="px-2 py-1 mt-2 min-w-16 text-left">
            {{ key }}:
          </div>
          <input v-model="item.path" type="text" class="flex-1 border dark:bg-transparent border-gray-400 rounded px-2 py-1 mt-2">
        </div>
      </li>
    </ul>
    <textarea v-model="oddScript" class="dark:bg-transparent border w-[calc(100%-1rem)] h-150" />
    <button class="w-20 h-10 border-light-50 bg-dark-50 border-r-amber-50" @click="calc">
      计算
    </button>
  </div>
</template>
