
module.exports = (app) => {

    class GbShowDetailsCtrl {

        constructor($scope, GbShowsService) {
            this.$scope = $scope;
            this.GbShowsService = GbShowsService;
        }

        $onInit() {
            this.$scope.$watch(_ => this.GbShowsService.show, (show) => this.show = show);
            this.$routerOnActivate = (next, previous) => {
                this.id = next.params.id;
                this.GbShowsService.getShowDetail(this.id);
            };
            this.$routerOnDeactivate = () => {
                this.GbShowsService.resetShow();
            };
        }

    }
    GbShowDetailsCtrl.$inject = ["$scope", "GbShowsService"];

    let gbShowDetails = {
        template: require('./gb-show-details.html'),
        $canActivate: () => true,
        controller: GbShowDetailsCtrl,
        controllerAs: 'vm'

    };

    app.component('gbShowDetails', gbShowDetails);

};