// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [3, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [3, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [5, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 7];
const invalid5 = [90, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];
const invalid6 = [70, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [60, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [40, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [11, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 2];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5,invalid6, mystery1, mystery2 ];

// Add your functions below:
const validateCred  = (arr) => { 
  const result= [];
  //make a copy in order not to alter the initial array
  const copiedArr = arr.slice();
  const firstD = copiedArr.pop(); //always the same
  result.push(firstD);
  const invertedArr = copiedArr.reverse();
  invertedArr.splice(0, 0, firstD);

 //now we iterate through an array 
  for( let i = 1 ; i < invertedArr.length; i ++) {
      if (i % 2 == 1) {
        result.push(invertedArr[i]*2);
      } else {
        result.push(invertedArr[i]);
      }
  };
  // check if there r numbers bigger than 9
    const afterDecreaseByNine = result.map(x => x > 9 ? x-9 : x);
    const sum = afterDecreaseByNine.reduce((a, b) => a + b);
  //remainder of sum divided by 10 must be 0
    if (sum %10 == 0) {
      return true
    } else {
      return false
    }
};

const findInvalidCards = (arrs) => {
 const valid = [];
 const invalid = [];
 arrs.map(arr => validateCred(arr) ? valid.push(arr) : invalid.push(arr));
 return invalid;
 }

const idInvalidCardCompanies = (arrs) => {
  const invalids = findInvalidCards(arrs);
  // console.log(invalids);
  const legitCompanies = [];
  const nonameCompanies = [];
  
  // console.log(invalids[1][0]);
  for ( let i = 0; i < invalids.length; i++ ) {
    const firstDigit = invalids[i][0];
    const checkForDoubles = (name) => legitCompanies.indexOf(name) == -1 ? legitCompanies.push(name) : null;
    switch (firstDigit) {
      case 3:
        checkForDoubles('Amex');
        break;
      case 4:
        checkForDoubles('Visa');
        break;
      case 5:
        checkForDoubles('Mastercard');
        break;
      case 6:
        checkForDoubles('Discover');
        break;   
      default: 
      nonameCompanies.push(firstDigit);
      
    }
    // return legitCompanies;
  }
  (nonameCompanies.length ==1) ? 
    console.log (nonameCompanies.length + ` noname credit card company found starting with` + nonameCompanies)
  :
  console.log (nonameCompanies.length + ` noname credit card companies found starting with ` + nonameCompanies);
  return (legitCompanies);
  // return legitCompanies;
  // return ('Company not found for: ' + nonameCompanies.length)
}

console.log(idInvalidCardCompanies(batch));