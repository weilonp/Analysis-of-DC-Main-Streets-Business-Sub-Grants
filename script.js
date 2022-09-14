// Name: Weilon Price  
// G-number: G01149516

// 1) What is the median/min/max sub grants amount?
// 2) Median grants amount of each zipcode
// 3) Which main street recieved the most grants?
// 4) Which main street that had the most number of shops recieving the grants?
// 5) The median grants of each main street
// 6) The most common grant amount
// 7) The zipcodes that gained the most and least amount of grants
// 8) The program's total amount of grant

// class for question 3
class grantAndStreet{

  // Default value of fiscalYear = 2020
  constructor(street, grant, fiscalYear = 2020){
    this.street = street
    this.grant = grant
    this.fiscalYear = fiscalYear
  }
  
}

// answers question 1
function getMinMaxMedian(){
  
  let allGrants = []
  const rows = 330 //total number of rows in the data
  const median = rows / 2 
  let result = []

  // Gets all grants into the array allGrants
  for (let i = 0; i < rows; i++){
    allGrants.push(data.features[i].properties.SUB_GRANT_AMOUNT)
  };

  allGrants.map(Number)
  
  allGrants.sort(function(a, b){return a - b}); //sorts the array

  
  //gets the median/min/max from the sorted array
  result.push(allGrants[0]);
  result.push(allGrants[329]);
  result.push(allGrants[median]);
  
  return result;
}


// answers question 2
function medianZipcode(){
  
  const rows = 330;
  let zipGrants = [];
  let zipcodes = new Set();
  let map = new Map();
  let median;

  //gets all the zipcodes into a set
  for (let i = 0; i < rows; i++){
    zipcodes.add(data.features[i].properties.ZIPCODE)
  };

  //for each zipcode, goes through the entire data set to find data with matching zipcodes
  for (const zipcode of zipcodes) {
    for (let i = 0; i < rows; i++){
      if (data.features[i].properties.ZIPCODE === zipcode){
        zipGrants.push(data.features[i].properties.SUB_GRANT_AMOUNT);
      };
    };
    //sorts all grants of a zipcode, then maps the zipcode to median grant
    zipGrants.sort(function(a, b){return a - b});
    median = Math.floor(zipGrants.length/2);
    map.set(zipcode, zipGrants[median]);
    zipGrants = [];
  }
  return map
}


// answers question 3
function maxStreet(){
  
  let allGrants = [];
  const rows = 330;
  let maxGrant = -1;
  let maxStreet = '';
  let grant = 0;
  let street = '';
  let streetSet = new Set();
  let temp = 0

  // street and grant amount are being stored in class, then added to an array
  for (let i = 0; i < rows; i++){
    street = data.features[i].properties.MAIN_STREET_PROGRAM;
    grant = data.features[i].properties.SUB_GRANT_AMOUNT
    
    if (data.features[i].properties.FISCAL_YEAR != 2020){
      console.log("Fiscal year error")
      return
    }

    // creates new class
    let Streetdata = new grantAndStreet(street, grant);

    // adds new class to array, street name to a set
    allGrants.push(Streetdata);
    streetSet.add(street)
  };

  //checks all data that for each street
  for (const currentStr of streetSet) {
    for (i in allGrants){
      if (allGrants[i].street === currentStr){
        temp += allGrants[i].grant
      }
      // finds the max grant, if found, stores the new max and new street
      if (temp >= maxGrant){
        maxGrant = temp
        maxStreet = currentStr
      }
    }
    temp = 0
  }

  return [maxStreet, maxGrant]
}

// question 4
function mostStreetGrant(){

  const rows = 330
  let tracker = new Map();
  let maxShop = 0;
  let street = ';'

  
  // maps street name to number of times it has appeared, if street name is not in map yet, create a new key-value pair with street name and 0
  for (let i = 0; i < rows; i++){
    tracker.set(data.features[i].properties.MAIN_STREET_PROGRAM, (tracker.get(data.features[i].properties.MAIN_STREET_PROGRAM) ?? 0) + 1)
    };

  // finds the max number of times a street gained grant, stores new max and new street name if found
  for (let [key, value] of tracker){
    if (value > maxShop){
      street = key
      maxShop = value
    };
  };
  return [street, maxShop]
}

