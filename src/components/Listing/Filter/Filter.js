import React from 'react';
import Select from 'react-select';

const filter = (props) => {
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-5th-1 col-sm-4 col-md-offset-0 col-sm-offset-2 nopadding">
          <Select
            value={props.selectedOption.categoryValue}
            onChange={props.handleChange}
            options={props.options.categoryOptions}
            name="categoryValue"
            placeholder="All Categories"
          />
        </div>
        <div className="col-md-5th-1 col-sm-4 nopadding">
          <Select
            value={props.selectedOption.priceValue}
            onChange={props.handleChange}
            options={props.options.priceOptions}
            name="priceValue"
            placeholder="Price Filter"
          />
        </div>
        <div className="col-md-5th-1 col-sm-4 nopadding">
          <Select
            value={props.selectedOption.locationValue}
            onChange={props.handleChange}
            options={props.options.locationOptions}
            name="locationValue"
            placeholder="Select Location"
          />
        </div>
        <div className="col-md-5th-1 col-sm-4 nopadding">
          <Select
            value={props.selectedOption.supplierValue}
            onChange={props.handleChange}
            options={props.options.supplerOptions}
            name="supplierValue"
            placeholder="Select Supplier"
          />
        </div>
        <div className="col-md-5th-1 col-sm-4 nopadding">
          <Select
            value={props.selectedOption.sortValue}
            onChange={props.handleChange}
            options={props.options.sortByOptions}
            name="sortValue"
            placeholder="Sort By"
          />
        </div>
      </div>
    </div>
  );
};

export default filter;
