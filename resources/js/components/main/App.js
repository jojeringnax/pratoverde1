import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter  as Router} from 'react-router-dom';

{/*MAIN PAGE IMPORT*/}
import NavBar from './NavBar';
import Main from './Main';
import RoomMain from '../rooms/RoomMain';

{/*ADMIN IMPORT*/}
import Admin from '../admin/Admin';

{/*ADMIN-ROOMS IMPORT*/}
import RoomsIndex from '../admin/rooms/RoomsIndex';
import RoomsForm from '../admin/rooms/RoomsForm';
import RoomTypes from "../admin/rooms/RoomTypes";
import RoomTypesForm from '../admin/rooms/RoomTypesForm'

{/*ADMIN-PROBLEM IMPORT*/}
import ProblemsIndex from "../admin/problems/ProblemsIndex";
import ProblemForm from "../admin/problems/ProblemForm";
import SubProblem from "../admin/problems/SubProblem";
import ProblemsCategory from '../admin/problems/categories/ProblemsCategory';
import ProblemsCategoryForm from '../admin/problems/categories/ProblemsCategoryForm';

{/*ADMIN-BOOKING IMPORT*/}
import BookIndex from "../admin/booking/BookIndex";
import BookForm from "../admin/booking/BookForm";

{/*ADMIN-BOOKING IMPORT*/}
import NewsForm from "../admin/news/NewsForm";
import NewsIndex from '../admin/news/NewsIndex';
import File from '../admin/File';

{/*ADMIN-CUSTOMER IMPORT*/}
import CustomersIndex from "../admin/customers/CustomersIndex";
import CustomerForm from '../admin/customers/CustomerForm';

{/*ADMIN-CUSTOMER-SOURCE IMPORT*/}
import SourceCustomerIndex from '../admin/customers/source_customer/SourceCustomerIndex';
import SourceCustomerForm from "../admin/customers/source_customer/SourceCustomerForm";

export default class App extends React.Component {
    render() {
        return (
            <div className="section">
                <NavBar />
                <Main />
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(
        <Router>
            <Switch>
                <Route path="/public" exact render={() => <App />} />
                <Route path="/public/rooms" render={() => <RoomMain />} />


                {/*ADMIN SYSTEM ROUTE*/}
                <Route path="/public/admin" exact render={() => <Admin />} />


                {/*ADMIN-ROOMS ROUTE*/}
                <Route path="/public/admin/rooms" exact
                       render={() => <RoomsIndex />}
                />
                <Route path="/public/admin/rooms/create"
                       render={(routeProps) => <RoomsForm {...routeProps} />}
                />
                <Route path="/public/admin/rooms/update/:id"
                       render={(routeProps) => <RoomsForm {...routeProps} />}
                />
                <Route path="/public/admin/rooms/types" exact
                       render={() => <RoomTypes />}
                />
                <Route path="/public/admin/rooms/types/:status/:id" exact
                       render={(routeProps) => <RoomTypesForm {...routeProps} />}
                />
                <Route path="/public/admin/rooms/types/:status" exact
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
                <Route path="/public/admin/booking" exact
                       render={() => <BookIndex />}
                />
                <Route path="/public/admin/booking/create"
                       render={(routeProps) => <BookForm {...routeProps} />}
                />
                <Route path="/public/admin/booking/update/:id"
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
            </Switch>
        </Router>,
        document.getElementById('root')
    );
}
