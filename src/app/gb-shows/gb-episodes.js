
module.exports = (app) => {

    class GbEpisodesCtrl {

        constructor($scope, $window, GbEpisodesService) {
            this.$scope = $scope;
            this.$window = $window;
            this.GbEpisodesService = GbEpisodesService;
        }

        $onInit() {

            this._totalSeasons = 0;
            this._currentSeason = 0;

            this.GbEpisodesService.resetEpisodesAndSeasons();

            this.$scope.$watch(_ => this.GbEpisodesService.episodes, (episodes) => this.episodes = episodes);
            this.$scope.$watch(_ => this.GbEpisodesService.seasons, (seasons) => this._totalSeasons = seasons);
            this.$scope.$watch(_ => this.GbEpisodesService.currentSeason, (season) => this._currentSeason = season);

            this.getSeasons();

        }

        get totalSeasons() {
            let arr = [];
            for(let i = this._totalSeasons; i > 0; i--) {
                arr.push(i);
            }
            return arr;
        }

        get currentSeason() {
            return this._currentSeason;
        }

        getEpisodes() {
            this.GbEpisodesService.getEpisodes(this.id);
        }

        getSeasons() {
            this.GbEpisodesService.getSeasons(this.id);
        }

        changeSeason(season) {
            if(season == this._currentSeason)
                return;
            this.GbEpisodesService.resetEpisodes();
            this.GbEpisodesService.currentSeason = season;
            this.getEpisodes();
        }


    }
    GbEpisodesCtrl.$inject = ["$scope", "$window", "GbEpisodesService"];

    let gbEpisodes = {
        template: require('./gb-episodes.html'),
        controller: GbEpisodesCtrl,
        controllerAs: 'vm',
        bindings: {
            id: "<"
        }

    };

    app.component('gbEpisodes', gbEpisodes);

};