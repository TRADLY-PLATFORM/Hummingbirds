import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import { connect } from 'react-redux';
import classes from './Store.module.css';
import AllenSollyLogo from '../../assets/images/home/store/allenSolly.svg';
import StoreLogo from '../../assets/images/home/store/store1.svg';
import StoreLogo2 from '../../assets/images/home/store/store2.svg';
import StoreBanner from '../../assets/images/store/store.svg';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
//import Skeleton from '../../components/UI/Skeleton/Skeleton';
import { selectStoreDetails } from '../../store/selectors/store';
class StoreDetails extends Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { id, name },
      },
    } = props;
    this.state = {
      storeId: id,
      storeName: name,
    };
  }

  componentDidMount() {
    const { storeId } = this.state;
    this.props.onInitStoreDetails(storeId);
  }

  render() {
    const { storeDetails } = this.props;
    console.log('storeDetails', storeDetails);
    let storeContent = null;

    let storeName = storeDetails.get('name', '');
    let storeOwner =
      storeDetails.getIn(['user', 'first_name'], '') +
      ' ' +
      storeDetails.getIn(['user', 'last_name'], '');

    storeContent = (
      <Aux>
        <img
          src={StoreBanner}
          className={classes.storeImage}
          alt="Woman accesories"
          title="Woman accesories"
        />
        <div class="container-fluid">
          <div className={classes.bannerimages + ' row'}>
            <div className="col-lg-12">
              <div className={classes.bannerText + ' col-sm-12'}>
                <div className={classes.fashionStore + ' col-sm-6'}>
                  {storeDetails.getIn(['images', 0], '') !== '' ? (
                    <img
                      src={storeDetails.getIn(['images', 0], '')}
                      alt="Woman accesories"
                      title="Woman accesories"
                    />
                  ) : (
                    <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories" />
                  )}

                  <h3>{storeName}</h3>
                  <p>@{storeOwner}</p>
                </div>
                <div className="col-sm-6">
                  <button className="btnGreenStyle pull-right mt-4">Follow</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container-fluid mt-5">
          <div className="row">
            <div class={'col-md-5th-1 col-sm-4 col-md-offset-0 col-sm-offset-2 '}>
              <div className={classes.latestTrend}>
                <img
                  src={StoreLogo}
                  className={classes.storeImage}
                  alt="Woman accesories"
                  title="Woman accesories"
                />
                <p>White Full Slive Top</p>
                <div className={classes.bottomDesc}>
                  <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories" />{' '}
                  <span>Rahul</span>
                  <div className={classes.amountTitle}>$25</div>
                </div>
              </div>
            </div>
            <div class={'col-md-5th-1 col-sm-4'}>
              <div className={classes.latestTrend}>
                <img
                  src={StoreLogo2}
                  className={classes.storeImage}
                  alt="Woman accesories"
                  title="Woman accesories"
                />
                <p>White Full Slive Top</p>
                <div className={classes.bottomDesc}>
                  <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories" />{' '}
                  <span>Rahul</span>
                  <div className={classes.amountTitle}>$25</div>
                </div>
              </div>
            </div>
            <div class={'col-md-5th-1 col-sm-4'}>
              <div className={classes.latestTrend}>
                <img
                  src={StoreLogo}
                  className={classes.storeImage}
                  alt="Woman accesories"
                  title="Woman accesories"
                />
                <p>White Full Slive Top</p>
                <div className={classes.bottomDesc}>
                  <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories" />{' '}
                  <span>Rahul</span>
                  <div className={classes.amountTitle}>$25</div>
                </div>
              </div>
            </div>
            <div class={'col-md-5th-1 col-sm-4'}>
              <div className={classes.latestTrend}>
                <img
                  src={StoreLogo2}
                  className={classes.storeImage}
                  alt="Woman accesories"
                  title="Woman accesories"
                />
                <p>White Full Slive Top</p>
                <div className={classes.bottomDesc}>
                  <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories" />{' '}
                  <span>Rahul</span>
                  <div className={classes.amountTitle}>$25</div>
                </div>
              </div>
            </div>
            <div class={'col-md-5th-1 col-sm-4 '}>
              <div className={classes.latestTrend}>
                <img
                  src={StoreLogo}
                  className={classes.storeImage}
                  alt="Woman accesories"
                  title="Woman accesories"
                />
                <p>White Full Slive Top</p>
                <div className={classes.bottomDesc}>
                  <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories" />{' '}
                  <span>Rahul</span>
                  <div className={classes.amountTitle}>$25</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container-fluid mt-5">
          <div className="row">
            <div class={'col-md-5th-1 col-sm-4 col-md-offset-0 col-sm-offset-2 '}>
              <div className={classes.latestTrend}>
                <img
                  src={StoreLogo}
                  className={classes.storeImage}
                  alt="Woman accesories"
                  title="Woman accesories"
                />
                <p>White Full Slive Top</p>
                <div className={classes.bottomDesc}>
                  <img src={AllenSollyLogo} alt="Woman accesories" title="Woman accesories" />{' '}
                  <span>Rahul</span>
                  <div className={classes.amountTitle}>$25</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );

    return (
      <Aux>
        <Backdrop show={this.props.loading} />
        <Spinner show={this.props.loading} />
        {storeContent}
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
    storeDetails: selectStoreDetails(state),
    storeLists: state.store.storeLists,
    isAuthentication: state.auth.token !== null,
    userId: state.auth.userId,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitStoreDetails: (id) => dispatch(actions.initStoreDetails(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreDetails);
