import angular from 'angular'

// from https://docs.angularjs.org/guide/component
angular.module('heroApp', []).component('heroDetail', {
  template: '<span>Name: {{$ctrl.hero.name}}</span>',
  bindings: {
    hero: '='
  }
})
