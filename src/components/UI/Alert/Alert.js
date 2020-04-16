import React, { Component } from 'react';

class Alert extends Component {

    state = {
        isActive: true,
    }

    hideAlert = () => {
        this.setState({isActive: false});
    }

    render() {
        if (this.state.isActive) {
        return (
            <div
                className={ "alert alert-dismissible alert-"+ this.props.class }
                role="alert">
                <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => this.hideAlert()}
                >
                <span aria-hidden="true">&times;</span>
                </button>
                {this.props.message}
            </div>
        );
        }
    return <div/>
  }
}

export default Alert;