//call to the getinitial data function to check the correct data is being retrieved with a given id
//check if the initial state is updated
const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");

// Set up the test environment
global.window = window;
global.document = window.document;

// Import the function to be tested
const {getReviews} = require("../src/slices/reviewSlice.jsx");

// Write a test case for the function
test("myFunction returns the correct value", () => {
  expect(getReviews("40344")).toBe([{"review_id":1277645,"rating":4,"summary":"looks great, NOT, go to SUNNY SIDE UP to get some real DRIP","recommend":false,"response":null,"body":"random text jake is cool fr, but also chefs it up it the kitchen","date":"2022-12-05T00:00:00.000Z","reviewer_name":"james","helpfulness":0,"photos":[]},{"review_id":1275262,"rating":5,"summary":"THIS IS SULLYS TEST TO THE DB","recommend":true,"response":null,"body":"I THINK THIS TEST SHOULD WORK. I REALLY HOPE THIS WORKS","date":"2022-06-13T00:00:00.000Z","reviewer_name":"SULLY TESTER","helpfulness":0,"photos":[]},{"review_id":1275259,"rating":2,"summary":"mynewreview","recommend":true,"response":null,"body":"thisisthebodyalsdkjflasdkjflaskdjflaksjdfl;akjsdlfkjasd;lkfjlaskdjflaksjdlfkjasdlkfjalskdjflaskdjflkasdjflkasdjflaksdjflsakj","date":"2022-06-12T00:00:00.000Z","reviewer_name":"dudeeee","helpfulness":0,"photos":[]},{"review_id":1275258,"rating":2,"summary":"mynewreview","recommend":true,"response":null,"body":"thisisthebodyalsdkjflasdkjflaskdjflaksjdfl;akjsdlfkjasd;lkfjlaskdjflaksjdlfkjasdlkfjalskdjflaskdjflkasdjflkasdjflaksdjflsakj","date":"2022-06-12T00:00:00.000Z","reviewer_name":"dudeeee","helpfulness":0,"photos":[]},{"review_id":1275254,"rating":2,"summary":"mynewreview","recommend":true,"response":null,"body":"thisisthebodyalsdkjflasdkjflaskdjflaksjdfl;akjsdlfkjasd;lkfjlaskdjflaksjdlfkjasdlkfjalskdjflaskdjflkasdjflkasdjflaksdjflsakj","date":"2022-06-12T00:00:00.000Z","reviewer_name":"dudeeee","helpfulness":0,"photos":[]}]);
});
