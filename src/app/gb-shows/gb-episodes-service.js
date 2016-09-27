module.exports = (app) => {

    class GbEpisodesService {

        constructor($http, endpoint) {
            this.$http = $http;
            this.endpoint = endpoint;
            this.resetEpisodesAndSeasons();
        }


        get episodes() {
            return this._episodes;
        }

        get seasons() {
            return this._seasons;
        }

        get currentSeason() {
            return this._currentSeason;
        }

        set seasons(seasons) {
            this._seasons = seasons;
        }

        set currentSeason(season) {
            this._currentSeason = season;
        }

        resetEpisodes() {
            this._episodes = [];
        }

        resetSeasons() {
            this._seasons = null;
            this._currentSeason = "all";
        }

        resetEpisodesAndSeasons() {
            this.resetEpisodes();
            this.resetSeasons();
        }

        getSeasons(id) {
            if(this._seasons)
                return;
            this.$http.get(`${this.endpoint}show/${id}/episodes/all/0/1/all/all`)
                .then((response) => {
                    let season = _.head(response.data.results).season_number;
                    this._seasons = season;
                    this._currentSeason = season;
                    this.getEpisodes(id);
                }, (response) => {
                    console.error(response.data.error);
                });
        }

        getEpisodes(id) {
            this.$http.get(`${this.endpoint}show/${id}/episodes/${this._currentSeason}/0/100/all/all`)
                .then((response) => {
                    this._episodes = this._episodes.concat(response.data.results);
                }, (response) => {
                    console.error(response.data.error);
                });
        }



    }

    let factory = ($http, endpoint) => {
        return new GbEpisodesService($http, endpoint);
    };
    factory.$inject = ["$http", "endpoint"];

    app.factory("GbEpisodesService", factory);

};