// https://docs.cypress.io/api/introduction/api.html
/// <reference types="cypress" />

import {
  TC_LOAD_001_EXPECTED,
  TC_LOAD_002_EXPECTED,
  TC_LOAD_002_INPUT,
} from '../testData';

function checkEditor(editor, expected) {
  cy.get(editor).each(function (line, i) {
    cy.wrap(line)
      .find('span[class]')
      .each((col, j) => {
        if (expected[i][j]) cy.wrap(col).contains(expected[i][j]);
      });
  });
}

function checkEmptyEditor(editor) {
  cy.get(editor).each(function (line) {
    cy.wrap(line).find('span').find('span').should('not.have.descendants');
  });
}

beforeEach(() => {
  // until we ever fix the unexpected usage exception, we can just ignore it
  cy.on('uncaught:exception', (e) => {
    return !e.message.includes('Unexpected usage');
  });
  cy.visit('/');
});

describe('Snap CSS - E2e Test', () => {
  it('Visits the app root url', () => {
    cy.get('nav');
  });

  it('Focus on the editor', () => {
    cy.get('.input .view-lines').click();
    cy.get('.input .view-overlays').should('have.class', 'focused');
  });

  it('Writes input CSS', () => {
    const input = '.main {width: 50px;}';
    cy.get('.input .view-lines')
      .click()
      .type('{enter}')
      .type(input, { parseSpecialCharSequences: false });

    // this is a representation of what is expected in each row and each column (you can inspect on chrome to see what is expected)
    // empty spaces cause issues somehow so best not to check for them so use just "code" instead of "// code" until we have an alternative
    const expected = [['code'], ['.main', '{', 'width:', '', '50px', , '}']];
    // one could use ".output .view-line" to check on the output
    checkEditor('.input .view-line', expected);
  });
});

describe('TS_Load_001', () => {
  it('TC_Load_001 - Check Loading with valid CSS file', () => {
    cy.get('#load-url-btn').click();
    cy.get('.swal2-popup').should('be.visible');

    cy.get('.swal2-input').type(
      'http://localhost:8080/test_resources/valid.css {enter}'
    );

    checkEditor('.input .view-line', TC_LOAD_001_EXPECTED);
  });

  it('TC_Load_002 - Check Loading on Web with valid CSS text', () => {
    cy.get('.input .view-lines')
      .click()
      .type('{enter}')
      .type(TC_LOAD_002_INPUT, { parseSpecialCharSequences: false });

    checkEditor('.input .view-line', TC_LOAD_002_EXPECTED);
  });
});

describe('TS_Load_002', () => {
  it('TC_Load_003 - Check loading of Empty CSS', () => {
    cy.get('#load-url-btn').click();
    cy.get('.swal2-popup').should('be.visible');

    cy.get('.swal2-input').type(
      'http://localhost:8080/test_resources/empty.css {enter}'
    );

    checkEmptyEditor('.input .view-line');
  });

  it('TC_Load_004 - Check loading when file does not exist', () => {
    cy.get('#load-url-btn').click();
    cy.get('.swal2-popup').should('be.visible');

    cy.get('.swal2-input').type('invalid url {enter}');

    cy.get('.swal2-icon-error').should('be.visible');
    cy.get('#swal2-title').should('contain', 'Invalid URL');
  });
});

describe('TS_Load_003', () => {
  it('TC_Load_005 - Check system response to invalid CSS code', () => {
    cy.get('#load-url-btn').click();
    cy.get('.swal2-popup').should('be.visible');

    cy.get('.swal2-input').type(
      'http://localhost:8080/test_resources/invalid.css {enter}'
    );
  });
});

describe('TS_Load_004', () => {
  it('TC_Load_006 - Check that different files types can get scanned', () => {
    // Need clarification on how to scan from .vue .jsx .html
  })

  it('TC_Load_007 - Check system response to unsupported file typesa', () => {
    // TODO should be tested after handling other extention
  })
})
