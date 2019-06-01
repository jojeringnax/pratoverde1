import React from 'react';
import {Link} from "react-router-dom";

class DashboardAdmin extends React.Component {

    render() {
        return (
            <>
                <div id="" className="col-xl-10 card dashboard-admin-title">
                    <div className="card-header">
                        <h3>DASHBOARD</h3>
                    </div>
                    <div className="card-body d-flex justify-content-around flex-wrap">
                        <div className="col-3 ">
                            <Link className="btn-admin-section card" to="/admin/problems"> PROBLEMS</Link>
                        </div>
                        <div className="col-3 ">
                            <Link className="btn-admin-section card" to="/admin/rooms"> ROOMS</Link>
                        </div>
                        <div className="col-3 ">
                            <Link className="btn-admin-section card" to="/admin/bookings">BOOKING</Link>
                        </div>
                        <div className="col-3 ">
                            <Link className="btn-admin-section card" to="/admin/customers">CUSTOMER</Link>
                        </div>
                        <div className="col-3 ">
                            <Link className="btn-admin-section card" to="/admin/news">NEWS</Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default DashboardAdmin;
