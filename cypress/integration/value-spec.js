/// <reference types="cypress" />
import {mount} from '../..'
import angular from 'angular'

describe.skip('Value', () => {
  it('has value', () => {
    angular.module('A', [])
    .value('foo', 'bar')
    mount(['A'])
  })
})
