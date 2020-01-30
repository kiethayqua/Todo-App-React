import React, { Component } from "react";

class Form extends Component {
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
    });
  }

  render() {
    if(this.props.showForm === false) return null;
    return (
      <form className="form-inline">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Item Name"
            value={this.props.valueItem}
            onChange={(event)=>this.props.handleFormInputChange(event.target.value)}
          />
        </div>
        <div className="form-group">
          <select
            className="form-control"
            value={this.props.levelItem}
            onChange={(event)=>this.props.handleFormSelectChange(event.target.value)}
          >
            {this.renderLevel()}
          </select>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.props.handleFormClickSubmit}
        >
          Submit
        </button>
        <button
          type="button"
          className="btn btn-default"
          onClick={this.props.handleFormClickCancel}
        >
          Cancel
        </button>
      </form>
    );
  }
}

export default Form;
