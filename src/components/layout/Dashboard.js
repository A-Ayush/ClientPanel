import React from 'react';
import Sidebar from '../layout/Sidebar';
import Client from '../client/Client';

export default () => {
  return (
    <div className="row">
        <div className="col-md-10">
            <Client />
        </div>    
        <div className="col-md-2">
           <Sidebar />
        </div>  
    </div>
  )
}
