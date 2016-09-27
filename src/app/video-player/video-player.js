module.exports = (app) => {

    class VideoPlayerCtrl {

        constructor($uibModalInstance, url, title) {
            this.$uibModalInstance = $uibModalInstance;
            this.url = url;
            this.title = title;
        }

        $onInit() {
        }

        close() {
            this.$uibModalInstance.dismiss('cancel');
        }

    }
    VideoPlayerCtrl.$inject = ["$uibModalInstance", "url", "title"];


    class VideoPlayerFactory {

        constructor($uibModal) {
            this.$uibModal = $uibModal;
        }


        launchVideo(url, title) {
            return this.$uibModal.open({
                animation: true,
                template: require('./video-player.html'),
                controller: VideoPlayerCtrl,
                controllerAs: 'vm',
                size: "lg",
                resolve: {
                    url: () => url,
                    title: () => title

                }
            });
        }

    }

    let factory = ($uibModal) => {
        return new VideoPlayerFactory($uibModal);
    };
    factory.$inject = ["$uibModal"];

    app.factory("VideoPlayerFactory", factory);

};