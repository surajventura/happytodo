import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
//reducers



const firebaseConfig = {
  apiKey: "AIzaSyD67_qcqi3YuOPPDQXCvtzuL7o0D5sY67A",
  authDomain: "happytodo-a4ac1.firebaseapp.com",
  databaseURL: "https://happytodo-a4ac1.firebaseio.com",
  projectId: "happytodo-a4ac1",
  storageBucket: "happytodo-a4ac1.appspot.com",
  messagingSenderId: "511435517099"
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}


//Init firebase instance
firebase.initializeApp(firebaseConfig);
//Init firestore
//const firestore = firebase.firestore(); 

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
   reduxFirestore(firebase) 
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer 
});

const initialState = {};

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
 // applyMiddleware(...middleware),
  // other store enhancers if any
);



//create Store

const store = createStoreWithFirebase(rootReducer, initialState, compose(
  reactReduxFirebase(firebase),
  enhancer
));

export default store;