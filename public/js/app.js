"use strict";

(function() {
  angular
  .module('bucketList', [
    "ui.router"
  ])
  .config(Router)
  .controller("listsIndexController", listsIndexCtrl)
  .controller("listsShowController", listsShowCtrl)

  Router.$inject = ["$stateProvider", "$locationProvider", "$urlRouterProvider"];
  function Router($stateProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("listsIndex", {
      url: "/",
      templateUrl: "/assets/html/lists-index.html",
      controller: "listsIndexController",
      controllerAs: "lIndexVM"
    })
    .state("listsShow", {
      url: "/lists/:title",
      templateUrl: "/assets/html/lists-show.html",
      controller: "listsShowController",
      controllerAs: "lShowVM"
    });
    $urlRouterProvider.otherwise("/");
  }

  function listsIndexCtrl() {
    var vm = this;
    vm.lists = [
      {"title": "Project X"},
      {"title": "Trip Around The World!"},
      {"title": "Wombats in the Wild!"}
    ];
  }

  listsShowCtrl.$inject = ["$stateParams"];
  function listsShowCtrl($stateParams) {
    var vm = this;
    vm.list = $stateParams;
  }
})();
