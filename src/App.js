import React, { Component } from "react";
import Title from "./components/Title";
import Search from "./components/Search";
import Sort from "./components/Sort";
import Form from "./components/Form";
import ListItem from "./components/ListItem";
import Item from "./components/Item";
import Items from "./mockdata/Items";
import "../node_modules/sweetalert/dist/sweetalert.css";
import SweetAlert from "sweetalert-react";
import ItemEdit from "./components/ItemEdit";
import uuidv4 from 'uuid/v4'; // tu dong sinh id
import { orderBy as orderByld } from 'lodash'; // thu vien lodash co cac phuong thuc co san

class App extends Component {
  constructor(props) {
    super(props);
    let arrayLevel = [];
    if(Items.length > 0){
      for(let i = 0; i < Items.length; i++){
        if(arrayLevel.indexOf(Items[i].level) === -1){
          arrayLevel.push(Items[i].level);
        }
      }
    }
    arrayLevel.sort(function(a, b){return a - b}); // sap xep tu nho den lon
    this.state = {
      items: Items,
      showAlert: false,
      titleAlert: "",
      textAlert: "",
      idAlert: "",
      typeAlert: "",
      indexEdit: "",
      idEdit: "",
      nameEdit: "",
      levelEdit: 0,
      arrayLevel: arrayLevel,
      showForm: false,
      valueItem: "",
      levelItem: 0,
      sortType: '',
      sortOrder: '',
      searchItem: '',
    };
  }


  /* *******************************   DELETE    ***********************************************/
  handleShowAlert = item => {
    this.setState({
      showAlert: true,
      titleAlert: "Delete Item",
      textAlert: item.name,
      idAlert: item.id,
      typeAlert: "warning"
    });
  };

  handleDeleteItem = () => {
    let { idAlert, items } = this.state;
    if (items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === idAlert) {
          items.splice(i, 1);
          break;
        }
      }
    }
    setTimeout(() => {
      // sau 1 giay dong hop thoai popup (da hien thi xong trang thai thanh cong)
      this.setState({
        showAlert: false
      });
    }, 1000);

    this.setState({
      titleAlert: "Delete success!",
      typeAlert: "success"
    });
  };

/****************************************************************/


/* **********************************   EDIT    ********************************* */
  handleEditItem = (item, index) => {
    this.setState({
      indexEdit: index,
      idEdit: item.id,
      nameEdit: item.name,
      levelEdit: item.level
    });
  };

  handleEditClickCancel = () => {
    this.setState({ // ban dau idEdit rong khong render ItemEdit => dua ve trang thai rong ban dau(vi state thay doi nen tu dong render lai)
      idEdit: ''
    });
  }

  handleEditInputChange = (value) => {
    this.setState({
      nameEdit: value
    });
  }

  handleEditSelectChange = (value) => {
    this.setState({
      levelEdit: value
    });
  }

  handleEditClickSubmit = () => {
    let {items, idEdit, nameEdit, levelEdit} = this.state;
    if(items.length > 0){
      for(let i = 0; i < items.length; i++){
        if(items[i].id === idEdit){
          items[i].name = nameEdit;
          items[i].level = +levelEdit;
          break;
        }
      }
    }
    this.setState({
      idEdit: ''
    });
  }

/**********************************************************/



