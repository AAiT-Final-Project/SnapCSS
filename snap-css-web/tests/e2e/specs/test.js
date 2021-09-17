// https://docs.cypress.io/api/introduction/api.html

function checkEditor(editor, expected) {
  cy.get(editor).each(function (line, i) {
    cy.wrap(line)
      .find("span[class]")
      .each((col, j) => {
        if (expected[i][j]) cy.wrap(col).contains(expected[i][j]);
      });
  });
}

beforeEach(() => {
  // until we ever fix the unexpected usage exception, we can just ignore it
  cy.on("uncaught:exception", (e) => {
    return !e.message.includes("Unexpected usage");
  });
  cy.visit("/");
});

describe("My First Test", () => {
  it("Visits the app root url", () => {
    cy.get("nav");
  });

  it("clicks to text", () => {
    cy.get(".input .view-lines").click();
    cy.get(".input .view-overlays").should("have.class", "focused");
  });

  it("writes input text", () => {
    cy.get(".input .view-lines").click().type(`{enter}.main {{}width: 50px{}}`);

    // this is a representation of what is expected in each row and each column (you can inspect on chrome to see what is expected)
    // empty spaces cause issues somehow so best not to check for them so use just "code" instead of "// code" until we have an alternative
    const expected = [["code"], [".main", "{", "width:", "", "50px", "}"]];
    // one could use ".output .view-line" to check on the output
    checkEditor(".input .view-line", expected);
  });
});
