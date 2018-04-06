/// <reference types="cypress" />
import angular from 'angular'

/* global cy */
export const mount = function (template, modules = []) {
  if (arguments.length === 1) {
    // test did not pass a template, just list of modules
    modules = template
    template = ''
  }

  const html = `
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
    ${template}
    </body>
  `
  const document = cy.state('document')
  document.write(html)
  document.close()

  cy.window().then(w => {
    // set the Angular library reference
    // into the test iframe
    w.angular = angular
    cy.log('Angular.js', angular.version.full)
    angular.bootstrap(document, modules)
  })
}
