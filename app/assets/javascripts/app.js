var SEEM = angular.module('SEEM',['infinite-scroll','Controller','Constants','Factories','ToDoService','ngResource','ngSanitize','yaru22.angular-timeago','as.sortable','highcharts-ng']);
SEEM.config(function (timeAgoSettings) {
timeAgoSettings.overrideLang = 'es_LA';
})