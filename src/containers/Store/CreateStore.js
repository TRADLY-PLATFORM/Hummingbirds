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
import { selectUserId } from '../../store/selectors/auth';
class CreateStore extends Component {
  state = {
    showError: false,
    name: '',
    description: '',
    web_address: '',
  };

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
      return false;
    }

    this.setState({ showError: true });

    const stores = {
      account: {
        name: this.state.name,
        description: this.state.description,
        web_address: '',
        image_path: '',
        address: this.state.web_address,
        type: 'accounts',
      },
    };

    this.props.onCreateStore(stores, () =>
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

  render() {
    let redirectUrl = null;
    // if(!this.props.isAuthentication){
    //     redirectUrl = <Redirect to="/sign-in"/>
    // }

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
                  <div className="p-2">
                    <img className={classes.groupAvatar} src={groupAvatar} alt="Stores" />
                  </div>

                  <div className="p-2">
                    <Link to="#">
                      <div className={classes.title}>Add your store photo</div>
                    </Link>
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
                    placeholder="Store Address"
                  />
                </div>

                <div className="form-group mt-2">
                  <input
                    className={classes.input + ' form-control input-lg '}
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Store Description"
                  />
                </div>
              </div>

              <div className="text-center">Store Type</div>
              <br />

              <div className="mt-5">
                <div className="col-lg-12 col-md-12">
                  <div className="col-lg-12">
                    <div className="col-sm-6 col-md-3">
                      <div className={classes.wellCategory}>
                        <img
                          src={WomanAccesoriesLogo}
                          alt="Woman accesories"
                          title="Woman accesories"
                        />
                        <p>Woman accesories</p>
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                      <div className={classes.wellCategory}>
                        <img src={WomanClothLogo} alt="Woman cloth" title="Woman cloth" />
                        <p>Woman cloth</p>
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                      <div className={classes.wellCategory}>
                        <img src={BookLogo} alt="Book" title="Book" />
                        <p>Book</p>
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                      <div className={classes.wellCategory}>
                        <img src={TextBooksLogo} alt="Text books" title="Text books" />
                        <p>Text books</p>
                      </div>
                    </div>

                    <div className="col-sm-6 col-md-3">
                      <div className={classes.wellCategory}>
                        <img src={SporsLogo} alt="Sports" title="Sports" />
                        <p>Sports</p>
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                      <div className={classes.wellCategory}>
                        <img src={ElectronicsLogo} alt="Electornics" title="Electornics" />
                        <p>Electornics</p>
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                      <div className={classes.wellCategory}>
                        <img src={GamesLogo} alt="Game &amp; toys" title="Game &amp; toys" />
                        <p>Game &amp; toys</p>
                      </div>
                    </div>

                    <div className="col-sm-6 col-md-3">
                      <div className={classes.wellCategory}>
                        <img src={MoreLogo} alt="More" title="More" />
                        <p>More</p>
                      </div>
                    </div>
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
    isAuthenticated: selectUserId(state),
    authRedirectPath: state.auth.authRedirectPath,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateStore: (store, callBack) => dispatch(actions.CreateStore(store, callBack)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateStore);
