/// <reference types="cypress" />
import { mount } from '../..'
import angular from 'angular'
import '../src/hero-detail'

// component example taken from
// https://docs.angularjs.org/guide/component

/* eslint-env mocha */
describe('Component', () => {
  const template = `
    <!-- components match only elements -->
    <div ng-controller="MainCtrl as ctrl">
      <b>Hero</b><br>
      <hero-detail hero="ctrl.hero"></hero-detail>
    </div>
  `

  it('shows passed name', () => {
    // note that module "heroApp" should already exist (in src/hero-detail)
    angular.module('heroApp').controller('MainCtrl', function MainCtrl () {
      this.hero = {
        name: 'Spawn'
      }
    })

    mount(template, ['heroApp'])
    cy.contains('Name: Spawn')
  })

  it('renders when data changes', () => {
    angular.module('heroApp').controller('MainCtrl', function MainCtrl () {
      this.hero = {
        name: 'Spawn'
      }
    })

    mount(template, ['heroApp'])
    cy.contains('Name: Spawn').then($el => {
      const ngElement = angular.element($el)
      ngElement.controller().hero.name = 'Batman'
      ngElement.scope().$apply()
    })
    cy.contains('Name: Batman')
  })
})
