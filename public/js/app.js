"use strict";

(function() {
  angular
  .module('bucketList', [
    "ui.router",
    "ngResource"
  ])
  .config(Router)
  .factory("List", listFactory)
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

  listFactory.$inject = ["$resource"];
  function listFactory($resource) {
    var List = $resource("/api/lists");
    return List;
  }

  listsIndexCtrl.$inject = ["List"];
  function listsIndexCtrl(List) {
    var vm = this;
    vm.lists = List.query();
    vm.create = function () {
      List.save(vm.newList, function (response) {
        vm.lists.push(response);
      })
    }
  }

  listsShowCtrl.$inject = ["$stateParams"];
  function listsShowCtrl($stateParams) {
    var vm = this;
    vm.list = $stateParams;
  }
})();
