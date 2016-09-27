
module.exports = (app) => {

    class GbPersonCtrl {

        constructor($scope, GbPeopleService) {
            this.$scope = $scope;
            this.GbPeopleService = GbPeopleService;
        }

        $onInit() {
            this.$scope.$watch(_ => this.GbPeopleService.person, (person) => this.person = person);
            this.$routerOnActivate = (next, previous) => {
                this.id = next.params.id;
                this.GbPeopleService.getPerson(this.id);
            };
            this.$routerOnDeactivate = () => {
                this.GbPeopleService.resetPerson();
            };
        }

    }
    GbPersonCtrl.$inject = ["$scope", "GbPeopleService"];

    let gbPerson = {
        template: require('./gb-person.html'),
        $canActivate: () => true,
        controller: GbPersonCtrl,
        controllerAs: 'vm'

    };

    app.component('gbPerson', gbPerson);

};