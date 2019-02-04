import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter as Router} from 'react-router-dom';
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
import BookCreate from "../admin/booking/BookCreate";
import BookUpdate from "../admin/booking/BookUpdate";
{/*ADMIN-BOOKING IMPORT*/}
import NewsForm from "../admin/news/NewsForm";
import NewsIndex from '../admin/news/NewsIndex';
import File from '../admin/File';
{/*ADMIN-CUSTOMER IMPORT*/}
import CustomersIndex from "../admin/customers/CustomersIndex";
import CustomerForm from '../admin/customers/CustomerForm'



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
                <Route path="/public" exact component={App} />
                <Route path="/public/rooms" component={RoomMain} />
                {/*ADMIN SYSTEM ROUTE*/}
                <Route path="/public/admin" exact render={() => <Admin/>} />
                {/*ADMIN-ROOMS ROUTE*/}

                <Route path="/public/admin/rooms" exact component={RoomsIndex} />
                <Route path="/public/admin/rooms/create" component={RoomsForm} />
                <Route path="/public/admin/rooms/update/:id" component={RoomsForm} />
                <Route path="/public/admin/rooms/types" exact component={RoomTypes} />
                <Route path="/public/admin/rooms/types/:status/:id" exact component={RoomTypesForm} />
                <Route path="/public/admin/rooms/types/:status" exact component={RoomTypesForm} />
                {/*ADMIN-PROBLEMS ROUTE*/}

                <Route path="/public/admin/problems" exact component={ProblemsIndex} />
                <Route path="/public/admin/problems/create" component={ProblemForm} />
                <Route path="/public/admin/problems/update/:id" component={ProblemForm} />
                <Route path="/public/admin/subproblem/create/:parent_id" component={SubProblem} />

                {/*ADMIN-PROBLEMS ROUTE*/}
                <Route path="/public/admin/problems/categories/" exact component={ProblemsCategory} />
                <Route path="/public/admin/problems/categories/create"  exact component={ProblemsCategoryForm} />
                <Route path="/public/admin/problems/categories/update/:id" component={ProblemsCategoryForm} />

                {/*ADMIN-BOOKING ROUTE*/}
                <Route path="/public/admin/booking" exact component={BookIndex}/>
                <Route path="/public/admin/booking/create" component={BookCreate}/>
                <Route path="/public/admin/booking/update/:id" component={BookUpdate}/>

                {/*ADMIN-NEWS ROUTE*/}
                <Route path="/public/admin/news" exact component={NewsIndex}/>
                <Route path="/public/admin/news/create" component={NewsForm}/>
                <Route path="/public/admin/news/update/:id" component={NewsForm}/>

                {/*ADMIN-CUSTOMERS ROUTE*/}
                <Route path="/public/admin/customers" exact component={CustomersIndex}/>
                <Route path="/public/admin/customers/create" component={CustomerForm}/>
                <Route path="/public/admin/customers/update/:id" component={CustomerForm}/>

                <Route path="/public/admin/file" component={File}/>
                <Route render={() => (<div>Sorry</div>)}/>
            </Switch>
        </Router>,
        document.getElementById('root')
    );
}
