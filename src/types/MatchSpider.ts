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
interface diffIndex{
    first: string,
    second: string,
}
interface homeAway {
    home: string,
    away: string,
}

export { SpiderRule };