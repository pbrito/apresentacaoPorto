// Tutorial 12 - Provider-and-connect.js

// Our tutorial is almost over and the only missing piece to leave you with a good overview of Redux is:
// How do we read from our store's state and how do we dispatch actions?

// Both of these questions can be answered using a single react-redux's binding: @connect class decorator.

// As we explained previously, when using the Provider component, we allow all components of our app to
// access Redux. But this access can only be made through the undocumented feature "React's context". To
// avoid asking you to use such "dark" React API, Redux is exposing a decorator (an ES7 feature that
// makes it possible to annotate and modify classes and properties at design time -
// https://github.com/wycats/javascript-decorators) that you can use on a component class.

// The "connect" decorator literally connects your component with your Redux's store. By doing so,
// it provides your store's dispatch function through a component's prop and also adds any
// properties you want to expose part of your store's state.

// Using @connect, you'll turn a dumb component (https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0),
// into a smart component with very little code overhead.

import React from 'react'
import { connect } from 'react-redux'
// We use the same ES6 import trick to get all action creators and produce a hash like we did with
// our reducers. If you haven't yet, go get a look at our action creator (./actions-creator.js).
import * as actionCreators from './action-creators'

// The "connect" decorator takes as its only parameter, a function that will select which slice of your
// state you want to expose to your component. This function is logically called a "selector" and
// receives 2 parameters: the state of your store and the current props of your component.
// The props of the component are provided to handle common case like extracting a slice of your
// state depending on a prop value (Ex: state.items[props.someID]).
@connect((state /*, props*/) => {
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
    this.height =[];
    var uistate=this.props.reduxState.mouseReducer
    if(uistate.activeitem!==0 )
     this.height.push( {
            type: 'ACTIVE_ITEM', id: 0
    })



 }

  onTimeButtonClick () {
    // This button handler will dispatch an action in response to a
    // click event from a user. We use here the dispatch function provided by @connect in a prop.
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

 if(this.height.length>1)
 {
  //  alert("zzzzzz")
  //  alert(this.height.length)
  // this.height.map(
  //   a=>console.log(a.id+"  zzzzz  "+a.type)
  // )
  //  this.height.map( act =>
  //     //this.props.dispatch(act)
  //     alert("\nKAAABOOMMMM\n\n"+act.id+"  "+act.type+" \n ")
  //  )
     this.props.dispatch(this.height[this.height.length-1])
}
else {
if(this.height[0]){
  this.props.dispatch(this.height[0])}
}

this.height=[]
};



desenhaButao(num,top,left){

  //this.props.dispatch( {
    //    type: 'HOT_ITEM', id: "id"
    //  })


    var uistate=this.props.reduxState.mouseReducer;
  //
  //
  // if (this.regionhit ( left ,  top , 60,  48)){
  //     if(uistate.hotitem!==num )
  //       this.height.push( {
  //                    type: 'HOT_ITEM', id: num
  //                  })
  //  if (uistate.mousedown){
  //    if(uistate.activeitem!==num )
  //     {
  //       console.log("@@"+uistate.activeitem);
  //        this.height.push( {
  //               type: 'ACTIVE_ITEM', id: num
  //             })}
  //           }
  // }




//_________________

console.log("xxxxx"+uistate.mousex+uistate.mousey);
  if (uistate.activeitem == num)
    {  if (uistate.mouseup)
          {
          if(uistate.hotitem==num )  {
              alert("click")
          }
          // set notActive
          if(uistate.activeitem!==0 )
           {
             this.height.push( {
                  type: 'ACTIVE_ITEM', id: 0
                })
            }
        }
    }
  else{
      if(uistate.hotitem==num )
          if (uistate.mousedown){
             if(uistate.activeitem!==num )
              this.height.push( {
                     type: 'ACTIVE_ITEM', id: num
                   })
          }
  }
  //if inside
  if (this.regionhit ( left ,  top , 60,  48)){
            if(uistate.activeitem==0 )
              {
                if(uistate.hotitem!==num )
                this.height.push( {
                   type: 'HOT_ITEM', id: num
                 })
               }
            if(uistate.activeitem==num ){
              if(uistate.hotitem!==num )
              this.height.push( {
                 type: 'HOT_ITEM', id: num
               })
            }
    }
    //if outside
    if (!this.regionhit ( left ,  top , 60,  48)){

                  if(uistate.hotitem==num )
                  this.height.push( {
                     type: 'HOT_ITEM', id: 0
                   })


      }




    var cor;


          if (uistate.activeitem == num)
          {
                if (uistate.hotitem == num)
              {
                // Button is merely 'hot'
                  cor="brown"
              }else
                // Button is both 'hot' and 'active'
                  cor="yellow";
          }


        else
        {
              if (uistate.hotitem == num)
            {
              // Button is merely 'hot'
                cor="green"
            }else
          // button is not hot, but it may be active
           cor="blue"
        }




 //if (this.regionhit( left,top, width, 49))
 return(
   <div style={{position: "absolute",
   top: top+"px",
   left: left+"px",
   backgroundColor: cor,
   width: 64+"px",
   height: "48px",
   textAlign: "center"
   }}>{num}</div>)

  return(
    <div style={{position: "absolute",
    top: top+"px",
    left: left+"px",
    backgroundColor: "red",
    width: 64+"px",
    height: "48px",
    textAlign: "center"
    }}>{num}</div>)
}


desenhaTexto(top,left,text){
  return(
  <div style={{position: "absolute",
  top: top+"px",
  left: left+"px",
backgroundColor:"red"}}><h1>{text.slice(0,15)} </h1>
<h1>{text.slice(15,75)} </h1>
  </div>
  )
}

doOverlap( rect1 , rect2){
  if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.height + rect1.y > rect2.y) {
    // collision detected!
    return true;
  }
  return false;
}

desenhaMenu(){
  if(bo)   return( this.desenhaTexto(300,200,"Learn some Math you Dumb designers"))

  var {reduxState } = this.props

  var buts=reduxState.pagina[0].menu.map(
    a=> this.desenhaButao(a.Butao[0],a.Butao[1],a.Butao[2])
  )
 var a=reduxState.pagina[0].menu[2]

  var b=reduxState.pagina[0].menu[3]

  var bo=this.doOverlap({y:a.Butao[1],x:a.Butao[2],width: 64,height: 48},
                        {y:b.Butao[1],x:b.Butao[2],width: 64,height: 48})




  return(
    <div>{(buts)}</div>
  )

}



  render () {
    // Thanks to our @connect decorator, we're able to get the data previously selected through the props.
    var { frozen, time, reduxState } = this.props
    var attrs = {}

    if (frozen) {
        attrs = {
          disabled: true
        }
    }

    return (
      <div    style={{MozUserSelect: "-moz-none",
   KhtmlUserSelect: "none",
   WebkitUserSelect: "none",userSelect: "none"}}
>
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

// Go to ./final-words.jsx for our last advice about what to do now...
