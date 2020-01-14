import React ,{Component}from 'react';
import './App.css';
import ListItem from './components/ListItem/ListItem';
import Flipmove from 'react-flip-move';

class App extends Component{

  state = {
    list : [],
    newItem : ""
  }

  // handleInputChange is responsible for changing the value in a given inupt and displaying it on the screen
  handleInputChange(key,event){
    let value = event.target.value;
    this.setState({
      [key] : value
    });
  }

  // handleAddItem is responsible for adding our tasks to the list of tasks
  handleAddItem(event,task){
    
    event.preventDefault();

    // Todo : Check if the task contains alphabetical letters using regex

    if(task ==="" || (task.charCodeAt(0) === 32 && task.length === 1)) {
      alert("You Must type in a task before Clicking the Add Button")
      return;
    }

    let itemObject = { 
      key : 1 + Math.random(),
      task
    }

    if (task !== "" || task !== " "){
      let list = [...this.state.list];
      list.push(itemObject);
      console.log(list);

      this.setState( (prevState,props) => {
        // at a later stage if we want to check PrevState we can do it here
       return { list : list, newItem: ""};
      });
    
  }
}
  // handleDeleteItemis responsible deleting items from the list of items in state
  handleDeleteItem(id){
    const tempList = [...this.state.list];
    console.log("tempList copy from state:",tempList);
    const list = tempList.filter( item => item.key !== id);
    console.log("list that got deleted from:",list);

    this.setState({list});
  }

  // handleUpdate updates the value that gets displayed in the input of a specific task 
  // we use the id to identify which task is being updated
  handleUpdate(event,id){
    let newValue = event.target.value;
    let list = [...this.state.list];

    let index = list.findIndex(item => item.key === id);
    list[index].task = newValue;
    this.setState(list);
  } 
 

render(){

  let tasks = null;

  if(this.state.list.length > 0){
    tasks = this.state.list.map(item => <ListItem 
                                        key={item.key} 
                                        task={item.task} 
                                        click={() => this.handleDeleteItem(item.key)}
                                        update={(e) => this.handleUpdate(e ,item.key)}/>);
  } 

  return (
    <div className="App">
      <h1>My Todo List</h1>
      <form id="form-input" > 
        <input type="text" placeholder="Enter Task" value={this.state.newItem} onChange={(e) => this.handleInputChange("newItem",e)}/>
        <br/>
        <button onClick={(e) => this.handleAddItem(e,this.state.newItem)}>Add Item</button>
      </form>
      <br/>
      <h3>T a s k s</h3>
      <Flipmove duration={300} easing="ease-in-out">
        { tasks }
      </Flipmove>
    </div>
  );
}

}

export default App;
