/// <reference types="cypress" />
import { mount } from '../..'
import angular from 'angular'
import '../src/reverse'

/* eslint-env mocha */
describe('Filter', () => {
  const getFilter$ = () => angular.injector(['ng']).get('$filter')

  it('returns $filter', () => {
    const $filter = getFilter$()
    expect($filter).to.be.a('function')
  })

  it('returns built-in lowercase filter', () => {
    const lowercase = getFilter$()('lowercase')
    expect(lowercase).to.be.a('function')
    expect(lowercase('FOOBar')).to.equal('foobar')
  })

  it('has user filter', () => {
    // we don't even need to mount module "myReverseFilterApp"
    // to get back the reverse filter
    const $filter = angular
      .injector(['ng', 'myReverseFilterApp'])
      .get('$filter')
    const reverse = $filter('reverse')
    expect(reverse).to.be.a('function')
    expect(reverse('foo-')).to.equal('-oof')
    expect(reverse('foo-', true)).to.equal('-OOF')

    // but we can mount template to see it in action
    const template = `<div ng-controller="MyController">
      <input ng-model="greeting" type="text"><br>
      No filter: {{greeting}}<br>
      Reverse: {{greeting|reverse}}<br>
      Reverse + uppercase: {{greeting|reverse:true}}<br>
      Reverse, filtered in controller: {{filteredGreeting}}<br>
    </div>`
    mount(template, ['myReverseFilterApp'])

    cy.log('checking initial values')
    cy.contains('div', 'Reverse: olleh')
    cy.contains('div', 'Reverse + uppercase: OLLEH')

    cy.log('changing values')
    cy
      .get('input')
      .clear()
      .type('Cypress')
    cy.contains('div', 'Reverse: sserpyC')
    cy.contains('div', 'Reverse + uppercase: SSERPYC')
  })
})
