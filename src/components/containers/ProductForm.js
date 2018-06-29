import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { ProductActions } from '../../actions'


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
      qty:"",
      selectedFile:null,
      tmppath: null
    }
  }

  componentDidUpdate(){
  }

  fileChangedHandler(e){
    e.preventDefault()
    const file = e.target.files[0]
    const tmppath = URL.createObjectURL(file);
    this.setState({
      selectedFile: e.target.files[0],
      tmppath: tmppath
    })
  }

  uploadHandler(e){
    e.preventDefault()
    const file = this.state.selectedFile
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    this.setState({
      selectedFile: null,
      tmppath: null
    })

    this.props.uploadPictures(formData, config)
  }

  render(){
    let dropzoneRef;
    
    const images = this.props.product.urls.map(image => {
      return (
       <div className="col-md-3">
         <img src={image} style={{width:60, height:60}} className="img-thumbnail ml-3 mt-3"/>
         <i class="far fa-times-circle ml-1" style={styles.imgIcon}
          onClick
         ></i>
       </div>
        )
    })

    return (
      <div>
        <div className="row p-3" style={styles.row}>
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
                <input type="text" placeholder="Insert Price e.g. 99.99" id="price" name="price" className="form-control"
                onChange={(e) => this.setState({price: e.target.value})}
                />
              </div>
              {/*<Dropzone onDrop={(files) => this.uploadPicture(files)}>
                <div>Try dropping some files here, or click to select files to upload.</div>
              </Dropzone>*/}
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="validatedCustomFile" required onChange={this.fileChangedHandler.bind(this)}/>
                <label class="custom-file-label" for="validatedCustomFile">{(this.state.selectedFile == null) ? null : this.state.selectedFile.name}</label>
              </div>
              <div className="row no-gutters align-items-center">
                <div className="col-md-3">
                  <button className="btn btn-primary mt-3" onClick={this.uploadHandler.bind(this)}>Upload</button>
                </div>
                  {(this.state.tmppath == null) ? null : <div className="col-md-3">
                     <img src={this.state.tmppath} style={{width:60, height:60}} className="img-thumbnail ml-3 mt-3"/>
                     <i className="far fa-times-circle" style={styles.imgIcon}
                      onClick
                     ></i>
                   </div>}
                 {images}
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
  }, 
  imgIcon: {
    position: 'relative',
    left: -21,
    top: -54,
    color: '#ddd',
    float: 'right'
  }
}

const stateToProps = (state) => {
  return {
    product: state.product
  }
}

const dispatchToProps = (dispatch) => {
  return {
    uploadPictures: (formData, config) => dispatch(ProductActions.uploadPictures(formData, config))
  }
}

export default connect(stateToProps, dispatchToProps)(ProductForm);
