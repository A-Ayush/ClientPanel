import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import Infinity from '../layout/Infinity';

class Details extends Component {
  render() {
    const { client } = this.props;

    if(client){
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to = "/" className = "btn btn-link">
                            <i className="fas fa-arrow-circle-left"></i>
                        </Link>
                    </div>
                    <div className="col-md-6">
                        <div className="btn-group float-right">
                            <Link to = {`/client/edit/${client.id}`} className="btn btn-dark">
                                Edit
                            </Link>
                            <button className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className="card">
                    <h3 className="card-header">
                        {client.firstName} {client.lastName}
                    </h3>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-8 col-sm-6">
                                <h4>Client ID: {' '} <span className="text-secondary">{client.id}</span></h4>
                            </div>
                            <div className="col-md-4 col-sm-6">
                                Balance: ${parseFloat(client.balance).toFixed(2)}
                            </div>
                            <div className="col-md-4 col-sm-6">
                                Email: {' '} <span >{client.email}</span>
                            </div>
                            <br></br>
                            <div>
                                Phone no.: {' '} <span >{client.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return <Infinity />;
    }
  }
}

export default compose(
    firestoreConnect(props => [
        { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
    ]),
    connect(({ firestore: { ordered } }, props) => {
        return ({
            client: ordered.client && ordered.client[0]
        });
    })
)(Details);