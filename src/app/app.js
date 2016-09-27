import angular from 'angular';
require('slick-carousel');
require('angular-slick-carousel');
require('angular-ui-bootstrap');
require('ngcomponentrouter');
require('ng-infinite-scroll');
require('lodash');

import '../style/theme.less';
import '../style/app.less';



const MODULE_NAME = 'app';
let app = angular.module(MODULE_NAME, ['ui.bootstrap', 'ngComponentRouter', 'infinite-scroll', 'slickCarousel']);
/*app.config(['$sceDelegateProvider', ($sceDelegateProvider) => {
   $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
      new RegExp('^(http[s]?):\/\/api-widget.guidebox\.com/.+$')
   ]);

}]);*/
//not a good idea
app.config(['$sceProvider', ($sceProvider) => {
   $sceProvider.enabled(false);
}]);
app.component(MODULE_NAME, {
   template: require('./app.html'),
   $routeConfig: [
      { path: "/shows", component: "gbShows", name: "Shows" },
      { path: "/show/:id", component: "gbShowDetails", name: "ShowDetails" },
      { path: "/movies", component: "gbMovies", name: "Movies" },
      { path: "/person/:id", component: "gbPerson", name: "PersonDetails" },
      { path: "/**", redirectTo: ["Shows"] }
   ]

});
require('./common')(app);
require('./nav-tabs')(app);
require('./gb-shows')(app);
require('./gb-movies')(app);
require('./gb-people')(app);
require('./video-player')(app);
export default MODULE_NAME;