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

describe('Unit: testing controllers', function() {

  // Inject the angular module
  beforeEach(angular.mock.module('invenioSearchJs'));

  it('should have a invenioSearchController', inject(function($rootScope, $controller) {
    var $scope = $rootScope.$new();

    var ctrl = $controller('invenioSearchController', {
      $scope : $scope,
    });

    // The invenio search args.params.size should be 10
    expect(ctrl.invenioSearchArgs.params.size).to.be.equal(10);
    // The invenio search method should be GET
    expect(ctrl.invenioSearchArgs.method).to.be.equal('GET');

    // Scope change values
    ctrl.invenioSearchArgs.method = 'POST';
    ctrl.invenioSearchArgs.params.page = 20;
    ctrl.invenioSearchError = true;
    ctrl.invenioSearchLoading = true;
    ctrl.invenioSearchQuery = 'Iron man';

    // Scope apply changes
    $scope.$apply();
    // The invenio search args.params.page should be 20
    expect(ctrl.invenioSearchArgs.params.page).to.be.equal(20);
    // The invenio search method should be POST
    expect(ctrl.invenioSearchArgs.method).to.be.equal('POST');
    // The invenio search error shoudl be true
    expect(ctrl.invenioSearchError).to.be.equal(true);
    // The invenio search loading shoudl be true
    expect(ctrl.invenioSearchLoading).to.be.equal(true);
    // The invenio search query should be Iron man
    expect(ctrl.invenioSearchQuery).to.be.equal('Iron man');
  }));

});
