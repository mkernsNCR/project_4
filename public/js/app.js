"use strict";

(function() {
  angular
  .module('bucketList', [
    "ui.router",
    "ngResource"
  ])
  .config(Router)
  .factory("List", listFactory)
  .factory("Entry", entryFactory)
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
    })
    $urlRouterProvider.otherwise("/");
  }

  listFactory.$inject = ["$resource"];
  function listFactory($resource) {
    var List = $resource("/api/lists/:title", {}, {
      update: {method: "PATCH"}
    });
    return List;
  }

  entryFactory.$inject = ["$resource"];
  function entryFactory($resource) {
    var Entry = $resource("/api/entries/:id");
    return Entry;
  }

  listsIndexCtrl.$inject = ["List"];
  function listsIndexCtrl(List) {
    var vm = this;
    vm.lists = List.query();
    vm.create = function () {
      List.save(vm.newList, function (response) {
        vm.lists.push(response);
      });
    }
  }

  listsShowCtrl.$inject = ["$stateParams", "List", "Entry", "$state"];
  function listsShowCtrl($stateParams, List, Entry, $state) {
    var vm = this;
    vm.list = List.get($stateParams);
    vm.newEntry = {};
    vm.addEntry = function () {
      // add this entry to list.entries,
      //  then save list
      // then show changes
      vm.list.entries.push(angular.copy(vm.newEntry));
      console.log("After adding entry:", vm.list)

      List.update($stateParams, vm.list, function (savedList) {
        console.log("savedList:", savedList)
        vm.newEntry = {}; // reset newEntry for form
        vm.list = savedList;
        console.log(savedList);
      })
    }
    vm.delete = function () {
      List.remove($stateParams, function () {
        $state.go("listsIndex");
      });
    }

    // My attempt at deleting an individual entry
    vm.deleteEntry = function(entry) {
      console.log("del Entry:", entry);
      console.log(entry._id);
      Entry.remove({id: entry._id}, function () {
        $state.reload("listsShow");
      });
    }

    vm.update = function () {
      List.update($stateParams, vm.list, function (updatedList) {
        $state.go("listsShow", updatedList);
      });
    }
  }
})();

console.log(angular);
