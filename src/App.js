import React, {Component} from 'react';

class App extends React.Component{
  render(){
    const boss = '李云龙'
    const boss3 = '张大炮'
    //instead of the html tag, <h2> is a chunk of jsx syntax
    return (
      //if you hve more than one tag, you need to wrap the tag with <div> tag
      <div>
        <h2>独立团， 团长{boss}</h2>
        <FirstArmy boss2 = '张大喵'></FirstArmy>
        {/* <RidingTeam boss3 = '张大炮'></RidingTeam> */}
        <Riding boss4 = '张大大'></Riding>
        <h2>骑兵连连长 {boss3}</h2>
      </div>
    )

  }
}

// If the class only have render(){}, we can turn the class into function
function Riding(props){
  return <h2>骑兵连连长 {props.boss4}</h2>
}

// class RidingTeam extends React.Component{
//   render(){
//     return <h2>骑兵连连长 {this.props.boss3}</h2>
//   }
// }
class FirstArmy extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      solders: ['虎子','二子','陈达子']
    }
  }
  render(){
    const boss = '张大飚'
    return (  
      <div>
        <h2>一营营长， 营长{boss}，副营长{this.props.boss2}</h2>
        <ul>
          {this.state.solders.map(v=>{
            return <li key={v}>{v}</li>
          })}
        </ul>
      </div>
    )


  }
}



export default App