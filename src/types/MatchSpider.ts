interface SpiderRule {
    league: diffIndex,
    leagueName: string,
    match: diffIndex,
    matchName: homeAway,
    matchTime: string,
    matchScore: homeAway,
    odd: diffIndex,
    oddOu: {
        first: homeAway,
        second: homeAway,
    },
    event: string,
}
interface PlatformLayout {
    leagueNameFirst: string;
    leagueNameSecond: string;
    matchNameHomeFirst: string;
    matchNameAwayFirst: string;
    matchNameHomeSecond: string;
    matchScoreHome: string;
    matchScoreAway: string;
    matchTime: string;
    odd: {
        OU: {
            whole:homeAway,
            half: homeAway,
        }
    },
    oddIndex: string, // 第二行赔率的盘口
}
interface diffIndex{
    first: string,
    second: string,
}
interface homeAway {
    home: string,
    away: string,
    pk?: string,
}

export { SpiderRule, PlatformLayout };