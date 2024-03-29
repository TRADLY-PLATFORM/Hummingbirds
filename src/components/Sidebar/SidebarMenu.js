/* eslint-disable react/prop-types */
import React  from 'react';
import {  useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {  selectUserId } from '../../store/selectors/auth';
 

const SidebarMenu = ({ authRedirectHandler }) => {
  // const [redirect, setRedirect] = useState(false);

  // const dispatch = useDispatch();
  // const authRedirectHandler = (path) => {
  //   dispatch(actions.setAuthRedirectPath(path, null));
  //   setRedirect(true);
  // };

  const isAuthenticated = useSelector((state) => selectUserId(state));
  
  // let redirectUrl = null;
  // if (redirect) {
  //   redirectUrl = <Redirect to="/sign-in" />;
  // }

  const location = useLocation();
  let url = location.pathname;

  return (
    <>
      <ul className="nav nav-pills nav-stacked">
        <li
          className={
            url === '/' || url === '/home' || url.indexOf('/store-details') > -1 ? 'active' : ''
          }
        >
          <Link to="/home" style={{ display: 'flex ', alignItems: 'center' }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={url === '/' || url === '/home' ? 'var(--primary_color)' : '#959393'}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15 22.065V17.065C15 16.2693 14.6839 15.5063 14.1213 14.9437C13.5587 14.3811 12.7956 14.065 12 14.065C11.2044 14.065 10.4413 14.3811 9.87868 14.9437C9.31607 15.5063 9 16.2693 9 17.065V22.065H4C3.46957 22.065 2.96086 21.8543 2.58579 21.4792C2.21071 21.1041 2 20.5954 2 20.065V9.19699C2 8.85162 2.08943 8.51213 2.25959 8.21159C2.42976 7.91104 2.67485 7.65969 2.971 7.48199L10.971 2.68199C11.2818 2.49549 11.6375 2.39697 12 2.39697C12.3625 2.39697 12.7182 2.49549 13.029 2.68199L21.029 7.48199C21.3252 7.65969 21.5702 7.91104 21.7404 8.21159C21.9106 8.51213 22 8.85162 22 9.19699V20.065C22 20.5954 21.7893 21.1041 21.4142 21.4792C21.0391 21.8543 20.5304 22.065 20 22.065H15Z" />
            </svg>

            <span>Home</span>
          </Link>
        </li>
        <li className={url === '/wishlist' ? 'active' : ''}>
          {!isAuthenticated ? (
            <Link
              to="#"
              onClick={(path) => authRedirectHandler('/wishlist')}
              style={{ display: 'flex ', alignItems: 'center' }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={url === '/wishlist' ? 'var(--primary_color)' : '#959393'}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21.6328 6.64689C21.3187 5.91948 20.8657 5.2603 20.2992 4.70627C19.7323 4.15058 19.064 3.70898 18.3305 3.40549C17.5699 3.08953 16.7541 2.92781 15.9305 2.9297C14.775 2.9297 13.6477 3.24611 12.668 3.84377C12.4336 3.98674 12.2109 4.14377 12 4.31486C11.7891 4.14377 11.5664 3.98674 11.332 3.84377C10.3523 3.24611 9.225 2.9297 8.06953 2.9297C7.2375 2.9297 6.43125 3.08908 5.66953 3.40549C4.93359 3.71017 4.27031 4.14845 3.70078 4.70627C3.13359 5.25968 2.6805 5.91901 2.36719 6.64689C2.04141 7.40392 1.875 8.20783 1.875 9.03517C1.875 9.81564 2.03438 10.6289 2.35078 11.4563C2.61563 12.1477 2.99531 12.8649 3.48047 13.5891C4.24922 14.7352 5.30625 15.9305 6.61875 17.1422C8.79375 19.1508 10.9477 20.5383 11.0391 20.5945L11.5945 20.9508C11.8406 21.1078 12.157 21.1078 12.4031 20.9508L12.9586 20.5945C13.05 20.536 15.2016 19.1508 17.3789 17.1422C18.6914 15.9305 19.7484 14.7352 20.5172 13.5891C21.0023 12.8649 21.3844 12.1477 21.6469 11.4563C21.9633 10.6289 22.1227 9.81564 22.1227 9.03517C22.125 8.20783 21.9586 7.40392 21.6328 6.64689Z" />
              </svg>
              <span>My Wishlist</span>
            </Link>
          ) : (
            <Link to="/wishlist" style={{ display: 'flex ', alignItems: 'center' }}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={url === '/wishlist' ? 'var(--primary_color)' : '#959393'}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21.6328 6.64689C21.3187 5.91948 20.8657 5.2603 20.2992 4.70627C19.7323 4.15058 19.064 3.70898 18.3305 3.40549C17.5699 3.08953 16.7541 2.92781 15.9305 2.9297C14.775 2.9297 13.6477 3.24611 12.668 3.84377C12.4336 3.98674 12.2109 4.14377 12 4.31486C11.7891 4.14377 11.5664 3.98674 11.332 3.84377C10.3523 3.24611 9.225 2.9297 8.06953 2.9297C7.2375 2.9297 6.43125 3.08908 5.66953 3.40549C4.93359 3.71017 4.27031 4.14845 3.70078 4.70627C3.13359 5.25968 2.6805 5.91901 2.36719 6.64689C2.04141 7.40392 1.875 8.20783 1.875 9.03517C1.875 9.81564 2.03438 10.6289 2.35078 11.4563C2.61563 12.1477 2.99531 12.8649 3.48047 13.5891C4.24922 14.7352 5.30625 15.9305 6.61875 17.1422C8.79375 19.1508 10.9477 20.5383 11.0391 20.5945L11.5945 20.9508C11.8406 21.1078 12.157 21.1078 12.4031 20.9508L12.9586 20.5945C13.05 20.536 15.2016 19.1508 17.3789 17.1422C18.6914 15.9305 19.7484 14.7352 20.5172 13.5891C21.0023 12.8649 21.3844 12.1477 21.6469 11.4563C21.9633 10.6289 22.1227 9.81564 22.1227 9.03517C22.125 8.20783 21.9586 7.40392 21.6328 6.64689Z" />
              </svg>
              <span>My Wishlist</span>
            </Link>
          )}
        </li>
        <li className={url === '/listings' || url.includes('/product') ? 'active' : ''}>
          <Link to="/listings" style={{ display: 'flex ', alignItems: 'center' }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={url === '/listings' ? 'var(--primary_color)' : '#959393'}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21.546 7.93789L19.4386 4.49805C19.2502 4.18926 18.9158 4 18.5586 4H5.44014C5.08296 4 4.7485 4.18926 4.56017 4.49805L2.45277 7.93789C1.36498 9.71426 2.32938 12.1846 4.36209 12.4668C4.50821 12.4867 4.65758 12.4967 4.80695 12.4967C5.7681 12.4967 6.61885 12.065 7.20334 11.3977C7.78782 12.065 8.64182 12.4967 9.59973 12.4967C10.5609 12.4967 11.4116 12.065 11.9961 11.3977C12.5806 12.065 13.4346 12.4967 14.3925 12.4967C15.3537 12.4967 16.2044 12.065 16.7889 11.3977C17.3766 12.065 18.2274 12.4967 19.1853 12.4967C19.3379 12.4967 19.484 12.4867 19.6301 12.4668C21.6693 12.1879 22.637 9.71758 21.546 7.93789ZM19.1918 13.5625C18.8671 13.5625 18.5456 13.5127 18.2339 13.4363V16.75H5.76486V13.4363C5.45313 13.5094 5.13166 13.5625 4.80695 13.5625C4.61212 13.5625 4.41404 13.5492 4.22246 13.5227C4.04062 13.4961 3.86203 13.4529 3.68993 13.4031V19.9375C3.68993 20.5252 4.15427 21 4.72902 21H19.2762C19.851 21 20.3153 20.5252 20.3153 19.9375V13.4031C20.1399 13.4563 19.9646 13.4994 19.7828 13.5227C19.5847 13.5492 19.3899 13.5625 19.1918 13.5625Z" />
            </svg>

            <span>Listings</span>
          </Link>
        </li>
        <li className={url === '/myorder' || url === '/myorder-details/:id' ? 'active' : ''}>
          {isAuthenticated ? (
            <Link to="/myorder" style={{ display: 'flex ', alignItems: 'center' }}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={
                  url === '/myorder' || url === '/myorder-details/:id'
                    ? 'var(--primary_color)'
                    : '#959393'
                }
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.7089 10.3386C20.3159 9.94433 20.3159 9.05567 19.7089 8.66137L16.5447 6.6062C15.8795 6.17409 15 6.65154 15 7.44482L15 8L7.00002 8C6.44773 8 6.00002 8.44771 6.00002 9L6.00002 10C6.00002 10.5523 6.44773 11 7.00002 11L15 11L15 11.5552C15 12.3485 15.8795 12.8259 16.5447 12.3938L19.7089 10.3386ZM4.29117 14.6614C3.68411 15.0557 3.68411 15.9443 4.29117 16.3386L7.45531 18.3938C8.12059 18.8259 9.00002 18.3485 9.00002 17.5552L9.00002 17H17C17.5523 17 18 16.5523 18 16V15C18 14.4477 17.5523 14 17 14H9.00002L9.00002 13.4448C9.00002 12.6515 8.12058 12.1741 7.45531 12.6062L4.29117 14.6614Z"
                />
              </svg>
              <span>My Orders</span>
            </Link>
          ) : (
            <Link
              to="#"
              style={{ display: 'flex ', alignItems: 'center' }}
              onClick={(path) => authRedirectHandler('/myorder')}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#959393"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.7089 10.3386C20.3159 9.94433 20.3159 9.05567 19.7089 8.66137L16.5447 6.6062C15.8795 6.17409 15 6.65154 15 7.44482L15 8L7.00002 8C6.44773 8 6.00002 8.44771 6.00002 9L6.00002 10C6.00002 10.5523 6.44773 11 7.00002 11L15 11L15 11.5552C15 12.3485 15.8795 12.8259 16.5447 12.3938L19.7089 10.3386ZM4.29117 14.6614C3.68411 15.0557 3.68411 15.9443 4.29117 16.3386L7.45531 18.3938C8.12059 18.8259 9.00002 18.3485 9.00002 17.5552L9.00002 17H17C17.5523 17 18 16.5523 18 16V15C18 14.4477 17.5523 14 17 14H9.00002L9.00002 13.4448C9.00002 12.6515 8.12058 12.1741 7.45531 12.6062L4.29117 14.6614Z"
                />
              </svg>
              <span>My Orders</span>
            </Link>
          )}
        </li>

        <li>
          {!isAuthenticated ? (
            <Link
              to="#"
              onClick={(path) => authRedirectHandler('/store')}
              style={{ display: 'flex ', alignItems: 'center' }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={url === '/store' ? 'var(--primary_color)' : '#959393'}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21.546 7.93789L19.4386 4.49805C19.2502 4.18926 18.9158 4 18.5586 4H5.44014C5.08296 4 4.7485 4.18926 4.56017 4.49805L2.45277 7.93789C1.36498 9.71426 2.32938 12.1846 4.36209 12.4668C4.50821 12.4867 4.65758 12.4967 4.80695 12.4967C5.7681 12.4967 6.61885 12.065 7.20334 11.3977C7.78782 12.065 8.64182 12.4967 9.59973 12.4967C10.5609 12.4967 11.4116 12.065 11.9961 11.3977C12.5806 12.065 13.4346 12.4967 14.3925 12.4967C15.3537 12.4967 16.2044 12.065 16.7889 11.3977C17.3766 12.065 18.2274 12.4967 19.1853 12.4967C19.3379 12.4967 19.484 12.4867 19.6301 12.4668C21.6693 12.1879 22.637 9.71758 21.546 7.93789ZM19.1918 13.5625C18.8671 13.5625 18.5456 13.5127 18.2339 13.4363V16.75H5.76486V13.4363C5.45313 13.5094 5.13166 13.5625 4.80695 13.5625C4.61212 13.5625 4.41404 13.5492 4.22246 13.5227C4.04062 13.4961 3.86203 13.4529 3.68993 13.4031V19.9375C3.68993 20.5252 4.15427 21 4.72902 21H19.2762C19.851 21 20.3153 20.5252 20.3153 19.9375V13.4031C20.1399 13.4563 19.9646 13.4994 19.7828 13.5227C19.5847 13.5492 19.3899 13.5625 19.1918 13.5625Z" />
              </svg>
              <span>My Store</span>
            </Link>
          ) : (
            <Link to="/store" style={{ display: 'flex ', alignItems: 'center' }}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={url === '/store' ? 'var(--primary_color)' : '#959393'}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21.546 7.93789L19.4386 4.49805C19.2502 4.18926 18.9158 4 18.5586 4H5.44014C5.08296 4 4.7485 4.18926 4.56017 4.49805L2.45277 7.93789C1.36498 9.71426 2.32938 12.1846 4.36209 12.4668C4.50821 12.4867 4.65758 12.4967 4.80695 12.4967C5.7681 12.4967 6.61885 12.065 7.20334 11.3977C7.78782 12.065 8.64182 12.4967 9.59973 12.4967C10.5609 12.4967 11.4116 12.065 11.9961 11.3977C12.5806 12.065 13.4346 12.4967 14.3925 12.4967C15.3537 12.4967 16.2044 12.065 16.7889 11.3977C17.3766 12.065 18.2274 12.4967 19.1853 12.4967C19.3379 12.4967 19.484 12.4867 19.6301 12.4668C21.6693 12.1879 22.637 9.71758 21.546 7.93789ZM19.1918 13.5625C18.8671 13.5625 18.5456 13.5127 18.2339 13.4363V16.75H5.76486V13.4363C5.45313 13.5094 5.13166 13.5625 4.80695 13.5625C4.61212 13.5625 4.41404 13.5492 4.22246 13.5227C4.04062 13.4961 3.86203 13.4529 3.68993 13.4031V19.9375C3.68993 20.5252 4.15427 21 4.72902 21H19.2762C19.851 21 20.3153 20.5252 20.3153 19.9375V13.4031C20.1399 13.4563 19.9646 13.4994 19.7828 13.5227C19.5847 13.5492 19.3899 13.5625 19.1918 13.5625Z" />
              </svg>
              <span>My Store</span>
            </Link>
          )}
        </li>
        {/* <li>
              <Link to="/group">
                <img className="img-fluid" src={GroupLogo} alt="Home" title="Home" />
                <span>Group</span>
              </Link>
            </li> */}
      </ul>
    </>
  );
};

export default SidebarMenu;
