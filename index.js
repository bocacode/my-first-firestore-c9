// import firebase-admin library
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
// import our credentials
import { service_account } from "./secrets.js";

// connect to my firebase PROJECT
initializeApp({
  credential: cert(service_account)
});

// once connected, connect to FireStore
const db = getFirestore();

// create our object
const food = {
  name: 'Pita Bread',
  style: 'Mediterranean',
  feeds: 4,
  price: 2.99,
  meal: 'appetizer',
  prepTime: '45 min',
  inStock: true,
  description: 'Light and fluffy flat bread. Goes great with hummus.',
}

// create a new document
// go into our database (db),
// go into the "foods" collection
// add a new document with the data above (food)

// db.collection("foods").add(food)
//   .then(doc => console.log('Added food ----> ', doc.id))
//   // .catch(err => console.error(err))
//   .catch(console.error);

db.collection("foods").get()
  .then(collection => {
    const foods = collection.docs.map(doc => {
      let food = doc.data();
      food.id = doc.id;
      return food;
      // return { ...doc.data(), id: doc.id };
    });
    console.log(foods);
  })
  .catch(console.error);