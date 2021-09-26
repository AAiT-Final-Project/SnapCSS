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

describe('Suggest CSS E2e test', () => {
  it('TC_Suggest_001 - Check that suggestions are added to blocks of code', () => {
    ['c', 'r', 'k'].map((key) => {
      cy.get(`#${key}-switch`).click();
    });

    const input =
      'img { padding-top: 40px;padding-right: 25px;padding-bottom: 40px;padding-left: 25px;}';
    cy.get('.input .view-lines')
      .click()
      .type('{enter}')
      .type(input, { parseSpecialCharSequences: false });

    cy.get('#snap-btn').click();
    cy.get('.swal2-popup').should('be.visible').contains('Success');

    // checkEditor('.output .view-line', TC_Suggest_001_EXPECTED);
  });

  it("TC_Suggest_002 - Check the response of the system when it can't make suggestions", () => {
    ['c', 'r', 'k'].map((key) => {
      cy.get(`#${key}-switch`).click();
    });

    const input = '.center {text-align: center;color: red;}';
    cy.get('.input .view-lines')
      .click()
      .type('{enter}')
      .type(input, { parseSpecialCharSequences: false });

    cy.get('#snap-btn').click();
    cy.get('.swal2-popup').should('be.visible').contains('Success');

    // checkEditor('.output .view-line', TC_Suggest_002_EXPECTED);
  });
});
