import React, {Component} from 'react';

class App extends React.Component{
  render(){
    const boss = '李云龙'
    //instead of the html tag, <h2> is a chunk of jsx syntax
    return <h2>独立团， 团长{boss}</h2>
  }
}
class FirstArmy extends React.Component{
  render(){
    const boss = '张大飚'
    return <h2>一营营长， 营长{boss}</h2>
  }
}

export default App