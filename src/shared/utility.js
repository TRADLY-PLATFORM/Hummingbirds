export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const countryFilter = (code, data) => {
  let filterCountry = data
    .filter((country) => {
      return parseInt(code) === parseInt(country.dial_code);
    })
    .reduce((filterCountry, el) => {
      return el;
    }, {});

  return filterCountry;
};

// export const CollectionListings = (data) => {

//     let lists = data.listings;
//     return lists.map((list, i) => {

//         let imagePath = '';

//         if(list.images[0]!=undefined){
//             imagePath = list.images[0];
//         }

//         return (
//                 <div className={"col-md-5th-1 col-sm-4 col-md-offset-0 col-sm-offset-2 "} key={i}>
//                     <div className={classes.latestTrend}>
//                         <img src={imagePath} className={classes.storeImage} alt={list.title} title={list.title}/>
//                         <p>{list.title}</p>
//                         <div className={classes.bottomDesc}>
//                             <img src={list.store.image_path} alt="Woman accesories" title="Woman accesories"/> <span>{list.store.name}</span>
//                             <div className={classes.amountTitle}>{list.currency.symbol}{list.list_price}</div>
//                         </div>
//                     </div>
//                 </div>
//                );
//     });

// }

// CONSTANTS

export const ACCESS_TOKEN = localStorage.getItem('tenant_key');

export const EXPIRY_TIME = 2500;

export const ENCRYPT = (text) => {
  if (text !== '' || text !== null || text !== undefined) {
    return btoa(text);
  } else {
    return '';
  }
};
export const DECRYPT = (text) => {
  if (text !== '' || text !== null || text !== undefined) {
    return atob(text);
  } else {
    return '';
  }
};

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
