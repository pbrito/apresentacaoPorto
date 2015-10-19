// Tutorial 12 - Provider-and-connect.js

import React from 'react'
import { connect } from 'react-redux'
// We use the same ES6 import trick to get all action creators and produce a hash like we did with
// our reducers. If you haven't yet, go get a look at our action creator (./actions-creators.js).
import * as actionCreators from './action-creators'


@connect((state/*, props*/) => {
    // This is our select function that will extract from the state the data slice we want to expose
    // through props to our component.
    return {
      reduxState: state,
      frozen: state._time.frozen,
      time: state._time.time
    }
})


export default class Home extends React.Component {
  constructor(props) {
   super(props);
    this.height =undefined;
 }

  onTimeButtonClick () {

    // This button handler will dispatch an action in response to a click event from a user.
    // We use here the dispatch function "automatically" provided by @connect in a prop.
    // There are alternatives way to call actionCreators that are already bound to dispatch and those
    // imply to provide the second parameter to 'connect':
    // https://github.com/rackt/react-redux/blob/v4.0.0/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
    this.props.dispatch(actionCreators.getTime())
  }

  // Check whether current mouse position is within a rectangle
  regionhit ( x,  y,  w,  h){
    var uistate=this.props.reduxState.mouseReducer
    if (uistate.mousex < x ||
      uistate.mousey < y ||
      uistate.mousex >= x + w ||
      uistate.mousey >= y + h)
      return false;
      return true;
    }


    componentDidUpdate(){
      if(this.height)
      {this.props.dispatch(this.height )
        this.height=undefined
      }

      console.log("###111#########");
    };

desenhaButao(id,top,left){

  //this.props.dispatch( {
    //    type: 'HOT_ITEM', id: "id"
    //  })


  var uistate=this.props.reduxState.mouseReducer;
 var hotitem="1"

  // Check whether the button should be hot
  if (this.regionhit(left, top, 64, 48))
  {
    hotitem = id;
    if (uistate.activeitem == 0 && uistate.mousedown)
      uistate.activeitem = id;
  }


var cor="red";
  if (uistate.hotitem == id)
{
  if (uistate.activeitem == id)
  {
    // Button is both 'hot' and 'active'
    cor="yellow";
  }
  else
  {
    // Button is merely 'hot'
    cor="blue";
  }
}
else
{
  // button is not hot, but it may be active
  cor="brown";
}
 var ret=0;
if (uistate.mousedown == 0 &&
      hotitem == id &&
      uistate.activeitem == id)
    ret= 1;
else  // Otherwise, no clicky.
  ret= 0;
  this.height=( {
                type: 'HOT_ITEM', id: hotitem
              })

return (
  <div style={{position: "absolute",
  top: top+"px",
  left: left+"px",
  backgroundColor: cor,
  width: 64+"px",
  height: "50px",
  textAlign: "center"
}}>{id}</div>)

 //
 //  if( uistate.hotitem!==undefined
 //  || (uistate.hotitem==undefined && this.regionhit ( 100,  300,   64, 48))
 //  )
 //  {     if (this.regionhit ( 100,  300, 64, 48) && uistate.hotitem!==num)
 //        {
 //          this.height=( {
 //               type: 'HOT_ITEM', id: num
 //             })
 //        }else
 //          if (this.regionhit ( 160,  300,   64, 48) && uistate.hotitem!==num)
 //           {
 //             this.height=( {
 //                  type: 'HOT_ITEM', id: num
 //                })
 //           }
 //
 //         else {
 //         }
 //  }
 //
 //
 // if (this.regionhit( left,top,  64, 48))
 // return(
 //   <div style={{position: "absolute",
 //   top: top+"px",
 //   left: left+"px",
 //   backgroundColor: "blue",
 //   width: 64+"px",
 //   height: "50px",
 //   textAlign: "center"
 //   }}>{num}</div>)
 //
 //  return(
 //    <div style={{position: "absolute",
 //    top: top+"px",
 //    left: left+"px",
 //    backgroundColor: "red",
 //    width: 64+"px",
 //    height: "50px",
 //    textAlign: "center"
 //    }}>{num}</div>)
 //
 //
}

  desenhaMenu(){
    return(<div>
      {this.desenhaButao(1,300,100)}
      {this.desenhaButao("ya",300,160)}
      {this.desenhaButao("no",300,220)}

      {/*
            <Menu
              menuStore={visibleTodos}
              onTodoClick={nome =>{
                dispatch(escolhePagina(nome))
              }} />

      */}      </div>)

  }

  render ( element,  container) {

    // Thanks to our @connect decorator, we're able to get the data previously selected through the props.
    var { frozen, time, reduxState } = this.props
    var attrs = {}

    if (frozen) {
        attrs = {
          disabled: true
        }
    }
    return (
      <div>
        <h1>Provider and @connect example</h1>
        <span>
          <b>What time is it?</b> { time ? `It is currently ${time}` : 'No idea yet...' }
        </span>
        <br />
        {/* We register our button handler here and use the experimental ES7 function's binding operator "::"
            to have our handler to be bound to the component's instance. */}
        <button { ...attrs } onClick={::this.onTimeButtonClick}>Get time!</button>
        <pre>
          redux state = { JSON.stringify(reduxState, null, 2) }
        </pre>
        {this.desenhaMenu()}
      </div>
    )
  }
}

// Go to ./13_final-words.js for our last advice about what to do now...
