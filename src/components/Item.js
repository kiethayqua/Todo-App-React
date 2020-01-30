import React, { Component } from "react";

class Item extends Component {
  render() {
    let { item, index } = this.props; 
    if (item === 0) { // neu this.props.item === 0 thi render nhu ben duoi
      return (
        <tr>
          <td colSpan="4" className="text-center">
            <h4>No Item</h4>
          </td>
        </tr>
      );
    }
    let classNameLabel = "";
    let nameLabel = "";
    switch (item.level) {
      case 1:
        classNameLabel = "label label-warning";
        nameLabel = "Medium";
        break;
      case 2:
        classNameLabel = "label label-danger";
        nameLabel = "High";
        break;
      default:
        classNameLabel = "label label-info";
        nameLabel = "Low";
        break;
    }

    return (
      <tr>
        <td className="text-center">{this.props.index}</td>
        <td>{this.props.item.name}</td>
        <td className="text-center">
          <span className={classNameLabel}>{nameLabel}</span>
        </td>
        <td>
          <button 
            type="button" 
            className="btn btn-warning btn-sm"
            onClick={()=> this.props.handleEditItem(item, index)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => this.props.handleShowAlert(item)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default Item;
