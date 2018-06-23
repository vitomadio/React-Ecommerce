import React, { Component } from 'react';

class ProductForm extends Component {
  constructor(){
    super()
    this.state = {
      sku:"",
      brand: "", 
      model: "", 
      color: "",
      description: "",
      category:"", 
      subCategory:"",
      size:"", 
      price:0,
      qty:""
    }
  }

  render(){

    return (
      <div>
        <div className="row p-3">
            <h3 className="text-center mt-3 col-md-12">Add Product to Inventory</h3>
            <hr/>
            
            <form className="col-md-6">
            <div className="form-group ">
                <label for="sku">Brand:</label>
                <input type="text" placeholder="Insert Sku e.g. AAA-000" id="sku" name="sku" className="form-control"
                onChange={(e) => this.setState({sku: e.target.value})}
                />
                <small>*Sku is an identifying string (e.g. ABc124D-4gf)</small>
              </div>
              <div className="form-group ">
                <label for="brand">Brand:</label>
                <input type="text" placeholder="Insert Brand e.g. Nike" id="brand" name="brand" className="form-control"
                onChange={(e) => this.setState({brand: e.target.value})}
                />
              </div>
              <div className="form-group ">
                <label for="model">Model:</label>
                <input type="text" placeholder="Insert Model e.g. AirMax" id="model" name="model" className="form-control"
                onChange={(e) => this.setState({model: e.target.value})}
                />
              </div>
              <div className="form-group ">
                <label for="color">Color:</label>
                <input type="text" placeholder="Insert Color e.g. Blue" id="color" name="color" className="form-control"
                onChange={(e) => this.setState({color: e.target.value})}
                />
              </div>  
              <div className="form-group ">
                <label for="description">Description:</label>
                <textarea type="text" placeholder="Insert Description" id="description" name="description" className="form-control" rows="5"
                onChange={(e) => this.setState({description: e.target.value})}
                />
              </div>
              <div className="form-group ">
                <label for="price">Price:</label>
                <input type="text" placeholder="Insert Price e.g. 9.99" id="price" name="price" className="form-control"
                onChange={(e) => this.setState({price: e.target.value})}
                />
              </div>
            </form>

            <form className="col-md-6">

              <div className="form-group">
                <label for="categories">Select Category</label>
                <select class="custom-select" id="categories">
                  <option selected>Select Category</option>
                  <option value="" ></option>
                </select>
                <small>*If the category you're looking for doesn't exists you can create one.</small>
              </div>
              <div className="form-group">
                  <label for="addCategory">Add New Category: </label>
                <div className="input-group">
                  <input type="text" placeholder="Add new category" name="addCategory" id="addCategory" className="form-control"/>
                  <div className="input-group-append">
                    <span className="input-group-text"><i className="fas fa-plus"></i></span>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label for="subCategories">Select Sub-Category</label>
                <select class="custom-select" id="subCategories">
                  <option selected>Select Sub-Category</option>
                  <option value="" ></option>
                </select>
                <small>*If the sub-category you're looking for doesn't exists you can create one.</small>
              </div>
              <div className="form-group">
                <label for="addSubCategory">Add New Sub-Category: </label>
                <div className="input-group">
                  <input type="text" placeholder="Add new category" name="addSubCategory" id="addSubCategory" className="form-control"/>
                  <div className="input-group-append">
                    <span className="input-group-text"><i className="fas fa-plus"></i></span>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label for="size">Select Size</label>
                <select class="custom-select" id="size">
                  <option selected>Select Size</option>
                  <option value="" ></option>
                </select>
                <small>*If the size you're looking for doesn't exists you can create one.</small>
              </div>
              <div className="form-group">
                <label for="size">Add New Size: </label>
                <div className="input-group">
                  <input type="text" placeholder="Add new category" name="size" id="size" className="form-control"/>
                  <div className="input-group-append">
                    <span className="input-group-text"><i className="fas fa-plus"></i></span>
                  </div>
                </div>
              </div>

            </form>
        </div>
      </div>
    )
  }
}

const styles = {
  form: {
    width: "100%"
  }
}

export default ProductForm;
