export interface Shorthand {
    shorthandName: string;
    shorthandProperties: string[];
  }

export interface Declaration {
    type: string;
    property: string;
    value: string;
}

export interface Declarations {
    [key: string]: Declaration;
}

export interface Rule {
    type: string;
    selectors: string[];
    declarations: Declaration[];
}