//Question 5
function medianByStreet(){

  const rows = 330;
  let tracker = new Map();
  let streets = new Set();
  let grants = [];
  let median = 0;

  // adds all street names to a set
  for (let i = 0; i < rows; i++){
      streets.add(data.features[i].properties.MAIN_STREET_PROGRAM)
  };

  // finds all grants for a single street at a time
  for (const street of streets) {
    for (let i = 0; i < rows; i++){
      if (data.features[i].properties.MAIN_STREET_PROGRAM === street){
        grants.push(data.features[i].properties.SUB_GRANT_AMOUNT);
      };
    };

    //sorts the grants of a street, finds the median, stores in a map
    grants.sort(function(a, b){return a - b});
    median = Math.floor(grants.length/2);
    tracker.set(street, grants[median]);
    grants = [];
  };
  return tracker
  
}

//Question 6

function mostCommonGrant(){
  const rows = 330
  let tracker = new Map();
  let maxTimes = 0;
  let grant = ';'

  //maps the grant amount to number of times it was given out, +1 if amount already in map, creates the key-value pair with amount: 0 if amount not already in map
  for (let i = 0; i < rows; i++){
    tracker.set(data.features[i].properties.SUB_GRANT_AMOUNT, (tracker.get(data.features[i].properties.SUB_GRANT_AMOUNT) ?? 0) + 1)
    };

  //finds the max number for each key-value pair in the map
  for (let [key, value] of tracker){
    if (value > maxTimes){
      grant = key
      maxTimes = value
    };
  };
  return [grant, maxTimes]
}

//Question 7
function mostLeastZipcodes(){
  const rows = 330;
  let zipcodes = new Set();
  let total = 0;
  let maxGrant = 0;
  result = [0, 0, 0, 1000000];
  
  //finds all zipcode and puts them in a set
  for (let i = 0; i < rows; i++){
    zipcodes.add(data.features[i].properties.ZIPCODE)
  };

  //for each zipcode, find the total grant amount
  for (const zipcode of zipcodes) {
    for (let i = 0; i < rows; i++){
      if (data.features[i].properties.ZIPCODE === zipcode){
        total += data.features[i].properties.SUB_GRANT_AMOUNT;
      };
    };
    //finds the max amount, stores zipcode and new max if found
    if (total > result[1]){
      result[0] = zipcode;
      result[1] = total;
    }
    //finds the min amount, stores zipcode and new min if found
    if (total < result[3]){
      result[2] = zipcode;
      result[3] = total;
    }
    total = 0;
  }
  return result;
}

//Question 8

function getTotal(){

  let total = 0;
  const rows = 330;

  //loops through entire dataset to find the total
  for (let i = 0; i < rows; i++){
    total += data.features[i].properties.SUB_GRANT_AMOUNT;
  };

  return total;
}



//Question 1
console.log("-------QUESTION 1-------")
q1 = getMinMaxMedian()
console.log(`What is the median/min/max sub grants amount? Minimial grant: $${q1[0]}, Maxmial grant: $${q1[1]}, Median grant: $${q1[2]}.`)

//Question 2
console.log("-------QUESTION 2-------")
let medianZip = medianZipcode()
console.log("What is the median grants amount of each zipcode?")
for (const [key, value] of medianZip) {
  console.log(`Zipcode ${key} is $${value}`);
}

//Question 3
console.log("-------QUESTION 3-------")
let streetAmount = maxStreet()
console.log(`Which main street recieved the most grants? ${streetAmount[0]} with the amount $${streetAmount[1].toFixed(2)}`);


//Question 4
console.log("-------QUESTION 4-------")
let q4 = mostStreetGrant();
console.log(`Which main street had the most number of shops recieving the grants? ${q4[0]}, with a total of ${q4[1]} shops receiving grants.`)

//Question 5
console.log("-------QUESTION 5-------")
let q5 = medianByStreet();
console.log("What is the median grants of each main street?");
for (const [key, value] of q5) {
  console.log(`${key}: $${value}`);
}


//Question 6
console.log("-------QUESTION 6-------")
let q6 = mostCommonGrant();
console.log(`What is the most common grant amount? $${q6[0]}, given out a total of ${q6[1]} times.`);


//Question 7
console.log("-------QUESTION 7-------")
let q7 = mostLeastZipcodes();
console.log(`What are the zipcodes that gained the most and least amount of grants? Most amount is zipcode ${q7[0]} with the amount $${q7[1]}, least amount of grants is zipcode ${q7[2]} with the amount $${q7[3]}.`);



//Question 8
console.log("-------QUESTION 8-------")
let q8 = getTotal()
console.log(`What is the program's total amount of grant? $${q8.toFixed(2)}.`)