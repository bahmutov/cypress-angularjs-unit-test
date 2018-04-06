/// <reference types="cypress" />
import {mount} from '../..'
import angular from 'angular'

const app = angular.module('demo', [])
  .controller('WelcomeController', function($scope) {
    $scope.greeting = 'Welcome!';
    $scope.version = angular.version.full
  });

beforeEach(() => {
  const template = `
    <div ng-controller="WelcomeController">
      {{greeting}}
      ng {{version}}
    </div>
  `
  mount(template, ['demo'])
})

it('shows hello', () => {
  cy.contains('div', 'Welcome!').should('be.visible')
})
