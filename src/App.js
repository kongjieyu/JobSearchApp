import React, {Component} from 'react';
import { Button, List } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

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
    //bind（）;因为下方button中this.addSolders触发后，其实它是找不addSholder中的this的，这个时候需要我们绑定一下
    //this.addSolders = this.addSolders.bind(this)
  }
  componentWillMount() {
    console.log('组件马上就要加载')
  }
  componentDidMount() {
    console.log('组件加载完毕')
  }
  addSolders(){
    console.log('组件在add里加载')
    console.log('Add new Solders')
    this.setState({
      // 拼接数组用逗号
      solders: [...this.state.solders, '新兵蛋子' + Math.random()]
    })
  }

  render(){
    console.log('组件正在加载')
    const boss = '张大飚'
    return (  
      <div>
        <h2>一营营长， 营长{boss}，副营长{this.props.boss2}</h2>
        <Button type="primary" onClick={()=>this.addSolders()}>新兵入伍</Button>
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