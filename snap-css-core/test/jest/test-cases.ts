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
  TC_Integrate_001: `
    .class1 {
      text-align: center;
      color: red;
    }
    .class2 {
      text-align: center;
      color: red;
    }`,
  TC_Integrate_002: `
    .class1 {
      text-align: center;
      color: red;
      padding-top: 10px;
      margin-top: 10px;
    }
    .class2 {
      text-align: center;
      color: red;
      padding-top: 10px;
      margin-top: 10px;
    }
    .class3 {
      text-align: center;
      color: red;
      padding-top: 10px;
      margin-top: 10px;
      height: 100px;
    }`,
  TC_Integrate_003: `
    .class1 {
      padding-top: 10px;
      padding-right: 20px;
      padding-bottom: 10px;
      padding-left: 20px;
      color: red;
      text-align: center;
    }`,
  TC_Integrate_004: `
    .class1 {
      padding-top: 10px !important;
      padding-right: 20px !important;
      padding-bottom: 10px !important;
      padding-left: 20px !important;
      color: red;
      color: rgb(255, 0, 0);
    }`,
  TC_Integrate_005: `
    .class1 {
      text-align: center;
      text-align: justify;
    }`,
  TC_Integrate_006: `
    .class1 {
      text-align: center;
      text-align: justify;
      color: red;
    }`,
  TC_Integrate_007: `
    .class1 {
      padding-top: 10px;
      padding-right: 20px;
      padding-bottom: 10px;
      padding-left: 20px;
    }
    .class1 {
      padding-top: 10px;
      padding-right: 20px;
      padding-bottom: 10px;
      padding-left: 20px;
    }`,
  TC_Integrate_008: `
    .class1 {
      padding-top: 10px;
      padding-right: 20px;
      padding-bottom: 10px;
      padding-left: 20px;
    }
    .class2 {
      padding-top: 10px;
      padding-right: 20px;
      padding-bottom: 10px;
      padding-left: 20px;
      color: red;
    }`,
  TC_Integrate_009: `
    .class1 {
      text-align: center;
      color: red;
    }
    .class1 {
      text-align: center;
      color: red;
    }`,
  TC_Integrate_010: `
    .class1 {
      text-align: center;
      color: red;
    }
    .class2 {
      text-align: center;
      color: red;
    }`,
  TC_Integrate_011: `
    .class1 {
      margin-top: 10px;
      margin-right: 20px;
      margin-bottom: 30px;
      margin-left: 40px;
    }`,
  TC_Integrate_012: `
    .class1 {
      font-style: italic;
      font-weight: bold;
      font-size: .8em;
      line-height: 1.2;
      font-family: Arial, sans-serif;
    }`,
  TC_Integrate_013: `
    .class1 {
      margin-top: 10px;
      margin-right: 20px;
      margin-bottom: 30px;
      margin-left: 40px;
      color: blue;
      color: red;
    }
    .class1 {
      margin-top: 10px;
      margin-right: 20px;
      margin-bottom: 30px;
      margin-left: 40px;
      color: blue;
      color: red;
    }`,
  TC_Integrate_014: `
    .class1 {
      font-style: italic;
      font-weight: bold;
      font-size: .8em;
      line-height: 1.2;
      font-family: Arial, sans-serif;
      color: blue;
      color: red;
    }
    .class2 {
      font-style: italic;
      font-weight: bold;
      font-size: .8em;
      line-height: 1.2;
      font-family: Arial, sans-serif;
      color: blue;
      color: red;
    }`,
  TC_Integrate_015: `
    .class1 {
      text-align: center;
      color: red;
    }
    .class1 {
      text-align: center;
      color: red;
    }`,
  TC_Integrate_016: `
    .class1 {
      text-align: center;
      color: red;
    }
    .class2 {
      text-align: center;
      color: red;
    }`,
  TC_Integrate_017: `
    .class1 {
      margin-top: 10px;
      margin-right: 20px;
      margin-bottom: 30px;
      margin-left: 40px;
      color: rgb(255, 0, 10);
      color: rgb(255, 0, 0);
    }`,
  TC_Integrate_018: `
    .class1 {
      font-style: italic;
      font-weight: bold;
      font-size: .8em;
      line-height: 1.2;
      font-family: Arial, sans-serif;
      color: rgb(255, 0, 0)
    }`,
  TC_Integrate_019: `
    .class1 {
      padding-top: 10px;
      padding-right: 20px;
      padding-bottom: 10px;
      padding-left: 20px;
    }
    .class1 {
      padding-top: 10px;
      padding-right: 20px;
      padding-bottom: 10px;
      padding-left: 20px;
    }`,
  TC_Integrate_020: `
    .class1 {
      padding-top: 10px;
      padding-right: 20px;
      padding-bottom: 10px;
      padding-left: 20px;
    }
    .class2 {
      padding-top: 10px;
      padding-right: 20px;
      padding-bottom: 10px;
      padding-left: 20px;
    }`,
  TC_System_001: `
    .class1 {
      margin-top: 10px;
      margin-right: 20px;
      margin-bottom: 30px;
      margin-left: 40px;
      color: blue;
      color: red;
    }
    .class1 {
      margin-top: 10px;
      margin-right: 20px;
      margin-bottom: 30px;
      margin-left: 40px;
      color: blue;
      color: red;
    }`,
  TC_System_002: `
    .class1 {
      font-style: italic;
      font-weight: bold;
      font-size: .8em;
      line-height: 1.2;
      font-family: Arial, sans-serif;
      color: blue;
      color: red;
    }
    .class2 {
      font-style: italic;
      font-weight: bold;
      font-size: .8em;
      line-height: 1.2;
      font-family: Arial, sans-serif;
      color: blue;
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
  TC_Integrate_001: '.class1,.class2 {  text-align : center;  color : #ff0000; }',
  TC_Integrate_002: '.class1,.class2,.class3 {  text-align : center;  color : #ff0000;  padding-top : 10px;  margin-top : 10px; }.class3 {  height : 100px; }',
  TC_Integrate_003: '.class1 {  padding : 10px 20px;  color : #ff0000;  text-align : center; }',
  TC_Integrate_004: '.class1 {  padding : 10px 20px !important;  color : #ff0000; }',
  TC_Integrate_005: '// No Suggestions.class1 {  text-align : justify; }',
  TC_Integrate_006: '// No Suggestions.class1 {  text-align : justify;  color : #ff0000; }',
  TC_Integrate_007: '.class1 {  padding : 10px 20px; }',
  TC_Integrate_008: '.class1,.class2 {  padding : 10px 20px; }.class2 {  color : red; }',
  TC_Integrate_009: '// No Suggestions.class1 {  text-align : center;  color : red; }',
  TC_Integrate_010: '// No Suggestions.class1,.class2 {  text-align : center;  color : red; }',
  TC_Integrate_011: '// No Suggestions.class1 {  margin : 10px 20px 30px 40px; }',
  TC_Integrate_012: '// No Suggestions.class1 {  font : italic bold .8em/1.2 Arial, sans-serif; }',
  TC_Integrate_013: '.class1 {  margin : 10px 20px 30px 40px;  color : #ff0000; }',
  TC_Integrate_014: '.class1,.class2 {  font : italic bold .8em/1.2 Arial, sans-serif;  color : #ff0000; }',
  TC_Integrate_015: '// No Suggestions.class1 {  text-align : center;  color : #ff0000; }',
  TC_Integrate_016: '// No Suggestions.class1,.class2 {  text-align : center;  color : #ff0000; }',
  TC_Integrate_017: '// No Suggestions.class1 {  margin : 10px 20px 30px 40px;  color : #ff0000; }',
  TC_Integrate_018: '// No Suggestions.class1 {  font : italic bold .8em/1.2 Arial, sans-serif;  color : #ff0000; }',
  TC_Integrate_019: '// No Suggestions.class1 {  padding : 10px 20px; }',
  TC_Integrate_020: '// No Suggestions.class1,.class2 {  padding : 10px 20px; }',
  TC_System_001: '// No Suggestions.class1 {  margin : 10px 20px 30px 40px;  color : #ff0000; }',
  TC_System_002: '// No Suggestions.class1,.class2 {  font : italic bold .8em/1.2 Arial, sans-serif;  color : #ff0000; }',
}