/*******************************   ADD   ******************************/
  handleShowForm= () => {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  handleFormInputChange = (value) => {
    this.setState({
      valueItem: value
    });
  }

  handleFormSelectChange = (value) => {
    this.setState({
      levelItem: value
    });
  }

  handleFormClickCancel = () => {
    this.setState({
      valueItem: '',
      levelItem: 0
    });
  }

  handleFormClickSubmit = () => {
    let {valueItem, levelItem} = this.state;
    if(valueItem.trim() === 0) return false;
    let newItem = {
      id: uuidv4(),
      name: valueItem,
      level: +levelItem
    }
    Items.push(newItem);
    this.setState({
      items: Items,
      valueItem: '',
      levelItem: 0,
      showForm: false
    });
  }

/**************************************************************************/

/*********************  SORT  ******************************************/
  handleSort = (sortType, sortOrder) => {
    console.log(sortType + "-" + sortOrder);
    this.setState({
      sortType: sortType,
      sortOrder: sortOrder
    });
    let {items} = this.state;
    this.setState({
      items: orderByld(items, [sortType],[sortOrder]) // sort trong lodash: https://lodash.com/docs/4.17.15#orderBy
    });
  }


/************************************************************************/

/*********************  SEARCH    ***************************/
  handleSearchInputChange = (value) => {
    let {items, searchItem} = this.state;

    if(value.length === 0){
      this.setState({
        items: Items
      });
    }

    else if(value.length > 0){
      const newArr = [];
      Items.map(item=>{
        if(item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1){
          newArr.push(item);
        }
      })
      this.setState({
        items: newArr
      })
    }

    this.setState({
      searchItem: value
    });
  }

  handleClearSearch = () => {
    this.setState({
      searchItem: '',
      items: Items
    });
  }


/*************************************************************/

  renderItem = () => {
    const {
      items,
      idEdit,
      indexEdit,
      nameEdit,
      levelEdit,
      arrayLevel } = this.state;

    if (items.length === 0) { // neu khong co Item render Item dac biet
      return <Item
        item={0}
      />;
    }

    return items.map((item, index) => { // duyet tat ca Item
      if (item.id === idEdit) { // neu an vao edit => lay id so sanh render ItemEdit
        return (
          <ItemEdit
            key={index}
            indexEdit={indexEdit}
            nameEdit={nameEdit}
            levelEdit={levelEdit}
            arrayLevel={arrayLevel}
            handleEditClickCancel={this.handleEditClickCancel}
            handleEditInputChange={this.handleEditInputChange}
            handleEditSelectChange={this.handleEditSelectChange}
            handleEditClickSubmit={this.handleEditClickSubmit}
          />
        );
      }
      return ( // con lai thi render ra Item
        <Item
          key={item.id}
          item={item}
          index={index}
          handleShowAlert={this.handleShowAlert}
          handleEditItem={this.handleEditItem}
        />
      );
    });
  };

  render() {
    return (
      <div className="container">
        <SweetAlert
          show={this.state.showAlert}
          title={this.state.titleAlert}
          type={this.state.typeAlert}
          text={this.state.textAlert}
          showCancelButton
          onOutsideClick={() => this.setState({ showAlert: false })}
          onEscapeKey=   {() => this.setState({ showAlert: false })}
          onCancel=      {() => this.setState({ showAlert: false })}
          onConfirm=     {() => this.handleDeleteItem()}
        />
        <Title />
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <Search
              searchItem=              {this.state.searchItem}
              handleSearchInputChange= {this.handleSearchInputChange}
              handleClearSearch=       {this.handleClearSearch}
            />
          </div>
          <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <Sort
              sortType=  {this.state.sortType}
              sortOrder= {this.state.sortOrder}
              handleSort={this.handleSort}
            />
          </div>
          <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
            <button
              type="button"
              className="btn btn-info btn-block marginB10"
              onClick={this.handleShowForm}
            >
              { (this.state.showForm) ? 'Close Item' : 'Add Item' }
            </button>
          </div>
        </div>
        <div className="row marginB10">
          <div className="col-md-offset-7 col-md-5">
            <Form
              showForm=              {this.state.showForm}
              arrayLevel=            {this.state.arrayLevel}
              valueItem=             {this.state.valueItem}
              levelItem=             {this.state.levelItem}
              handleFormInputChange= {this.handleFormInputChange}
              handleFormSelectChange={this.handleFormSelectChange}
              handleFormClickCancel= {this.handleFormClickCancel}
              handleFormClickSubmit= {this.handleFormClickSubmit}
            />
          </div>
        </div>
        <ListItem renderItem={this.renderItem} />
      </div>
    );
  }
}

export default App;
