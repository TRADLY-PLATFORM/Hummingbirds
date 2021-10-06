import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { Link, useHistory } from 'react-router-dom';
 import { toast, ToastContainer, Slide } from 'react-toastify';
import Backdrop from '../../../components/UI/Backdrop/Backdrop';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import classes from './EditStore.module.css';

import groupAvatar from '../../../assets/images/uploadPlaceholder.svg';
 
 import Toast from '../../../components/UI/Toast/Toast';

import locationImage from '../../../assets/images/store/location.png';
import locationListImage from '../../../assets/images/store/locationList.png';

import closeImage from '../../../assets/images/store/close (1).svg';
import { useEffect } from 'react';
import { selectUserId } from '../../../store/selectors/auth';
import Attribute from '../CreateStore/Attribute';
 
const EditStore = () => {
// state
    const [showError, setShowError] = useState(false);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState('');
    const [type, setType] = useState(null);
    const [store_address, setStore_address] = useState('');
     const [image, setImage] = useState(null);
     const [coordinates, setCoordinates] = useState(null);
    const [file, setFile] = useState(null);
    const [attributeData, setAttributeData] = useState(null);



  // reducer
  const isAuthenticated = useSelector((state) => selectUserId(state));
  const storeLists = useSelector((state) => state.store.storeLists);
    const loading = useSelector((state) => state.store.loading);
     const categories = useSelector((state) => state.store.categories);
    const addresses = useSelector((state) => state.store.addresses);
     const attribute = useSelector((state) => state.store.attribute);
     const errorMessage = useSelector((state) => state.store.message);

  //
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.userStoreLists(isAuthenticated));
        dispatch(actions.accountCategories());

  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (storeLists.length > 0) {
      const { name, description, images, location, latitude, longitude } = storeLists[0];
      setImage(images[0])
      setName(name);
      setCoordinates({ latitude: latitude, longitude: longitude });
      setStore_address(location.formatted_address)
      setDescription(description);

    }
  }, [storeLists]);

  const history = useHistory();

    const editStore = (e) => {
      e.preventDefault();

      if (image === null) {
        toast.error('Image is required');
        return false;
      }
      if (name === '') {
        toast.error('Store name is required');
         return false;
      } else if (description === '') {
        toast.error('Store Description is require');
         return false;
      } else if (type === null) {
        toast.error('Category is required');
         return false;
      }

   
        dispatch(
          actions.editStore(
            file,
            image,
            name,
            type.id,
            description,
            coordinates,
            attributeData,
             storeLists[0].id,
            () => history.push(`/store`)
          )
        );
   
      setShowError(true);
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
    dispatch(actions.initAttribute(category.id, 'accounts'));
  };

  const imageUploadClick = () => {
    let fileInput = document.getElementById('fileInput');
    fileInput.click();
  };
  const imageUpload = async (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
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
    border: '1px solid  var(--primary_color)',
  };
  const deActive = {};
 
  // Error message
 

  return (
    <Aux>
      {redirectUrl}
      <Backdrop show={loading} />
      <Spinner show={loading} />
      {errorMessage && <Toast message={errorMessage} type="error" />}

      <ToastContainer
        autoClose={2000}
        position="bottom-right"
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
                  <svg
                    width="16"
                    height="14"
                    viewBox="0 0 16 14"
                    fill="var(--primary_color)"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginRight: '10px' }}
                  >
                    <path d="M16 6V8H4L8 12L7 14L0 7L7 0L8 2L4 6H16Z" />
                  </svg>
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
                    className={image ? classes.imageAvatar : classes.groupAvatar}
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
                    Change your store photo
                  </button>
                </div>
              </div>
              {/* {imagePath && <img src={imagePath} alt="Hello" />} */}
            </div>

            <div className={classes.addgroup}>
              <div className="form-group mt-2 ">
                <label htmlFor="storeName">Store Name</label>
                <input
                  id="storeName"
                  className={classes.input}
                  name="name"
                  value={name !== null ? name : storeLists[0]?.name}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Type your store name"
                />
              </div>

              <div className="form-group mt-2 " style={{ position: 'relative' }}>
                <label htmlFor="storeAddress">Store Address</label>
                <input
                  id="storeAddress"
                  className={classes.input}
                  name="store_address"
                  value={store_address}
                  onChange={(e) => handleAddressSearch(e)}
                  type="text"
                  placeholder="Search your store address"
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
                <label htmlFor="storeDescription">Store Description</label>
                <textarea
                  id="storeDescription"
                  rows="4"
                  className={classes.input}
                  name="description"
                  value={description}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Type your store description here"
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
              <button className="btnGreenStyle" onClick={editStore}>
                Edit Store
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

export default EditStore;
