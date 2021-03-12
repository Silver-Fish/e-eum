import {createStore} from 'redux'
export default createStore(function(state, action) {

  if(state === undefined){
    return {isModal:false}
  } 
  if (action.type === 'ISMODAL'){
    return {isModal:state.isModal}
  }
  
  return state;
},window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())