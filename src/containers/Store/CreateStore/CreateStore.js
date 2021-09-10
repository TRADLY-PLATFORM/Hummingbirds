import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import ArrowLogo from '../../../assets/images/products/arrow.svg';
import { toast, ToastContainer, Slide } from 'react-toastify';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import classes from './CreateStore.module.css';

import groupAvatar from '../../../assets/images/uploadPlaceholder.svg';

import axios from '../../../axios';
import axios2 from 'axios';
import imageToBase64 from 'image-to-base64/browser';
import Toast from '../../../components/UI/Toast/Toast';

import locationImage from '../../../assets/images/store/location.png';
import locationListImage from '../../../assets/images/store/locationList.png';

import closeImage from '../../../assets/images/store/close.png';
import { useEffect } from 'react';
import { selectUserId } from '../../../store/selectors/auth';
import Attribute from './Attribute';

const CreateStore = () => {
  const [showError, setShowError] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState(null);
  const [store_address, setStore_address] = useState('');
  const [active, setActive] = useState('');
  const [image, setImage] = useState(null);
  const [imagePath, setImagePath] = useState('');
  const [base64, setBase64] = useState({});
  const [coordinates, setCoordinates] = useState(null);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.accountCategories());
  }, [0]);

  const history = useHistory();

  // State from Redux
  const loading = useSelector((state) => state.store.loading);
  const isAuthentication = useSelector((state) => state.auth.token !== null);
  const authRedirectPath = useSelector((state) => state.auth.authRedirectPath);
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const categories = useSelector((state) => state.store.categories);
  const addresses = useSelector((state) => state.store.addresses);
  const fileURL = useSelector((state) => state.store.file);
  const attribute = useSelector((state) => state.store.attribute);
  const isAuthenticated = useSelector((state) => selectUserId(state));
 const errorMessage = useSelector((state) => state.store.message);
   const [attributeData, setAttributeData] = useState(null);


   
  // function
  const createStore = (e) => {
    e.preventDefault();
    let call;

    if (name === '') {
      toast.error('Store name is required');
      call = false;
      return false;
    } else if (description === '') {
      toast.error('Store Description is require');
      call = false;
      return false;
    } else if (type === null) {
      toast.error('Type is required');
      call = false;
      return false;
    }

    if (file !== null) {
      const contentType = file.type;
      let fileName = file.name;
      dispatch(
        actions.initFile(
          fileName,
          contentType,
          name,
          type.id,
          description,
          coordinates,
          base64,
          attributeData,
          () => history.push(`/storesuccess?id=${isAuthenticated}`)
        )
      );
 
    } else {
      
      const stores = {
        account: {
          name: name,
          category_id: [type.id],
          description: description,
          image_path: '',
          web_address: '',
          coordinates: coordinates,
          type: 'accounts',
          attributes: attributeData ? attributeData : [{}],
        },
      };

      console.log(stores);

      dispatch(
        actions.CreateStore(stores, () => history.push(`/storesuccess?id=${isAuthenticated}`))
      );
    }

    setShowError(false);
  };

  const handleChange = (e) => {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    if (name === 'name') {
      setName(value);
    } else if (name === 'description') {
      setDescription(value);
    }
    setShowError(false);
  };

  // Get Category Type:
  const getType = (category) => {
    setAttributeData(null);
    setType(category);
     dispatch(actions.initAttribute(category.id,'accounts'));
  };

  const imageUploadClick = () => {
    let fileInput = document.getElementById('fileInput');
    fileInput.click();
  };
  const imageUpload = async (e) => {
    console.log('====================================');
    console.log(URL.createObjectURL(e.target.files[0]));
    console.log('====================================');
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);

    const file = e.target.files[0];

    imageToBase64(e.target.files[0]) // Path to the image
      .then((response) => {
        setBase64({ file: 'data:' + file.type + ';base64,' + response });
        console.log({ file: 'data:' + file.type + ';base64,' + response });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Address Search
  const handleAddressSearch = (e) => {
    if (coordinates !== null) {
      setCoordinates(null);
    }
    setStore_address(e.target.value);
    dispatch(actions.addressSearch(e.target.value));
  };
  //closeSearch
  const closeSearch = () => {
    if (coordinates !== null) {
      setCoordinates(null);
    }
    setStore_address('');
  };

  // select Address
  const handleSelectAddress = (address) => {
    setCoordinates({ latitude: address.latitude, longitude: address.longitude });
    setStore_address(address.formatted_address);
  };
  //
  let redirectUrl = null;
  // if(!this.props.isAuthentication){
  //     redirectUrl = <Redirect to="/sign-in"/>
  // }
  const ActiveStyle = {
    backgroundColor: '#e7f8f3',
    border: '1px solid #13b58c',
  };
  const deActive = {};
  return (
    <Aux>
      {redirectUrl}
      <Backdrop show={loading} />
      <Spinner show={loading} />
      {errorMessage && <Toast message={errorMessage} type="error" />}

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
      <div className="  ">
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
        <br />
        <div className="col ">
          <div className={classes.mycontainer}>
            <div className={classes.groupcard}>
              <div className="row">
                <div className="p-2">
                  <img
                    id="imageid"
                    className={classes.groupAvatar}
                    src={image ? image : groupAvatar}
                    alt="Stores"
                  />
                </div>

                <div className="p-2">
                  <div style={{ height: '0px', overflow: 'hidden' }}>
                    <input
                      type="file"
                      id="fileInput"
                      name="imageUpload"
                      accept="image/*"
                      onChange={(e) => imageUpload(e)}
                    />
                  </div>
                  <button
                    className={classes.title}
                    onClick={imageUploadClick}
                    style={{ backgroundColor: 'white', border: 'none' }}
                  >
                    Add your store photo
                  </button>
                </div>
              </div>
              {/* {imagePath && <img src={imagePath} alt="Hello" />} */}
            </div>

            <div className={classes.addgroup}>
              <div className="form-group mt-2 ">
                <input
                  className={classes.input + ' form-control input-lg '}
                  name="name"
                  value={name}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Store Name"
                />
              </div>

              <div className="form-group mt-2 " style={{ position: 'relative' }}>
                <input
                  className={classes.input + ' form-control input-lg '}
                  name="store_address"
                  value={store_address}
                  onChange={(e) => handleAddressSearch(e)}
                  type="text"
                  placeholder="Store Address"
                />
                {store_address.length > 0 ? (
                  <img
                    src={closeImage}
                    className={classes.closeImage}
                    onClick={closeSearch}
                    alt=""
                  />
                ) : (
                  <img className={classes.locationImage} src={locationImage} alt="" />
                )}
                {store_address.length > 0 && coordinates == null && (
                  <div className={classes.searchResult}>
                    {addresses.length > 0 ? (
                      <ul style={{ listStyle: 'none', paddingLeft: '0px' }}>
                        {addresses.map((address, i) => {
                          return (
                            <li
                              onClick={() => handleSelectAddress(address)}
                              className={classes.addressList}
                              key={i}
                            >
                              <div>
                                <img
                                  className={classes.listLocationImage}
                                  src={locationListImage}
                                  alt=""
                                />
                              </div>

                              <p>{address.formatted_address}</p>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <div
                        style={{ marginTop: '2em' }}
                        className="alert  alert-danger fade in alert-dismissible"
                      >
                        <strong>OOPS</strong>, No address with this name found
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="form-group mt-2">
                <textarea
                  rows="4"
                  className={classes.input + ' form-control input-lg '}
                  name="description"
                  value={description}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Store Description"
                  style={{ resize: 'none' }}
                />
              </div>
            </div>

            <div className="text-center">
              <p style={{ fontWeight: 'bold' }}>Category Type</p>
            </div>
            <br />

            <div className="mt-2">
              <div>
                <div className={classes.categoryBox}>
                  {categories.map((category, i) => {
                    return (
                      <div className=" " key={i}>
                        <div
                          className={classes.wellCategory}
                          onClick={() => getType(category)}
                          style={type?.id === category.id ? ActiveStyle : deActive}
                        >
                          <img
                            src={category.image_path}
                            alt={category.name}
                            title={category.name}
                          />
                          <p>
                            {category.name.length < 10
                              ? category.name
                              : category.name.substring(0, 10) + '..'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {attribute && (
              <Attribute
                attribute={attribute}
                attributeData={attributeData}
                setAttributeData={setAttributeData}
              />
            )}

            <div className="text-center" style={{ paddingBottom: '3em', paddingTop: '1em' }}>
              <button className="btnGreenStyle" onClick={createStore}>
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
};

export default CreateStore;
