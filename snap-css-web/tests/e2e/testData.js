// Load CSS
export const TC_LOAD_001_EXPECTED = [
  ['code'],
  ['.main', '{', 'width:', '', '50px', , ';}'],
];

export const TC_LOAD_002_INPUT =
  '.class1 {color: white; border-width: 10px; padding: 20px}';

export const TC_LOAD_002_EXPECTED = [
  ['code'],
  [
    '.class1',
    '{',
    'color:',
    '',
    'white',
    ';',
    'border-width:',
    '',
    '10px',
    ';',
    'padding:',
    '',
    '20px',
    '}',
  ],
];

// Clean CSS
export const TC_Clean_001_EXPECTED = [
  ['code'],
  ['.class1', '{', 'color:', '', 'red', ';', 'border-width:', '', '10px', '}'],
];

export const TC_Clean_002_EXPECTED = [
  ['code'],
  [
    '.class1',
    '{',
    'position:',
    '',
    'relative',
    ';',
    'padding:',
    '',
    '20px',
    '}',
  ],
  [
    '.class2',
    '{',
    'float:',
    '',
    'right',
    ';',
    'opacity:',
    '',
    '0.5',
    ';',
    'vertical-align:',
    '',
    'top',
    ';',
    'display:',
    '',
    'flex',
    ';',
    'justify-content:',
    '',
    'center',
    ';',
    'align-items:',
    '',
    'center',
    ';',
    '}',
  ],
];

export const TC_Clean_003_EXPECTED = [
  ['code'],
  ['.class1', '{', 'color:', '', '#ffffff', '}'],
  ['.class2', '{', 'color:', '', '#ffffff', '}'],
  ['.class3', '{', 'color:', '', '#ffffff', '}'],
];
