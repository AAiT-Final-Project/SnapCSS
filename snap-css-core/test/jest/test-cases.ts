export const testData = {
  TC_Load_001: `
    .class1 {
      text-align: center;
      text-align: center;
    }`,
  TC_Load_003: '',
  TC_Load_005: `
    .class1 {
      text-align;
      text-align: center;
    }`,
  TC_Clean_001: `
    .class1 {
      text-align: center;
      text-align: center;
    }`,
  TC_Clean_002: `
    .class1 {
      color: #ffffff;
      justify-content: center;
    }`,
  TC_Clean_003: `
    .class1 {
      color: white;
    }
  
    .class2 {
      color: #ffffff;
    }
  
    .class3 {
      color: rgb(255, 255, 255);
    }`,
  TC_Compress_001: `
    .class1 {
      padding-top: 10px; 
      padding-right: 10px; 
      padding-left: 10px; 
      padding-bottom: 10px;
    }`,
  TC_Compress_002: `
    .class1 {
      font-style: italic;
      font-weight: bold;
      font-size: .8em;
      line-height: 1.2;
      font-family: Arial, sans-serif;
    }
  
    .class2 {
      flex-grow: 1;
      flex-basis: 100px;
      flex-shrink: 1;
    }`,
  TC_Compress_003: `
    .class1 {
      align-content: space-between;
      justify-content: space-evenly;
      padding-top: 10px;
      margin-left: 10px;
    }`,
  TC_Compress_004: `
    .class1 {
      overflow-x: visible;
      overflow-y: scroll;
      row-gap: 10px;
      column-gap: 10px;
    }`,
  TC_Restructure_001: `
    .card1{
      width: 100px;
      height: 100px;
      color: white;
    }
    .card2{
      width: 100px;
      height: 100px;
      color: white;
    }`,
  TC_Restructure_002: `
    .card1 {
      width: 100px;
      height: 100px;
      color: white;
    }
    .card2{
      width: 100px;
      height: 100px;
      color: white;
      padding-top: 10px;
    }`,
  TC_Restructure_003: `
    .card1 {
      width: 100px;
      height: 100px;
      color: white;
      padding-top: 100px;
    }
    .card2{
      width: 100px;
      height: 100px;
      color: white;
      padding-top: 10px;
    }`,
  TC_Suggest_001: `
    img { 
      padding-top: 40px;
      padding-right: 25px;
      margin-top: 40px;
      margin-top: 40px;
      margin-right: 25px;
      margin-bottom: 40px;
    }`,
  TC_Suggest_002: `
    .center {
      text-align: center;
      color: red;
    }`,
}

export const expectedResult = {
  TC_Load_001: 'Successfully Loaded CSS',
  TC_Load_003: 'Successfully Loaded CSS',
  TC_Load_005: 'SyntaxError',
  TC_Clean_001: '.class1 {  text-align : center; }',
  TC_Clean_002: '.class1 {  color : #ffffff;  justify-content : center; }',
  TC_Clean_003: '.class1 {  color : #ffffff; }.class2 {  color : #ffffff; }.class3 {  color : #ffffff; }',
  TC_Compress_001: '.class1 {  padding : 10px; }',
  TC_Compress_002: '.class1 {  font : italic bold .8em/1.2 Arial, sans-serif; }.class2 {  flex : 1 1 100px; }',
  TC_Compress_003: '.class1 {  place-content : space-between space-evenly;  padding-top : 10px;  margin-left : 10px; }',
  TC_Compress_004: '.class1 {  gap : 10;  overflow : visible scroll; }',
  TC_Restructure_001: '.card1,.card2 {  width : 100px;  height : 100px;  color : white; }',
  TC_Restructure_002: '.card1,.card2 {  width : 100px;  height : 100px;  color : white; }.card2 {  padding-top : 10px; }',
  TC_Restructure_003: '.card1,.card2 {  width : 100px;  height : 100px;  color : white; }.card1 {  padding-top : 100px; }.card2 {  padding-top : 10px; }',
  TC_Suggest_001: '// Suggestions.img {  padding-top : 40px;  padding-right : 25px;  padding-bottom : 40px;  margin-top: 40px; }',
  TC_Suggest_002: '// No Suggestions.center {  text-align : center;  color : red; }',
}
