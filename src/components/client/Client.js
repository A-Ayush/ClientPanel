import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase';
import Infinity from '../layout/Infinity';

class Client extends Component {
    state = {
        totalOwed: null
    }

    //method to add up balance
    //reduce method of js
    static getDerivedStateFromProps(props, state){
        const { clients } = props;

        if(clients){
            const total = clients.reduce((total,client) => {
                return total + parseFloat(client.balance.toString());
            },0);
            return { totalOwed: total };
        }

        return null;
    }

  render() {
    const { clients } = this.props;
    const { totalOwed } = this.state;
    
    if(clients){
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <h2>{' '}<i className="fas fa-users">
                        Clients</i>
                        </h2>
                    </div>
                    <div className="col-md-6">
                        <h5 className="text-right text-secondary">
                            Total balance{' '}
                            <span className="text-primary">
                                ${parseFloat(totalOwed.toFixed(2))}
                            </span>
                        </h5>
                    </div>
                </div>
                <table className="table table-striped">
                    <thead className="thead-inverse">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Balance</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(clients => (
                            <tr key={clients.id}>
                                <td>{clients.firstName} {clients.lastNme} </td>
                                <td>{clients.email} </td>
                                <td>${parseFloat(clients.balance).toFixed(2)}</td>
                                <td>
                                    <Link to={`/client/${clients.id}` } className="btn btn-secondary btn-sm">
                                        <i className="fas fa-arrow-circle-right"> Details</i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
    else{
        return <center><Infinity /></center>
    }
  }
}

Client.propTypes = {
    firestore: PropTypes.object.isRequired,
    clients: PropTypes.array
};

export default compose(
    firestoreConnect([{ collection: 'clients' }]),
    connect((state, props) => {
        return ({
            clients: state.firestore.ordered.clients
        });
    })
)(Client);