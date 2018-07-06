import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { ProductActions, MisceActions } from '../../actions'


class ProductForm extends Component {
  constructor(){
    super()
    this.state = {
      sku:"",
      brand:"", 
      model:"", 
      color:"",
      description:"",
      category:"", 
      subCategory:"",
      size:"", 
      price:0,
      qty:"",
      taxFee:0,
      selectedFile:null,
      tmppath: null,
      tmpUrls:[],
      files: [],
      newCategory:"",
      newSubCategory:"",
      newSize:""
    }
  }

  componentDidMount(){
    this.props.loadDashboard()
  }

  fileChangedHandler(files){
    // e.preventDefault()
    const file = files[0]
    const path = URL.createObjectURL(file);
    const filesAccepted = []
    
    filesAccepted.unshift({url:path})
    this.setState({
      files: filesAccepted,
      selectedFile: file,
      tmppath: path,
      
    })
  }

  uploadHandler(e){
    e.preventDefault()
    const file = this.state.selectedFile
    const filesPrev = Object.assign([], this.state.tmpUrls)
    filesPrev.push(file.preview)
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    this.setState({
      selectedFile: null,
      tmppath: null,
      tmpUrls:filesPrev
    })
    this.props.uploadPictures(formData, config)
  }

  deletePicture(imageUrl,i,e){
    e.preventDefault()
    const body = {
      url:imageUrl,
      idx: i
    }
    this.props.deletePicture(body)
  }

  dragStart(e) {
    e.dataTransfer.setData("src", e.target.id);
  }

  allowDrop(e){
    e.preventDefault()
  }
  //ON DROP FUNCTION AFTER DROPING A PICTURE TO ITS NEW POSITION
  onDropSwap(e){
    e.preventDefault()
    var old_idx = e.dataTransfer.getData("src");
    var new_idx = e.currentTarget.id
    var newArray = this.array_move(this.state.tmpUrls, old_idx, new_idx)

    this.setState({tmpUrls: newArray})
  }
  //CHANGE PICTURES POSITIONS ON ARRAY.
  array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
  };

  //ADD NEW CATEGORY TO THE LIST.
  addNewCategory(e){
    e.preventDefault()
    const name = this.state.newCategory.toUpperCase()
    this.props.addNewCategory(name)
    .then(data => {
      this.setState({newCategoryMsg:data.data.message})
      setTimeout(() => this.setState({newCategoryMsg:null}), 3000)
    })
  }

  addNewSubCategory(e){
    e.preventDefault()
    const name = this.state.newSubCategory.toUpperCase()
    const category = this.state.category
    const body = {
      name: name,
      category: category
    }
    console.log(category)
     this.props.addNewSubCategory(body)
    .then(data => {
      this.setState({newSubCategoryMsg:data.data.message})
      setTimeout(() => this.setState({newSubCategoryMsg:null}), 3000)
    })
  }

  setCategory(e){
    e.preventDefault()
    this.setState({category:e.target.value})
    this.props.fetchSubCategories(e.target.value)
  }

  render(){
    let dropzoneRef;
    
    let images = this.state.tmpUrls.map((image, i) => {
      var id = image.slice(9)
      return (
       <div className="col-md-3 p-0" id={i} onDrop={this.onDropSwap.bind(this)} onDragOver={this.allowDrop.bind(this)} draggable="false">
         <img src={image} style={{width:90, height:90}} className="img-thumbnail" draggable="true" onDragStart={this.dragStart.bind(this)} id={i}/>
         <i className="far fa-times-circle ml-1" style={styles.imgIconSmall}
          onClick={this.deletePicture.bind(this)}
         ></i>
         <small>picture {i+1}</small>
       </div>
        )
    })

    let categories  = this.props.misc.categoryList.map((category) => {
      return (
          <option value={category.name} 
            onClick={this.setCategory.bind(this)}
          >{category.name}</option>
        )
    })

    let subCategories  = this.props.misc.subCategoryList.map((subCategory) => {
      return (
          <option value={subCategory.name} 
            onClick={(e)=>this.setState({category:e.target.value})}
          >{subCategory.name}</option>
        )
    })
    

    return (
      <div>
        <div className="row p-3" style={styles.row}>
            <h3 className="text-center mt-3 col-md-12">Add Product to Inventory</h3>
            <hr/>
            
            <form className="col-md-6">
            <div className="form-group ">
                <label for="sku">SKU:</label>
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
              <div className="form-group">
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
              <hr/>
              <small className="mb-1">Make sure your main image is in first position, oterwise drag and drop it in its right place.</small>
              <div className="row pl-3">
                <Dropzone onDrop={this.fileChangedHandler.bind(this)} style={styles.dropzone}>
                  {(this.state.tmppath == null) ? <p className="text-center">Select main picture first</p> : <div className="p-1">
                       <img src={this.state.tmppath} style={{width:90, height:90}} className="img-thumbnail"/>
                       <i className="far fa-times-circle" style={styles.imgIcon}
                        onClick={()=>this.setState({tmppath:""})}
                       ></i>
                     </div>}
                </Dropzone>
                {images}
              </div>

              <div className="row no-gutters align-items-center">
                <div className="col-md-3">
                  <button className="btn btn-primary mt-3" onClick={this.uploadHandler.bind(this)}>Upload</button>
                </div>
              </div>
            </form>
            {/*RIGHT SIDE FORM*/}
            <form className="col-md-6">
              {/*SELECT CATEGORY*/}
              <div className="form-group">
                <label for="categories">Select Category</label>
                <select class="custom-select" id="categories">
                  <option selected>Select Category</option>
                   {categories}
                </select>
                <small>*If the category you're looking for doesn't exists you can create one.</small>
              </div>
              <div className="form-group">
                  {this.state.newCategoryMsg ? <div className="alert alert-success mb-0 p-1 text-center">{this.state.newCategoryMsg}</div> : null}
                  <label for="addCategory">Add New Category: </label>
                <div className="input-group">
                  <input type="text" placeholder="Add new category" name="addCategory" id="addCategory" className="form-control"
                    onChange={(e) => this.setState({newCategory:e.target.value})}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text"
                      onClick={this.addNewCategory.bind(this)}
                    ><i className="fas fa-plus"></i></span>
                  </div>
                </div>
              </div>
              {/*SELECT SUB-CATEGORY*/}
              <div className="form-group">
                <label for="subCategories">Select Sub-Category</label>
                <select class="custom-select" id="subCategories">
                  <option selected>Select Sub-Category</option>
                  {subCategories}
                </select>
                <small>*If the sub-category you're looking for doesn't exists you can create one.</small>
              </div>
              <div className="form-group">
                 {this.state.newSubCategoryMsg ? <div className="alert alert-success mb-0 p-1 text-center">{this.state.newSubCategoryMsg}</div> : null}
                <label for="addSubCategory">Add New Sub-Category: </label>
                <div className="input-group">
                  <input type="text" placeholder="Add new Sub-Category" name="addSubCategory" id="addSubCategory" className="form-control"
                    onChange={(e) => this.setState({newSubCategory:e.target.value})}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text"
                      onClick={this.addNewSubCategory.bind(this)}
                    ><i className="fas fa-plus"></i></span>
                  </div>
                </div>
                  <small className="mt-1">*Make sure you have a category seleted before submit new sub-category.</small>
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
                  <input type="text" placeholder="Add new size to the list e.g. S-M-L or 8.5-9-10" name="size" id="size" className="form-control"/>
                  <div className="input-group-append">
                    <span className="input-group-text"><i className="fas fa-plus"></i></span>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label for="tax">Tax Fee</label>
                <input placeholder="Tax Fee e.g. 20" name="tax" className="form-control"
                  onChange={(e) => this.setState({taxFee:e.target.value})}
                />
              </div>

            </form>
        </div>
      </div>
    )
  }
}

const styles = {
  row: {
    marginTop:2+"em"
  },
  form: {
    width: "100%"
  }, 
  dropzone: {
    width:100,
    height:100,
    border:'2px dashed #696969',
    borderRadius:3,
    cursor:'pointer',
    marginRight:1+'em'
  },
  imgIcon: {
    position: 'relative',
    left:-5,
    top:-84,
    color:'#999',
    float:'right',
    cursor:'pointer'
  },
  imgIconSmall: {
    position: 'relative',
    left:-22,
    top:-88,
    color: '#999',
    float: 'right',
    cursor:'pointer'
  },
}

const stateToProps = (state) => {
  return {
    product: state.product,
    misc: state.misc
  }
}

const dispatchToProps = (dispatch) => {
  return {
    uploadPictures: (formData, config) => dispatch(ProductActions.uploadPictures(formData, config)),
    deletePicture: (body) => dispatch(ProductActions.deletePicture(body)),
    addNewCategory: (name) => dispatch(MisceActions.addNewCategory(name)),
    addNewSubCategory: (body) => dispatch(MisceActions.addNewSubCategory(body)),
    loadDashboard: () => {
      dispatch(MisceActions.fetchCategories()),
      dispatch(MisceActions.fetchSizes())
    },
    fetchSubCategories: (categoryName) => dispatch(MisceActions.fetchSubCategories(categoryName))
  }
}

export default connect(stateToProps, dispatchToProps)(ProductForm);
