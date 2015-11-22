/*
 * This file is part of Invenio.
 * Copyright (C) 2015 CERN.
 *
 * Invenio is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 2 of the
 * License, or (at your option) any later version.
 *
 * Invenio is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Invenio; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place, Suite 330, Boston, MA 02111-1307, USA.
* In applying this license, CERN does not
* waive the privileges and immunities granted to it by virtue of its status
* as an Intergovernmental Organization or submit itself to any jurisdiction.
*/

(function (angular) {

  /**
   * @namespace InvenioSearch
   * @desc Create and make the request
   * @memberOf Controllers
   */
  function invenioSearchController(invenioSearchAPI) {

    this.invenioDoSearch = invenioDoSearch;
    this.invenioResults = [];
    this.invenioSearchError = false;
    this.invenioSearchLoading = false;
    this.invenioSearchQuery = '';

    // We don't have any logic on the controller until search initialized
    this.invenioSearchArgs = {
      url: '',
      method: 'GET',
      params: {
        page: 1,
        size: 10,
        q: '',
        index: '',
        doc_type: '',
      }
    };

    ////////////

    /**
     * @name invenioDoSearch
     * @desc Does the search query and handles the response
     * @param {String} query The search query
     * @memberOf Controllers.invenioSearchController
     */
    function invenioDoSearch(query) {

      var that = this;
      // enchance the query
      var q = {
        params: {
          q: query
        }
      };

      // Add the query to the request
      that.invenioSearchArgs = angular.merge(that.invenioSearchArgs, q);

      // Reset results
      that.invenioResults = [];
      that.invenioSearchError = false;
      that.invenioSearchLoading = true;
      invenioSearchAPI.search(this.invenioSearchArgs)
        .then(function(response) {
          that.invenioResults = response.data;
        }, function(error) {
          that.invenioSearchError = true;
          console.log(error);
        }).finally(function() {
          that.invenioSearchLoading = false;
        });
    }
  }

  // Inject the service
  invenioSearchController.$inject = ['invenioSearchAPI'];

  /**
   * @namespace InvenioSearchBar
   * @desc Create searchbox
   * @memberOf Directives
   */

  function invenioSearchBar() {

    return {
      replace: true,
      scope: {
        invenioSearchArgs: '=',
        invenioSearchDo: '&',
        invenioSearchQuery: '=',
        searchBarInputPlaceholder: '@',
        searchDoctype: '@',
        searchEndpoint: '@',
        searchExtraParams: '@',
        searchIndex: '@',
        searchPage: '@',
        searchSize: '@',
      },
      templateUrl: templateUrl,
      link: link
    };

    ////////////

    /**
     * @name templateUrl
     * @desc Returns the template for the searchbar
     * @memberOf Directives.invenioSearchBar
     */
    function templateUrl(element, attrs) {
      return attrs.searchBarTemplate;
    }

    /**
     * @name link
     * @desc Synchronizes the controller with the directive
     * @memberOf Controllers.invenioSearchBar
     */
    function link(scope, element, attrs) {
      var collectedArgs = {
        url: attrs.searchEndpoint,
        method: attrs.searchMethod,
        params: {
          page: attrs.searchPage || 1,
          size: attrs.searchSize || 20,
          index: attrs.searchIndex || 'demo',
          doc_type: attrs.searchDoctype,
        }
      };
      // Merge the controller's args
      scope.invenioSearchArgs =  angular.merge(scope.invenioSearchArgs, collectedArgs);

      var extraParams = {
        params: JSON.parse(attrs.searchExtraParams)
      };

      // Merge the controller's search arguments
      scope.invenioSearchArgs = angular.merge(scope.invenioSearchArgs, extraParams);
    }
  }

  /**
   * @namespace InvenioSearchResults
   * @desc Create search results
   * @memberOf Directives
   */
  function invenioSearchResults() {

    return {
      replace: true,
      scope: {
        invenioSearchItems: '=',
        searchResultsTemplate: '@',
        searchResultsRecordTemplate: '@'
      },
      templateUrl: templateUrl
    };

    ////////////

    /**
     * @name templateUrl
     * @desc Returns the template for the results
     * @memberOf Directives.invenioSearchResults
     */
    function templateUrl(element, attrs) {
      return attrs.searchResultsTemplate;
    }
  }

  /**
   * @namespace InvenioSearchResultsLoading
   * @desc Create search resulits
   * @memberOf Directives
   */
  function invenioSearchResultsLoading() {

    return {
      replace: true,
      scope: {
        invenioSearchLoading: '=',
        searchLoadingMessage: '@',
        searchLoadingTemplate: '@',
      },
      templateUrl: templateUrl
    };

    ////////////

    /**
     * @name templateUrl
     * @desc Returns the template for the results loading
     * @memberOf Directives.invenioSearchResultsLoading
    */
    function templateUrl(element, attrs) {
      return attrs.searchLoadingTemplate;
    }
  }

  /**
   * @namespace InvenioSearchResultsError
   * @desc Dispalys an error alert
   * @memberOf Directives
   */
  function invenioSearchResultsError() {

    return {
      replace: true,
      scope: {
        invenioSearchError: '=',
        searchMessageError: '@',
        searchMessageTemplate: '@',
      },
      templateUrl: templateUrl
    };

    ////////////

    /**
     * @name templateUrl
     * @desc Returns the template for the results error
     * @memberOf Directives.invenioSearchResultsError
     */
    function templateUrl(element, attrs) {
      return attrs.searchMessageTemplate;
    }
  }

  /**
   * @namespace InvenioSearchAPI
   * @desc Creates a commputication between backend and the searchbox
   * @memberOf Services
   */
  function invenioSearchAPI($http, $q) {

    return {
      search: search
    };

    ////////////

    /**
     * @name search
     * @desc Makes the search request to the given endpoint
     * @param {Object} args the `$http` args given from Controllers.SearchControllers.invenioSearchArgs
     * @returns {Object} promise
     * @memberOf Services.invenioSearchAPI
     */
    function search(args) {
      var deferred = $q.defer();
      $http(args).then(function(response) {
        deferred.resolve(response);
      }, function(error) {
        deferred.reject(error);
      }, function(update) {
        deferred.notify(update);
      });
      return deferred.promise;
    }
  }

  // Inject the $http
  invenioSearchAPI.$inject = ['$http', '$q'];

  ////////////

  // Setup angular directives
  angular.module('invenioSearchJs.directives', [])
    .directive('invenioSearchBar', invenioSearchBar)
    .directive('invenioSearchResultsLoading', invenioSearchResultsLoading)
    .directive('invenioSearchResultsError', invenioSearchResultsError)
    .directive('invenioSearchResults', invenioSearchResults);

  // Setup controllers
  angular.module('invenioSearchJs.controllers', [])
    .controller('invenioSearchController', invenioSearchController);

  // Setup services
  angular.module('invenioSearchJs.services', [])
    .service('invenioSearchAPI', invenioSearchAPI);

  // Setup everyhting
  angular.module('invenioSearchJs', [
    'invenioSearchJs.services',
    'invenioSearchJs.controllers',
    'invenioSearchJs.directives'
  ]);

})(angular);
