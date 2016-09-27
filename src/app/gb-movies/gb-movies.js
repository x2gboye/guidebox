
module.exports = (app) => {

    class GbMoviesCtrl {

        constructor($scope, GbMoviesService) {
            this.$scope = $scope;
            this.GbMoviesService = GbMoviesService;
        }

        $onInit() {
            this.$scope.$watch(_ => this.GbMoviesService.busy, (busy) => this.busy = busy);
            this.$scope.$watch(_ => this.GbMoviesService.movies, (movies) => this.movies = movies);
        }

        getMovies() {
            this.GbMoviesService.getMovies();
        }

        search() {
            if(!this.GbMoviesService.searchText)
                return;
            this.GbMoviesService.resetMovies();
            this.GbMoviesService.searchMovies();
        }

        clearSearch() {
            this.GbMoviesService.resetMovies();
            this.GbMoviesService.searchText = null;
            this.getMovies();
        }


    }
    GbMoviesCtrl.$inject = ["$scope", "GbMoviesService"];

    let gbMovies = {
        template: require('./gb-movies.html'),
        controller: GbMoviesCtrl,
        controllerAs: 'vm'
    };



    app.component('gbMovies', gbMovies);

};