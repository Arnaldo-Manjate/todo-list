import React,{Component} from 'react';
import './ListItem.css';


// I changed ListItem to a class based Component be able to use react-flip-move in App.js
class ListItem extends Component {

    state = {
        name :""
    }

    render(){
        return (
            <div >
                <div className="list-item">
                    <li id="li">
                        <input onChange={this.props.update} value={this.props.task}/>
                    </li>
                    <span onClick={this.props.click}>Delete Item</span>
                </div>
               
            </div>
        );
    }

}

export default ListItem;