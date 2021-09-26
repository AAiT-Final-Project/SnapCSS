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

describe('Restructure CSS E2e test', () => {
  it('TC_Restructure_001 - Check that common declarations are grouped together', () => {
    ['c', 's', 'k'].map((key) => {
      cy.get(`#${key}-switch`).click();
    });

    const input =
      '.card1{margin: 1px;padding: 2px;color: white;border: 1px solid black;}.card2{margin: 1px;padding: 2px;color:white;border: 2px solid black;}.card3{margin: 2px;padding: 3px;color:white;border: 4px solid black;}.card4{margin: 2px;padding: 3px;color:white;border: 4px solid black;}';
    cy.get('.input .view-lines')
      .click()
      .type('{enter}')
      .type(input, { parseSpecialCharSequences: false });

    cy.get('#snap-btn').click();
    cy.get('.swal2-popup').should('be.visible').contains('Success');

    // checkEditor('.output .view-line', TC_Restructure_001_EXPECTED);
  });

  it('TC_Restructure_002 - Check that grouped declarations are common amongst all the initial blocks', () => {
    ['c', 's', 'k'].map((key) => {
      cy.get(`#${key}-switch`).click();
    });

    const input =
      '.card1{margin: 1px;padding: 2px;color: white;border: 1px solid black;}.card2{margin: 1px;padding: 2px;color:white;border: 2px solid black;}';
    cy.get('.input .view-lines')
      .click()
      .type('{enter}')
      .type(input, { parseSpecialCharSequences: false });

    cy.get('#snap-btn').click();
    cy.get('.swal2-popup').should('be.visible').contains('Success');

    // checkEditor('.output .view-line', TC_Restructure_002_EXPECTED);
  });

  it('TC_Restructure_003 - Check that grouped declarations have been assgined the proper selectors', () => {
    ['c', 's', 'k'].map((key) => {
      cy.get(`#${key}-switch`).click();
    });

    const input =
      '.card1{margin: 1px;padding: 2px;color: white;border: 1px solid black;}.card2{margin: 1px;padding: 2px;color:white;border: 2px solid black;}.card3{margin: 2px;padding: 3px;color:white;border: 4px solid black;}.card4{margin: 2px;padding: 3px;color:white;border: 4px solid black;}';
    cy.get('.input .view-lines')
      .click()
      .type('{enter}')
      .type(input, { parseSpecialCharSequences: false });

    cy.get('#snap-btn').click();
    cy.get('.swal2-popup').should('be.visible').contains('Success');

    // checkEditor('.output .view-line', TC_Restructure_003_EXPECTED);
  });
});
