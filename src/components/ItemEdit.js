import React, { Component } from "react";

class ItemEdit extends Component {
  renderLevel = () => {
    const {arrayLevel} = this.props;
    return arrayLevel.map((level, index)=>{
      switch(level){
        case 0:
          return <option key={index} value={level}>Low</option>
          break;
        case 1:
          return <option key={index} value={level}>Medium</option>
          break;
        case 2:
          return <option key={index} value={level}>High</option>
          break;
      }
    })
  }

  render() {
    return (
      <tr>
        <td className="text-center">{this.props.indexEdit}</td>
        <td>
          <input
            type="text"
            className="form-control"
            value={this.props.nameEdit}
            onChange={(event)=>this.props.handleEditInputChange(event.target.value)}
          />
        </td>
        <td className="text-center">
          <select 
            className="form-control" 
            value={this.props.levelEdit}
            onChange={(event)=>this.props.handleEditSelectChange(event.target.value)}
          >
            {this.renderLevel()}
          </select>
        </td>
        <td>
          <button type="button" className="btn btn-default btn-sm" onClick={()=>{this.props.handleEditClickCancel()}}> 
            Cancel
          </button>
          <button type="button" className="btn btn-success btn-sm" onClick={()=>this.props.handleEditClickSubmit()}> 
            Save
          </button>
        </td>
      </tr>
    );
  }
}

export default ItemEdit;
