/*
 * This file is part of Invenio.
 * Copyright (C) 2016 CERN.
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
 *
 * In applying this license, CERN does not
 * waive the privileges and immunities granted to it by virtue of its status
 * as an Intergovernmental Organization or submit itself to any jurisdiction.
 */

'use strict';

describe('Check search sort order directive', function() {

  var $compile;
  var $httpBackend;
  var $rootScope;
  var scope;
  var template;

  // load the templates
  beforeEach(angular.mock.module('templates'));

  // Inject the angular module
  beforeEach(angular.mock.module('invenioSearch'));

  beforeEach(
    inject(function(_$compile_, _$rootScope_, _$httpBackend_) {

      $compile = _$compile_;
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;

      scope = $rootScope;


      // Expect a request
      $httpBackend.whenGET('/api?page=1&size=20').respond(200, {success: true});
      $httpBackend.whenGET('/api?page=1&size=20&sort=date').respond(200, {success: true});
      $httpBackend.whenGET('/api?page=1&size=20&sort=-date').respond(200, {success: true});

      template = '<invenio-search search-endpoint="/api"> ' +
        '<invenio-search-sort-order ' +
          'label="a label" ' +
          'sort-key="sort" ' +
          'template="src/invenio-search-js/templates/extras/toggleButton.html" ' +
        '>' +
       '<invenio-search-select-box ' +
        'sort-key="sort"' +
        'default-option="date" ' +
        'available-options=\'{"options": [{"title": "Title", "value": "title"}, {"title": "Date", "value": "date"}]}\' ' +
        'template="src/invenio-search-js/templates/extras/selectBox.html" ' +
       '>' +
       '</invenio-search-select-box>' +
       '</invenio-search-sort-order>' +
      '</invenio-search>';

      template = $compile(template)(scope);
      scope.vm.invenioSearchArgs.params.sort = "-date";
      scope.$digest();
    })
  );

  it('should have the specified label', function() {
    // Select should have date as value
    expect(template.find('button').eq(0).text()).to.contain('label');
  });

  it('should have the class active', function() {
    // Select should have date as value
    scope.vm.invenioSearchArgs.params.sort = "-date";
    scope.$digest();
    expect(scope.vm.invenioSearchArgs.params.sort).to.be.equal('-date');

  });

  //it('should have change the sort', inject(function($timeout) {
    //// Select should have date as value
    //scope.vm.invenioSearchArgs.params.sort = "date";
    //scope.$digest();
    //template.find('button').eq(0).triggerHandler('click');
    //$timeout.flush();
    //scope.$digest();
    //expect(scope.vm.invenioSearchArgs.params.sort).to.be.equal('-date');
  //}));

  //it('should have change the -sort', inject(function($timeout) {
    //// Select should have date as value
    //scope.vm.invenioSearchArgs.params.sort = "-date";
    //scope.$digest();
    //template.find('button').eq(0).triggerHandler('click');
    //$timeout.flush();
    //scope.$digest();
    //expect(scope.vm.invenioSearchArgs.params.sort).to.be.equal('date');
  //}));

});
