import { createStore, combineReducers, compose } from 'redux'; 
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import notifyReducer from './Reducers/notifyReducer';

const firebaseConfig = {
  apiKey: "AIzaSyCga0XOkabdH2FNPsA1uZVn9e1l8VswCx4",
  authDomain: "client-ab3af.firebaseapp.com",
  databaseURL: "https://client-ab3af.firebaseio.com",
  projectId: "client-ab3af",
  storageBucket: "client-ab3af.appspot.com",
  messagingSenderId: "230780297095"
};


//react-redux firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }

  // initialise firebase instance
  firebase.initializeApp(firebaseConfig);
  // initialise firestore
  //const firestore = firebase.firestore();

  // Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase) // <- needed if using firestore
  )(createStore);

  // Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer, // <- needed if using firestore
    notify: notifyReducer  
  });

  //create initial state
  const initialState={};

  //create store
  const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() 
  )
  );

  export default store;