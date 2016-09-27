
module.exports = (app) => {

    class GbShowsFilterCtrl {

        constructor($scope, GbShowsService, CHANNELS) {
            this.$scope = $scope;
            this.GbShowsService = GbShowsService;
            this.CHANNELS = CHANNELS;
        }

        $onInit() {
            if(this.GbShowsService.searchText) {
                this.activeTab = 1;
            }
        }


        selectChannel() {
            this.GbShowsService.resetShows();
            this.GbShowsService.searchText = null;
            this.GbShowsService.getShows();
        }

        search() {
            if(!this.GbShowsService.searchText)
                return;
            this.GbShowsService.resetShows();
            this.GbShowsService.selectedChannel = this.CHANNELS.none;
            this.GbShowsService.searchShows();
        }


    }
    GbShowsFilterCtrl.$inject = ["$scope", "GbShowsService", "CHANNELS"];

    let gbShowsFilter = {
        template: require('./gb-shows-filter.html'),
        controller: GbShowsFilterCtrl,
        controllerAs: 'vm'
    };



    app.component('gbShowsFilter', gbShowsFilter);

};