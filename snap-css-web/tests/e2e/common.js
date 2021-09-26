export function checkEditor(editor, expected, cy) {
  cy.get(editor).each(function (line, i) {
    cy.wrap(line)
      .find('span[class]')
      .each((col, j) => {
        if (expected[i][j]) cy.wrap(col).contains(expected[i][j]);
      });
  });
}
