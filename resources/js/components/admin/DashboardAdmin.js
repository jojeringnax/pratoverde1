import React from 'react';
import {Link} from "react-router-dom";

class DashboardAdmin extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <div id="" className="col-xl-10 card dashboard-admin-title">
                    <div className="card-header">
                        <h3>DASHBOARD</h3>
                    </div>
                    <div className="card-body d-flex justify-content-around flex-wrap">
                        <div className="col-3 ">
                            <Link className="btn-admin-section card" to="/public/admin/problems"> PROBLEMS</Link>
                        </div>
                        <div className="col-3 ">
                            <Link className="btn-admin-section card" to="/public/admin/rooms"> ROOMS</Link>
                        </div>
                        <div className="col-3 ">
                            <Link className="btn-admin-section card" to="/public/admin/bookings">BOOKING</Link>
                        </div>
                        <div className="col-3 ">
                            <Link className="btn-admin-section card" to="/public/admin/customers">CUSTOMER</Link>
                        </div>
                        <div className="col-3 ">
                            <Link className="btn-admin-section card" to="/public/admin/news">NEWS</Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default DashboardAdmin;