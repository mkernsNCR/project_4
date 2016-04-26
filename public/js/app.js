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
    var List = $resource("/api/lists/:title", {}, {
      update: {method: "PATCH"}
    });
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

  listsShowCtrl.$inject = ["$stateParams", "List", "$state"];
  function listsShowCtrl($stateParams, List, $state) {
    var vm = this;
    vm.list = List.get($stateParams);
    vm.delete = function () {
      List.remove($stateParams, function () {
        $state.go("listsIndex");
      });
    }
    vm.update = function () {
      List.update($stateParams, vm.list, function (response) {
        $state.go("listsShow", response);
      });
    }
  }
})();
