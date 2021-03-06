// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery.turbolinks
//= require jquery_ujs
//= require materialize-sprockets
//= require angular
//= require angular-animate
//= require angular-resource
// Bower packages
//= require angular-sanitize/angular-sanitize
//= require angular-timeago/dist/angular-timeago
//= require ckeditor/init
//= require spectrum/spectrum
//= require ng-sortable/dist/ng-sortable
//= require highcharts/highcharts
//= require highcharts/modules/exporting
//= require highcharts-ng/dist/highcharts-ng
//= require ng-infinite-scroller-origin/build/ng-infinite-scroll
//= require turbolinks
//= require_tree .
//
$(document).on('page:fetch', function() {
  $(".progress").show();
});
$(document).on('page:change', function() {
  $(".progress").hide();
});