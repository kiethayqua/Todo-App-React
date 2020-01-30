import React, { Component } from "react";

class Sort extends Component {
  renderSort = () => {
    let {sortType, sortOrder} = this.props;
    if(sortType !== '' && sortOrder !== ''){
      return (
        <span className="label label-success label-medium">
          {sortType} - {sortOrder}
        </span>
      )
    }
  }

  handleClick = (sortType, sortOrder) => {
    this.props.handleSort(sortType, sortOrder);
  }
  render() {
    return (
      <div className="dropdown">
        <button
          className="btn btn-default dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          Sort by <span className="caret" />
        </button>
        <ul className="dropdown-menu">
          <li onClick={()=>this.handleClick('name', 'asc')}>
            <a role="button">Name ASC</a>
          </li>
          <li onClick={()=>this.handleClick('name', 'desc')}>
            <a role="button">Name DESC</a>
          </li>
          <li role="separator" className="divider" />
          <li onClick={()=>this.handleClick('level', 'asc')}>
            <a role="button">Level ASC</a>
          </li>
          <li onClick={()=>this.handleClick('level', 'desc')}>
            <a role="button">Level DESC</a>
          </li>
        </ul>
        {this.renderSort()}
      </div>
    );
  }
}

export default Sort;
