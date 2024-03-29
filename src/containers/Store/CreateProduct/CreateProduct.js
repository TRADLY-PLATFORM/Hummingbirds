import React, { useEffect, useState } from 'react';
import classes from './AddProduct.module.css';

import addProductIcon from '../../../assets/images/products/addProductIcon.svg';
import { Link, useParams, useHistory } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import Attribute from './Attribute';
import locationImage from '../../../assets/images/store/location.png';
import locationListImage from '../../../assets/images/store/locationList.png';

import closeImage from '../../../assets/images/store/close (1).svg';
import { Slide, toast, ToastContainer } from 'react-toastify';
// import Backdrop from '../../../components/UI/Backdrop/Backdrop';
// import Spinner from '../../../components/UI/Spinner/Spinner';
import Loader from 'react-loader-spinner';

import Toast from '../../../components/UI/Toast/Toast';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Select from 'react-select';

const CreateProduct = () => {
  // state
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [attributeData, setAttributeData] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [product_address, setProduct_address] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [imagePath, setImagePath] = useState([{ id: 'addIcon', path: addProductIcon }]);
  const [files, setFiles] = useState([]);
  const [fullFile, setFullFile] = useState([]);
  const [showError, setShowError] = useState(false);
  // const [options, setOptions] = useState([{ value: 'dot', label: '...' }]);

  // Params
  const { accountId } = useParams();
  const history = useHistory();

  // use Effect
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.initCategoryLists());
    dispatch(actions.initCurrencies());
  }, [0]);
  useEffect(() => {
    if (selectedCategory !== null) {
      dispatch(actions.initAttribute(selectedCategory, 'listings'));
    }
  }, [dispatch, selectedCategory]);

  // reducer
  const categories = useSelector((state) => state.product.categoryLists);
  const attribute = useSelector((state) => state.store.attribute);
  const currencies = useSelector((state) => state.store.currencies);
  const addresses = useSelector((state) => state.store.addresses);
  const loading = useSelector((state) => state.store.loading);
  const error = useSelector((state) => state.store.error);
  const errorMessage = useSelector((state) => state.store.message);
  const listingsConfigs = useSelector((state) => state.auth.listings_configs);

  //
  let options;
     if (categories.length > 0) {
      options =categories.map((category) =>
      {
        return { value: category.id, label: category.name }; 
         }
      );
  }
 
  // function
  //
  const handleImageClick = () => {
    setShowError(false);

    let fileInput = document.getElementById('fileInput');
    if (files.length !== parseInt(listingsConfigs.listing_pictures_count)) {
      fileInput.click();
    } else {
      toast.error("You can't add more photo");
    }
  };

  const imageUpload = async (e) => {
    const file = e.target.files[0];
    setImagePath([...imagePath, { id: file.name, path: URL.createObjectURL(file) }]);
    // setFile(e.target.files[0]);

    if (files.length > 0) {
      setFiles([...files, { name: file.name, type: file.type }]);
    } else {
      setFiles([{ name: file.name, type: file.type }]);
    }
    if (fullFile.length > 0) {
      setFullFile([...fullFile, file]);
    } else {
      setFullFile([file]);
    }
  };

  //
  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    if (name === 'Product Title') {
      setTitle(value);
    } else if (name === 'Product Description') {
      setDescription(value);
    } else if (name === 'Selling Price') {
      if (value > -1) {
        setPrice(value);
      }
    } else if (name === 'Stock Quantity') {
      if (value > 0) {
        setQuantity(value);
      }
    } else if (name === 'Shipping Charge') {
      if (value > -1) {
        setShippingCharge(value);
      }
    }
    setShowError(false);
  };

  //
  const selectCategory = (newValue) => {
     
      setSelectedCategory(newValue.value);
    
  };
  //
  const selectCurrency = () => {
    const selectedValue = document.getElementById('currency').value;
    if (selectedValue === 'zero') {
      setCurrency(null);
    } else {
      setCurrency(selectedValue);
    }
  };

  //
  const handleAddressSearch = (e) => {
    if (coordinates !== null) {
      setCoordinates(null);
    }
    setProduct_address(e.target.value);
    dispatch(actions.addressSearch(e.target.value));
  };
  //closeSearch
  const closeSearch = () => {
    if (coordinates !== null) {
      setCoordinates(null);
    }
    setProduct_address('');
  };

  // select Address
  const handleSelectAddress = (address) => {
    setCoordinates({ latitude: address.latitude, longitude: address.longitude });
    setProduct_address(address.formatted_address);
  };

  //
  const addProductClick = () => {
    //  if (currency === null) {
    //    setCurrency(currencies[0].id);
    //  }
    if (title === '') {
      toast.error('Title is required');
      return false;
    }
    if (description === '') {
      toast.error('Description is required');
      return false;
    }
    if (price === '') {
      toast.error('Price is required');
      return false;
    }
    if (price < parseInt(listingsConfigs.listing_min_price)) {
      toast.error(
        'Minimum price cannot be less than ' + parseInt(listingsConfigs.listing_min_price)
      );
      return false;
    }

    if (coordinates === null) {
      toast.error('Address is required');
      return false;
    }
    if (files === null) {
      toast.error('Image is required');
      return false;
    }
    if (selectedCategory === null) {
      toast.error('Category is required');
      return false;
    }
    setShowError(true);
    dispatch(
      actions.initFiles(
        accountId,
        title,
        price,
        shippingCharge,
        description,
        quantity,
        selectedCategory,
        attributeData,
        currency || currencies[0].id,
        coordinates,
        files,
        fullFile,
        () => history.push(`/store`)
      )
    );
  };

  if (error && showError) {
    toast.error(errorMessage);
  }

  return (
    <Aux>
      {loading && (
        <div className={classes.Backdrop}>
          <Loader
            type="ThreeDots"
            color="var(--primary_color)"
            height={100}
            width={100}
            style={{
              position: 'absolute',
              right: 0,
              height: '100vh',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: '500',
            }}
          />
        </div>
      )}
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
      <Link to="/Store">
        <button className={classes.button}>
          <i className="fa fa-arrow-left "></i> back to my store
        </button>
      </Link>
      <br />
      <div className={classes.mycontainer}>
        <div className="row">
          <div className="p-2">
            <input
              style={{ height: '0px', overflow: 'hidden' }}
              type="file"
              id="fileInput"
              name="imageUpload"
              accept="image/png,image/jpg"
              onChange={(e) => imageUpload(e)}
            />
            {imagePath.map((image) => {
              if (image.id === 'addIcon') {
                return (
                  <button className={classes.imageUploadButton} onClick={handleImageClick}>
                    Add Item
                  </button>
                );
              } else {
                return <img className={classes.productImage} src={image.path} alt="" />;
              }
            })}
          </div>
          <p className={classes.productImgRule}>
            Max. {listingsConfigs?.listing_pictures_count} photos per product
          </p>
        </div>

        <div className={classes.productDetails}>
          <div className="form-group mt-2 ">
            <label htmlFor="product-title">Product Title</label>
            <input
              className={classes.input}
              name="Product Title"
              type="text"
              id="product-title"
              placeholder="Product title here"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="product-description">Product Description</label>

            <textarea
              rows="4"
              id="product-description"
              className={classes.input}
              name="Product Description"
              type="text"
              placeholder="Product Description"
              onChange={(e) => handleChange(e)}
              style={{ resize: 'none' }}
            />
          </div>

          <div className={classes.chargesBox}>
            <div className="form-group mt-2 ">
              <label htmlFor="selling-price">Selling Price </label>

              <input
                id="selling-price"
                value={price}
                className={classes.input}
                name="Selling Price"
                type="number"
                placeholder=""
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group mt-2 ">
              <label htmlFor="selling-price">Shipping Charge </label>

              <input
                id="shipping-charge"
                value={shippingCharge}
                className={classes.input}
                name="Shipping Charge"
                type="number"
                placeholder=""
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="currency">Currency</label>
              <select className={classes.input} name="" id="currency" onChange={selectCurrency}>
                {currencies?.map((currency, index) => {
                  return (
                    <option value={currency.id} key={Math.random()}>
                      {currency.code}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="form-group mt-2">
            <label htmlFor="stock-quantity">Stock Quantity</label>
            <input
              id="stock-quantity"
              value={quantity}
              className={classes.input}
              name="Stock Quantity"
              type="number"
              placeholder="Stock Quantity"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group mt-2" style={{ position: 'relative' }}>
            <label htmlFor="address">Address</label>
            <input
              className={classes.input}
              value={product_address}
              name="product_address"
              id="address"
              onChange={(e) => handleAddressSearch(e)}
              type="text"
              placeholder="Store Address"
            />
            {product_address.length > 0 ? (
              <img src={closeImage} className={classes.closeImage} onClick={closeSearch} alt="" />
            ) : (
              <img className={classes.locationImage} src={locationImage} alt="" />
            )}
            {product_address.length > 0 && coordinates == null && (
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
            <label htmlFor="categories">Category</label>
            <Select
              name="category"
              id="categories"
              onChange={(newValue) => selectCategory(newValue)}
              options={options}
            />
          </div>
        </div>
        {attribute && (
          <Attribute
            attribute={attribute}
            attributeData={attributeData}
            setAttributeData={setAttributeData}
          />
        )}

        <div className="text-center">
          <button onClick={() => addProductClick()} className={classes.btnGreenStyle}>
            Add Product
          </button>
        </div>
        <br />
      </div>
    </Aux>
  );
};

export default CreateProduct;
