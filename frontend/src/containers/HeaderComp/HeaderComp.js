import HeaderComp from "../../components/HeaderComp/HeaderComp";
import { connect } from "react-redux";


function mapStateToProps(state){
  
  return {
    isModal:state.isModal
    
  }
}
function mapDispatchToProps(dispatch){
  return {
    onClick:function(isModal){
      dispatch({type:'ISMODAL', isModal:isModal})
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderComp);
