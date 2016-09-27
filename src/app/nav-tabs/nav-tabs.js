module.exports = (app) => {


    class NavTabsCtrl {

        constructor() {
        }

        $onInit() {
        }

    }

    let navTabs = {
        template: require('./nav-tabs.html'),
        controllerAs: 'vm',
        controller: NavTabsCtrl
    };



    app.component('navTabs', navTabs);

};