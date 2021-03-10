import HeaderModal from "../../components/HeaderComp/HeaderModal";
import { connect } from 'react-redux';


function mapStateToProps(state){
  console.log(state)
  return {
    isModal:state.isModal
  }
}

function mapDispatchToProps(dispatch){
  return {
    // 프로퍼티 이름으로
    onClick:function(isModal){
      dispatch({type:'ISMODAL', isModal:isModal})
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderModal);