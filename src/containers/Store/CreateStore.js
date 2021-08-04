import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ArrowLogo from '../../assets/images/products/arrow.svg';
import { toast, ToastContainer, Slide } from 'react-toastify';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import classes from './Store.module.css';

import groupAvatar from '../../assets/images/uploadPlaceholder.svg';

import MoreLogo from '../../assets/images/home/category/more.svg';
import WomanAccesoriesLogo from '../../assets/images/home/category/womanaccesories.svg';
import WomanClothLogo from '../../assets/images/home/category/womancloth.svg';
import BookLogo from '../../assets/images/home/category/book.svg';
import TextBooksLogo from '../../assets/images/home/category/textbooks.svg';
import ElectronicsLogo from '../../assets/images/home/category/electronics.svg';
import SporsLogo from '../../assets/images/home/category/sports.svg';
import GamesLogo from '../../assets/images/home/category/games.svg';
import axios from '../../axios';

class CreateStore extends Component {
  state = {
    showError: false,
    name: '',
    description: '',
    web_address: '',
    type: '',
    active: 'false',
    image: null,
    imagePath: '',
  };

  componentDidMount() {
    this.props.onInitHomeCollections();
  }

  createStore = (e) => {
    e.preventDefault();

    if (this.state.name === '') {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error('Store name is required');
      }
      return false;
    } else if (this.state.description === '') {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error('Store Description is required');
      }
    } else if (this.state.type === '') {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error('Type is required');
      }
      return false;
    }
     else if (this.state.image_path === '') {
      if (!toast.isActive(this.toastId)) {
        this.toastId = toast.error('Image is required');
      }
      return false;
    }

    this.setState({ showError: true });

    const stores = {
      account: {
        name: this.state.name,
        description: this.state.description,
        web_address: '',
        images: [this.state.imagePath],
        address: this.state.web_address,
        type: this.state.type,
      },
    };
    // account: {
    //     category_id: ['251'],
    //     image_path:
    //       'https://storage.googleapis.com/tradlyapp/images/42979/02465724-e97b-40a8-af4a-95fdacb31ad0.jpeg',
    //     name: 'Heello 124',
    //     description: 'Mark',
    //     coordinates: {
    //       latitude: 26.444,
    //       longitude: 50.1235,
    //     },
    //     shipping_methods: [1],
    //     attributes: [
    //       {
    //         values: ['9626137045'],
    //         id: 52,
    //       },
    //     ],
    //     type: 'accounts',
    //   },
    console.log(stores)

    this.props.onCreateStore( stores , () =>
      this.props.history.push(`/storesuccess?id=${this.props.isAuthenticated}`)
    );
  };

  handleChange = (e) => {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value,
    });
    this.setState({ showError: false });
  };
  getType = (e) => {
    this.setState({
      type: e,
    });
    console.log(e);
  };

  imageUploadClick = () => {
    let fileInput = document.getElementById('fileInput');
    fileInput.click();
  };
  imageUpload = async (e) => {
    console.log(e.target.files[0]);
    this.setState({image:URL.createObjectURL(e.target.files[0])})
    var imgParm = [];
    var uploadBase64 = [];
    if (e.target.files[0] != null) {
      console.log('calling.......here');
      let fileName = e.target.files[0].name;
      if (fileName != null) {
        var splashDict = {
          name: e.target.files[0].name,
          type: e.target.files[0].type,
        };
        uploadBase64.push({
          file: 'data:image/png;base64,' + e.target.files[0],
        });
        imgParm.push(splashDict);
      }
    }
    // if (e.target.files[0] != null) {
    //   let fileName = e.target.files[0].name;
    //   if (fileName != null) {
    //     var androidIconDict = {
    //       name: e.target.files[0].name,
    //       type: e.target.files[0].type,
    //     };
    //     uploadBase64.push({
    //       file: 'data:image/png;base64,' + e.target.files[0].name,
    //     });
    //     imgParm.push(androidIconDict);
    //   }
    // }
    console.log('imgParm', imgParm);
    if (imgParm != 0) {
      const data = JSON.stringify(imgParm);
      var config = {
        method: 'post',
        url: 'v1/utils/S3signedUploadURL',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ files: imgParm }),
      };
      axios(config)
        .then((response) => {
         
          if (response.data.status) {
            console.log(response);
            console.log(response.data.data.result[0].fileUri);
            this.setState({ imagePath: response.data.data.result[0].fileUri });
          }
        })
        .catch((error) => {
          console.log(error);
        });
        console.log(this.state.image)
      // networkService.networkCall(
      //   APPURL.URLPaths.S3signedUploadURL, 'POST',  JSON.stringify({files: imgParm}),appConstant.bToken,appConstant.authKey );
      // if (responseJson['status'] == true) {
      //   var result = responseJson['data']['result'];
      //   console.log('result', result);
      //   var uploadIncrement = 0;
      //   for (let i = 0; i < imgParm.length; i++) {
      //     fetch(uploadBase64[i]['file']).then(async res => {
      //       const file_upload_res = await networkService.uploadFileWithSignedURL(
      //         result[i]['signedUrl'],
      //         imgParm[i]['type'],
      //         await res.blob(),
      //       );
      //       uploadIncrement++;
      //       if (this.state.photo != null) {
      //         if (this.state.photoURLPath.length == 0) {
      //           this.state.photoURLPath = result[i]['fileUri'];
      //         } else {
      //           this.state.documentURLPath = result[i]['fileUri'];
      //         }
      //       } else {
      //         this.state.documentURLPath = result[i]['fileUri'];
      //       }
      //       if (uploadIncrement === uploadBase64.length) {
      //         this.createAccountApi()
      //       }
      //     });
      //   }
      // } else {
      //   this.setState({ isVisible: false })
      //    Alert.alert(responseJson);
      // }
    }
    // else {
    //   this.createAccountApi()
    // }
  };
  render() {
    let redirectUrl = null;
    // if(!this.props.isAuthentication){
    //     redirectUrl = <Redirect to="/sign-in"/>
    // }
    const ActiveStyle = {
      backgroundColor: '#e7f8f3',
      border: '1px solid #13b58c',
    };
    const deactive = {};

    return (
      <Aux>
        {redirectUrl}
        <Backdrop show={this.props.loading} />
        <Spinner show={this.props.loading} />
        <ToastContainer
          autoClose={2000}
          position="top-center"
          transition={Slide}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <div className="row ">
          <div className="col-lg-12">
            <nav aria-label="breadcrumb">
              <ol className={classes.breadCrumb}>
                <li className="breadcrumb-item active" aria-current="page">
                  <Link to="/store">
                    <img src={ArrowLogo} alt="store" style={{ marginRight: '10px' }} />
                    Back to my store
                  </Link>
                </li>
              </ol>
            </nav>
          </div>

          <div className="col-lg-12">
            <div className={classes.mycontainer}>
              <div className={classes.groupcard}>
                <div className="row">
                  <div class="p-2">
                    <img className={classes.groupAvatar} src={this.state.image?this.state.image:groupAvatar} alt="Stores" />
                  </div>

                  <div class="p-2">
                    <div style={{ height: '0px', overflow: 'hidden' }}>
                      <input
                        type="file"
                        id="fileInput"
                        name="imageUpload"
                        accept="image/*"
                        onChange={this.imageUpload}
                      />
                    </div>
                    <button
                      className={classes.title}
                      onClick={this.imageUploadClick}
                      style={{ backgroundColor: 'white', border: 'none' }}
                    >
                      Add your store photo
                    </button>
                    {/* {this.state.image.length>0 && <img src={this.state.image[0]} alt="logo" />} */}
                  </div>
                </div>
              </div>

              <div className={classes.addgroup}>
                <div className="form-group mt-2 ">
                  <input
                    className={classes.input + ' form-control input-lg '}
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Store Name"
                  />
                </div>

                <div className="form-group mt-2 ">
                  <input
                    className={classes.input + ' form-control input-lg '}
                    name="web_address"
                    value={this.state.web_address}
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Store Web Address"
                  />
                </div>

                <div className="form-group mt-2">
                  <textarea
                    rows="4"
                    className={classes.input + ' form-control input-lg '}
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Store Description"
                    style={{ resize: 'none' }}
                  />
                </div>
              </div>

              <div className="text-center">
                <p style={{ fontWeight: 'bold' }}>Store Type</p>
              </div>
              <br />

              <div className="mt-2">
                <div className="col-lg-12 col-md-12">
                  <div
                    className="col-lg-12 category category-pills"
                    style={{
                      paddingRight: '100px',
                      paddingLeft: '100px',
                      display: 'flex',
                      flexWrap: 'wrap',
                    }}
                  >
                    {this.props.categories.map((category, i) => {
                      return (
                        <div className=" " key={i}>
                          <div
                            className={classes.wellCategory}
                            onClick={() => this.getType(category.name)}
                            style={this.state.type === category.name ? ActiveStyle : deactive}
                          >
                            <img
                              src={category.image_path}
                              alt={category.name}
                              title={category.name}
                            />
                            <p>{category.name}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="text-center" style={{ paddingBottom: '3em', paddingTop: '1em' }}>
                <button className="btnGreenStyle" onClick={this.createStore}>
                  Create Store
                </button>
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.store.loading,
    isAuthentication: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    userId: state.auth.userId,
    token: state.auth.token,
    categories: state.home.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateStore: (store, callBack) => dispatch(actions.CreateStore(store, callBack)),
    onInitHomeCollections: () => dispatch(actions.initHomeCollections()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateStore);
