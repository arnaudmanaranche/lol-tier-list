/// <reference types="cypress" />

describe.only('homepage', () => {
  it('should display right UI', () => {
    cy.visit('/')

    cy.get('h1').contains('Share easily your League of Legends power rankings')

    cy.get(`[data-testid=lec]`)
    cy.get(`[data-testid=lcs]`)
    cy.get(`[data-testid=lck]`)
    cy.get(`[data-testid=lpl]`)
    cy.get(`[data-testid=lfl]`)

    cy.get('a').contains('CREATE YOURS').click()
  })
})
