/// <reference types="cypress" />
import { mount } from '../..'
import angular from 'angular'

/* eslint-env mocha */
describe('Fixture', () => {
  // setup module with a controller to test

  angular.module('demo', []).controller('WelcomeController', ($scope) => {
    $scope.greeting = 'Welcome!'
    $scope.version = angular.version.full
  })

  beforeEach(() => {
    // load HTML template for the test from a fixture
    cy.fixture('welcome.html').then(template => {
      mount(template, ['demo'])
    })
  })

  it('shows hello', () => {
    cy.contains('div', 'Welcome!').should('be.visible')
  })
})
