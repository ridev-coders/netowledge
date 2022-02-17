const getStormWinPoints = (thunder_player, storm_player) => {
    //create object with K-Factor(without it defaults to 32)
    var EloRank = require('elo-rank');
    var elo = new EloRank(15);
    
    //Gets expected score for first parameter
    var expectedScoreStorm = elo.getExpected(storm_player, thunder_player);
    // var expectedScoreB = elo.getExpected(playerB, playerA);
    
    //update score, 1 if won 0 if lost
    storm_player_updated_score = elo.updateRating(expectedScoreStorm, 1, storm_player);
    points = storm_player_updated_score - storm_player
    return points

}

module.exports = {getStormWinPoints}