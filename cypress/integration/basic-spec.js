/// <reference types="cypress" />
import { mount } from '../..'
import angular from 'angular'

/* eslint-env mocha */
describe('Basic', () => {
  angular.module('demo', []).controller('WelcomeController', function ($scope) {
    $scope.greeting = 'Welcome!'
    $scope.version = angular.version.full
  })

  beforeEach(() => {
    const template = `
      <div ng-controller="WelcomeController">
        {{greeting}}
        ng {{version}}
      </div>
    `
    console.log('mounting basic')
    mount(template, ['demo'])
  })

  it('has angular version', () => {
    expect(angular.version.full).to.contain('1.')
  })

  it('shows hello', () => {
    cy.contains('div', 'Welcome!').should('be.visible')
  })

  it('shows hello again', () => {
    cy.contains('div', 'Welcome!').should('be.visible')
  })
})
