const season = 2021;

function getStandingsByLeagueIDAndSeason(leagueID, season) {
    fetch("https://api-football-v1.p.rapidapi.com/v3/standings?season=" + season + "&league=" + leagueID, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": x_rapidapi_host,
            "x-rapidapi-key": x_rapidapi_key
        }
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            var standings = data.response[0].league.standings[0];

            renderStandings(standings);
        })
        .catch(err => {
            console.error(err);
        });
}

function getPlayerByTeamAndTeamID(teamID, season) {

}