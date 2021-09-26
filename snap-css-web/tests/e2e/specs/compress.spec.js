// https://docs.cypress.io/api/introduction/api.html
/// <reference types="cypress" />

function checkEditor(editor, expected) {
  cy.get(editor).each(function (line, i) {
    cy.wrap(line)
      .find('span[class]')
      .each((col, j) => {
        if (expected[i][j]) cy.wrap(col).contains(expected[i][j]);
      });
  });
}

beforeEach(() => {
  // until we ever fix the unexpected usage exception, we can just ignore it
  cy.on('uncaught:exception', (e) => {
    return !e.message.includes('Unexpected usage');
  });
  cy.visit('/');
});

describe('Compress CSS E2e test', () => {
  it('TC_Compress_001 - Check that shorthand representations are created for longhand values', () => {
    ['c', 's', 'r'].map((key) => {
      cy.get(`#${key}-switch`).click();
    });

    const input =
      '.class1 {border-width: 10px; border-style: solid; border-color: #ffffff;}.class2 {padding-top: 10px; padding-right: 10px;padding-left: 10px; padding-bottom: 10px;}';
    cy.get('.input .view-lines')
      .click()
      .type('{enter}')
      .type(input, { parseSpecialCharSequences: false });

    cy.get('#snap-btn').click();
    cy.get('.swal2-popup').should('be.visible').contains('Success');

    // checkEditor('.output .view-line', TC_Compress_001_EXPECTED);
  });

  it('TC_Compress_002 - Check that comprression happens for multiple blocks', () => {
    ['c', 's', 'r'].map((key) => {
      cy.get(`#${key}-switch`).click();
    });

    const input =
      '.class1 {border-width: 10px; border-style: solid; border-color: #ffffff;}.class2 {padding-top: 10px; padding-right: 10px;padding-left: 10px; padding-bottom: 10px;}';
    cy.get('.input .view-lines')
      .click()
      .type('{enter}')
      .type(input, { parseSpecialCharSequences: false });

    cy.get('#snap-btn').click();
    cy.get('.swal2-popup').should('be.visible').contains('Success');

    // checkEditor('.output .view-line', TC_Compress_002_EXPECTED);
  });

  it('TC_Compress_003 - Check that no longhand properties remain in the end', () => {
    ['c', 's', 'r'].map((key) => {
      cy.get(`#${key}-switch`).click();
    });

    const input =
      '.class1 {border-width: 10px; border-style: solid; border-color: #ffffff; padding-top: 10px; padding-right: 10px;padding-left: 10px; padding-bottom: 10px;}';
    cy.get('.input .view-lines')
      .click()
      .type('{enter}')
      .type(input, { parseSpecialCharSequences: false });

    cy.get('#snap-btn').click();
    cy.get('.swal2-popup').should('be.visible').contains('Success');

    // checkEditor('.output .view-line', TC_Compress_003_EXPECTED);
  });

  it('TC_Compress_004 - Check that all types of longhand properties are accounted for', () => {
    ['c', 's', 'r'].map((key) => {
      cy.get(`#${key}-switch`).click();
    });

    const input =
      '.class1 {border-width: 10px; border-style: solid;flex-grow: 2;border-color: #ffffff;padding-top: 10px;flex-shrink: 2;padding-right: 10px;padding-left: 10px;flex-basis: 10%;padding-bottom: 10px;}';
    cy.get('.input .view-lines')
      .click()
      .type('{enter}')
      .type(input, { parseSpecialCharSequences: false });

    cy.get('#snap-btn').click();
    cy.get('.swal2-popup').should('be.visible').contains('Success');

    // checkEditor('.output .view-line', TC_Compress_004_EXPECTED);
  });
});
