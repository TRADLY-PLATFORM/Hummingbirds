import React from 'react';
import Select from 'react-select';

const filter = ( props ) => {
    return (<div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-md-5th-1 col-sm-4 col-md-offset-0 col-sm-offset-2 nopadding">
                    <Select
                            value={props.selectedOption}
                            onChange={props.handleChange}
                            options={props.options}
                            placeholder="All Categories"
                        />
                    </div>
                    <div className="col-md-5th-1 col-sm-4 nopadding">
                    <Select
                            value={props.selectedOption}
                            onChange={props.handleChange}
                            options={props.options}
                            placeholder="Price Filter"
                        />
                    </div>
                    <div className="col-md-5th-1 col-sm-4 nopadding">
                    <Select
                            value={props.selectedOption}
                            onChange={props.handleChange}
                            options={props.options}
                            placeholder="Select Location"
                        />
                    </div>
                    <div className="col-md-5th-1 col-sm-4 nopadding">
                    <Select
                            value={props.selectedOption}
                            onChange={props.handleChange}
                            options={props.options}
                            placeholder="Select Supplier"
                        />
                    </div>
                    <div className="col-md-5th-1 col-sm-4 nopadding">
                    <Select
                            value={props.selectedOption}
                            onChange={props.handleChange}
                            options={props.options}
                            placeholder="Sort By"
                        />
                    </div>
                </div>
            </div>
        )
}

export default filter;