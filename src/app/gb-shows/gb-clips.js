
module.exports = (app) => {

    class GbClipsCtrl {

        constructor($scope, $window, GbClipsService, VideoPlayerFactory) {
            this.$scope = $scope;
            this.$window = $window;
            this.GbClipsService = GbClipsService;
            this.VideoPlayerFactory = VideoPlayerFactory;
        }

        $onInit() {
            this.initSlick();
            this.GbClipsService.resetClips();
            this.$scope.$watch(_ => this.GbClipsService.clips, (clips) => {
                this.clips = clips;
                if(clips.length) {
                    this.clipsLoaded = true;
                }
            });
            this.$scope.$watch(_ => this.GbClipsService.total, (total) => this.total = total);
            this.getClips();
        }

        initSlick() {
            this.currentIndex = 0;
            this.slidesToShow = 5;
            this.slickConfig = {
                autoplay: false,
                infinite: false,
                speed: 300,
                slidesToShow: this.slidesToShow,
                slidesToScroll: this.slidesToShow,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ],
                event: {
                    afterChange: (event, slick, currentSlide, nextSlide) => {
                        this.currentIndex = currentSlide;
                        if(this.GbClipsService.index - this.currentIndex <= this.slidesToShow)
                            this.getClips();
                    },
                    init: (event, slick) => {
                        slick.slickGoTo(this.currentIndex, true);
                    }
                }
            };
        }

        getClips() {
            this.clipsLoaded = false;
            this.GbClipsService.getClips(this.id);
        }

        showClip(clip) {
            let url = null;
            let youtube = _.find(clip.free_web_sources, ['source', 'youtube']);
            let guidebox = _.find(clip.free_web_sources, ['source', 'guidebox']);
            if(youtube) {
                this.VideoPlayerFactory.launchVideo(`${youtube.embed}?autoplay=1`, clip.title);
            } else if (guidebox) {
                this.VideoPlayerFactory.launchVideo(`${guidebox.embed}&width=858&height=390&autostart=true`, clip.title);
            } else {
                let url = clip.free_web_sources[0].link;
                this.$window.open(url, '_blank');
            }
        }


    }
    GbClipsCtrl.$inject = ["$scope", "$window", "GbClipsService", "VideoPlayerFactory"];

    let gbClips = {
        template: require('./gb-clips.html'),
        controller: GbClipsCtrl,
        controllerAs: 'vm',
        bindings: {
            id: "<"
        }

    };

    app.component('gbClips', gbClips);

};