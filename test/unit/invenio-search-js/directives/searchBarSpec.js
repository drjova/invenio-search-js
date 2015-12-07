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
 *
 * In applying this license, CERN does not
 * waive the privileges and immunities granted to it by virtue of its status
 * as an Intergovernmental Organization or submit itself to any jurisdiction.
 */

'use strict';

describe('Check searchbar directive', function() {

  var $compile;
  var $rootScope;
  var element;

  // Inject the angular module
  beforeEach(module('invenioSearchJs'));

  // load the templates
  beforeEach(module('templates'));

  beforeEach(
    inject(function(_$compile_, _$rootScope_) {

      $compile = _$compile_;
      $rootScope = _$rootScope_.$new();

      var template = angular.element(
        '<div>' +
          '<div invenio-search-bar' +
            'invenio-search-query="searching.invenioSearchQuery"' +
            'invenio-search-args="searching.invenioSearchArgs"' +
            'invenio-search-do="searching.invenioDoSearch(query)"' +
            'search-doctype=""' +
            'search-method="GET"' +
            'search-endpoint="http://localhost:9200/_search"' +
            'search-page="1"' +
            'search-size="2"' +
            'search-bar-template="src/invenio-search-js/templates/invenioSearchBar.html"' +
            'search-bar-input-placeholder="Type something"' +
            '>'+
          '</div>' +
        '</div>'
      );
      element = $compile(
        template
      )($rootScope);

      $rootScope.$digest();
    })
  );

  it('Invenio searchbar test',
    inject(function(){
      // Compile template
      $rootScope.$digest();
      expect(element.html()).to.contain('');
    })
  );
});
