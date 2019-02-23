import React, { Component } from 'react';
import {Link, NavLink} from "react-router-dom";
import { Switch, Route, BrowserRouter  as Router} from 'react-router-dom';

import DashboardAdmin from './DashboardAdmin';
import NavBarAdmin from './NavBarAdmin';

{/*ADMIN-ROOMS IMPORT*/}
import RoomsIndex from './rooms/RoomsIndex';
import RoomsForm from './rooms/RoomsForm';
import RoomTypes from "./rooms/RoomTypes";
import RoomTypesForm from './rooms/RoomTypesForm'

{/*ADMIN-PROBLEM IMPORT*/}
import ProblemsIndex from "./problems/ProblemsIndex";
import ProblemForm from "./problems/ProblemForm";
import SubProblem from "./problems/SubProblem";
import ProblemsCategory from './problems/categories/ProblemsCategory';
import ProblemsCategoryForm from './problems/categories/ProblemsCategoryForm';

{/*ADMIN-BOOKING IMPORT*/}
import BookIndex from "./booking/BookIndex";
import BookForm from "./booking/BookForm";

{/*ADMIN-BOOKING IMPORT*/}
import NewsForm from "./news/NewsForm";
import NewsIndex from './news/NewsIndex';
import File from './File';

{/*ADMIN-CUSTOMER IMPORT*/}
import CustomersIndex from "./customers/CustomersIndex";
import CustomerForm from './customers/CustomerForm';

{/*ADMIN-CUSTOMER-SOURCE IMPORT*/}
import SourceCustomerIndex from './customers/source_customer/SourceCustomerIndex';
import SourceCustomerForm from "./customers/source_customer/SourceCustomerForm";
class Admin extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <>
                <div className="section d-flex">
                    <NavBarAdmin />
                    <div className="d-flex container-content-admin  justify-content-center">
                            <Switch >
                                <Route path="/public/admin" exact render={() => <DashboardAdmin />}/>
                                <Route path="/public/admin/rooms" exact
                                       render={() => <RoomsIndex />}
                                />

                                <Route path="/public/admin/rooms/create"
                                       render={(routeProps) => <RoomsForm {...routeProps}/>}
                                />

                                <Route path="/public/admin/rooms/update/:id"
                                       render={(routeProps) => <RoomsForm {...routeProps} />}
                                />
                                <Route path="/public/admin/rooms/types" exact
                                       render={() => <RoomTypes />}
                                />
                                <Route path="/public/admin/rooms/types/update/:id" exact
                                       render={(routeProps) => <RoomTypesForm {...routeProps} />}
                                />
                                <Route path="/public/admin/rooms/types/create" exact
                                       render={(routeProps) => <RoomTypesForm {...routeProps} />}
                                />


                                {/*ADMIN-PROBLEMS ROUTE*/}

                                <Route path="/public/admin/problems" exact
                                       render={() => <ProblemsIndex />}
                                />
                                <Route path="/public/admin/problems/create"
                                       render={(routeProps) => <ProblemForm {...routeProps} />}
                                />
                                <Route path="/public/admin/problems/update/:id"
                                       render={(routeProps) => <ProblemForm {...routeProps} />}
                                />
                                <Route path="/public/admin/subproblem/create/:parent_id"
                                       render={(routeProps) => <SubProblem {...routeProps} />}
                                />


                                {/*ADMIN-PROBLEMS ROUTE*/}
                                <Route path="/public/admin/problems/categories/" exact
                                       render={() => <ProblemsCategory />}
                                />
                                <Route path="/public/admin/problems/categories/create"  exact
                                       render={(routeProps) => <ProblemsCategoryForm {...routeProps} />}
                                />
                                <Route path="/public/admin/problems/categories/update/:id"
                                       render={(routeProps) => <ProblemsCategoryForm {...routeProps} />}
                                />


                                {/*ADMIN-BOOKING ROUTE*/}
                                <Route path="/public/admin/bookings" exact
                                       render={() => <BookIndex />}
                                />
                                <Route path="/public/admin/bookings/create"
                                       render={(routeProps) => <BookForm {...routeProps} />}
                                />
                                <Route path="/public/admin/bookings/update/:id"
                                       render={(routeProps) => <BookForm {...routeProps} />}
                                />


                                {/*ADMIN-NEWS ROUTE*/}
                                <Route path="/public/admin/news" exact
                                       render={() => <NewsIndex />}
                                />
                                <Route path="/public/admin/news/create"
                                       render={(routeProps) => <NewsForm {...routeProps} />}
                                />
                                <Route path="/public/admin/news/update/:id"
                                       render={(routeProps) => <NewsForm {...routeProps} />}
                                />

                                {/*ADMIN-CUSTOMERS ROUTE*/}
                                <Route path="/public/admin/customers" exact
                                       render={() => <CustomersIndex />}
                                />
                                <Route path="/public/admin/customers/create"
                                       render={(routeProps) => <CustomerForm {...routeProps} />}
                                />
                                <Route path="/public/admin/customers/update/:id"
                                       render={(routeProps) => <CustomerForm {...routeProps} />}
                                />


                                {/*ADMIN-CUSTOMERS-SOURCE ROUTE*/}
                                <Route path="/public/admin/customers" exact
                                       render={() => <SourceCustomerIndex />}
                                />
                                <Route path="/public/admin/customers/create"
                                       render={(routeProps) => <SourceCustomerForm {...routeProps} />}
                                />
                                <Route path="/public/admin/customers/update/:id"
                                       render={(routeProps) => <SourceCustomerForm {...routeProps} />}
                                />

                                <Route path="/public/admin/file"
                                       render={() => <File />}
                                />
                                <Route
                                    render={() => (<div>Sorry</div>)}
                                />
                                {/*ADMIN-ROOMS ROUTE*/}

                                {/*<Route path="/public/admin/rooms/create"*/}
                                       {/*render={(routeProps) => <RoomsForm {...routeProps} />}*/}
                                {/*/>*/}
                            </Switch>
                    </div>
                </div>
            </>
        );
    }
}

export default Admin;