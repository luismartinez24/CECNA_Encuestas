var SEEM = angular.module('SEEM',['Controller','Constants','Factories','ToDoService','ngResource','ngSanitize','yaru22.angular-timeago','as.sortable']);
SEEM.config(function (timeAgoSettings) {
timeAgoSettings.overrideLang = 'es_LA';
})