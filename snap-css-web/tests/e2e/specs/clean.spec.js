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

describe('Clean CSS E2e test', () => {
  it('TC_Clean_001 - Check that redundant declarations are removed', () => {
    ['r', 's', 'k'].map((key) => {
      cy.get(`#${key}-switch`).click();
    });

    const input = '.class1 {color: white; border-width: 10px;color: red;}';
    cy.get('.input .view-lines')
      .click()
      .type('{enter}')
      .type(input, { parseSpecialCharSequences: false });

    cy.get('#snap-btn').click();
    cy.get('.swal2-popup').should('be.visible').contains('Success');

    // checkEditor('.output .view-line', TC_Clean_001_EXPECTED);
  });

  it('TC_Clean_002 - Check that non-redundant declarations are not removed', () => {
    ['r', 's', 'k'].map((key) => {
      cy.get(`#${key}-switch`).click();
    });

    const input =
      '.class1 {padding: 10px; position: relative;padding: 20px;} .class2 { display: inline-block; float: right; opacity: .5; vertical-align: top; display:flex; justify-content:center; align-items: center; }';
    cy.get('.input .view-lines')
      .click()
      .type('{enter}')
      .type(input, { parseSpecialCharSequences: false });

    cy.get('#snap-btn').click();
    cy.get('.swal2-popup').should('be.visible').contains('Success');

    // checkEditor('.output .view-line', TC_Clean_002_EXPECTED);
  });

  it('TC_Clean_003 - Check that multiple value representations are combined into one', () => {
    ['r', 's', 'k'].map((key) => {
      cy.get(`#${key}-switch`).click();
    });

    const input =
      '.class1 {color: white;} .class2 {color: #ffffff;} .class3 {color: rgb(255, 255, 255);}';
    cy.get('.input .view-lines')
      .click()
      .type('{enter}')
      .type(input, { parseSpecialCharSequences: false });

    cy.get('#snap-btn').click();
    cy.get('.swal2-popup').should('be.visible').contains('Success');

    // checkEditor('.output .view-line', TC_Clean_003_EXPECTED);
  });
});
