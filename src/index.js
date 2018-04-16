/// <reference types="cypress" />
import angular from 'angular'

/* global cy */
export const mount = function (template, modules = []) {
  if (arguments.length === 1) {
    // test did not pass a template, just list of modules
    modules = template
    template = ''
  }

  // must inject into a "div" and not into "document" directly,
  // Angular.js goes up to "html" parent element
  // and stores its state there, affecting every test afterwards
  const html = `
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
      <div id="app">
        ${template}
      </div>
    </body>
  `

  const document = cy.state('document')
  document.write(html)
  document.close()

  cy.window().then(w => {
    w.angular = angular
    cy.log('Angular.js', w.angular.version.full)
    const el = document.getElementById('app')
    w.angular.bootstrap(el, modules)
  })
}
