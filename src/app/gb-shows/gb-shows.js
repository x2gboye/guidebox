
module.exports = (app) => {

    class GbShowsCtrl {

        constructor($scope, GbShowsService) {
            this.$scope = $scope;
            this.GbShowsService = GbShowsService;
        }

        $onInit() {
            this.$scope.$watch(_ => this.GbShowsService.busy, (busy) => this.busy = busy);
            this.$scope.$watch(_ => this.GbShowsService.shows, (shows) => this.shows = shows);
            //this.$routerOnDeactivate = () => {
                //this.GbShowsService.resetShows();
            //};
        }

        getShows() {
            this.GbShowsService.getShows();
        }

    }
    GbShowsCtrl.$inject = ["$scope", "GbShowsService"];

    let gbShows = {
        template: require('./gb-shows.html'),
        controller: GbShowsCtrl,
        controllerAs: 'vm'
    };



    app.component('gbShows', gbShows);

};