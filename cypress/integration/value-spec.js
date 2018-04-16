/// <reference types="cypress" />
import { mount } from '../..'
import angular from 'angular'

/* eslint-env mocha */
describe('Value', () => {
  it('has value', () => {
    angular
      .module('A', [])
      .value('foo', 'bar')
      .controller('UseValueFoo', function ($scope, foo) {
        $scope.foo = foo
      })

    const template = `
      <div ng-controller="UseValueFoo">
      value "foo" is {{foo}}
      </div>
      `

    mount(template, ['A'])
    cy.contains('div', 'is bar')
  })
})
