import React, { Component } from 'react';
import {Link, NavLink} from "react-router-dom";

let names = [];

const navOptions = [
    {id: 0, link:"/public/admin/rooms",level:1, name : 'Номера', enName : 'rooms', parent_id: null},
    {id: 1, link:"/public/admin/rooms/create",level:2, name : 'Создать номер', enName : 'create_rooms', parent_id: 0},
    {id: 2, link:"/public/admin/rooms/types",level:2, name : 'Типы номеров', enName : 'TypesRoom', parent_id: 0},
    {id: 3, link:"/public/admin/rooms/types/create",level:3, name : 'Создать тип номера', enName : 'create_types_room', parent_id: 2},
    {id: 4, link:"/public/admin/problems",level:1, name : 'Проблемы', enName : 'problems', parent_id: null},
    {id: 5, link:"/public/admin/problems/create",level:2, name : 'Создать проблему', enName : 'create_problem', parent_id: 4},
    {id: 6, link:"/public/admin/problems/categories",level:2, name : 'Категории проблем', enName : 'problems_categories', parent_id: 4},
    {id: 7, link:"/public/admin/problems/categories/create",level:3, name : 'Создать категорию проблем', enName : 'create_problems_categories', parent_id: 6},
    {id: 8, link:"/public/admin/subproblem/create",level:2, name : 'Создать подпроблему', enName : 'create_subproblem', parent_id: 4},
    {id: 9, link:"/public/admin/bookings",level:1, name : 'Бронирование номеров', enName : 'bookings', parent_id: null},
    {id: 10, link:"/public/admin/bookings/create",level:2, name : 'Забронировать номер', enName : 'create_booking', parent_id: 9},
    {id: 11, link:"/public/admin/customers",level:1, name : 'Клиенты', enName : 'customers', parent_id: null},
    {id: 12, link:"/public/admin/customers/create",level:2, name : 'Создать клиента', enName : 'create_customers', parent_id: 11},
    {id: 13, link:"/public/admin/customers/source",level:2, name : 'Источники', enName : 'sources', parent_id: 11},
    {id: 14, link:"/public/admin/customers/source/create",level:3, name : 'Создать источник', enName : 'create_source_customers', parent_id: 13},
    {id: 15, link:"/public/admin/news",level:1, name : 'Блог', enName : 'news', parent_id: null},
    {id: 16, link:"/public/admin/news/create",level:2, name : 'Создать новость', enName : 'create_news', parent_id: 15}
];

class NavBarAdmin extends React.Component {
    constructor(props) {
        super(props);
    }

    createNavComponents = () => {

    };

    createNav = (arr) => {
        let table = '';
        let rows = '';
        let close = '';
        arr.forEach(function(li,index){
            for (let key in li) {
                if(key === 'name') {
                    if(li['id'] !== 0 && li['id'] !== 16) {
                        if(li['parent_id'] === arr[index-1]['id']) {

                            rows +=
                                '<ul><li>' +
                                '<a href='+li['link']+'>' + li['name'] +'</a>' +
                                '</li>';

                        } else if(li['parent_id'] === arr[index-1]['parent_id']) {

                            rows +=
                                '<li>' +
                                '<a href='+li['link']+'>' + li['name'] +'</a>' +
                                '</li>';

                        } else {

                            close = '';
                            let len = 0;

                            if(li['parent_id'] !== null) {
                                len = arr[index-1]['level']-2;
                            } else {
                                len = arr[index-1]['level']-1;
                            }

                            for(let i=0; i < len ; i++) {
                                close += '</ul>';
                            }

                            rows +=
                                close + '<li>' +
                                    '<a href='+li['link']+'>' + li['name'] +'</a>' +
                                '</li>';
                        }

                    }else if(li['id'] === 16){
                        rows +=
                            '<ul><li>' +
                                '<a href='+li['link']+'>' + li['name'] +'</a>' +
                            '</li></ul></ul>';

                    } else if(li['id'] === 0) {
                        rows +=
                            '<ul><li>' +
                                '<a href='+li['link']+'>' + li['name'] + '</a>' +
                            '</li>';
                    }
                }
            }

            //console.log('----row', rows);
        });
        table = rows;
        //document.getElementById('navAdmin').innerHTML = table;
    };

    componentDidMount() {
        this.createNav(navOptions)

    }

    activeStyles = {
        fontWeight: "bold",
        color: "black"
    };

    render() {
        return (
            <>
                <div className="nav-admin">
                    <nav id="navAdmin" className="navbar navbar-expand-lg">
                        <ul>
                            <li>{/*start rooms nav */}
                                <NavLink activeStyle={this.activeStyles} to="/admin/rooms">Номера</NavLink>
                                <ul>
                                    <li><NavLink activeStyle={this.activeStyles} to="/admin/rooms/create">Создать номер</NavLink></li>
                                    <li>
                                        <NavLink activeStyle={this.activeStyles} to="/admin/rooms/types">Типы номеров</NavLink>
                                        <ul>
                                            <li><NavLink activeStyle={this.activeStyles} to="/admin/rooms/types/create">Создать тип номера</NavLink></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>{/*end rooms nav */}

                            <li>{/*start problems nav */}
                                <NavLink activeStyle={this.activeStyles} to="/admin/problems">Проблемы</NavLink>
                                <ul>
                                    <li><NavLink activeStyle={this.activeStyles} to="/admin/problems/create">Создать проблему</NavLink></li>
                                    <li>
                                        <NavLink activeStyle={this.activeStyles} to="/admin/problems/categories">Категории проблем</NavLink>
                                        <ul>
                                            <li><NavLink activeStyle={this.activeStyles} to="/admin/problems/categories/create">Создать категорию проблем</NavLink></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>{/*end problems nav */}

                            <li>{/*start bookings nav */}
                                <NavLink activeStyle={this.activeStyles} to="/admin/bookings">Бронирование номеров</NavLink>
                                <ul>
                                    <li><NavLink activeStyle={this.activeStyles} to="/admin/bookings/create">Забронировать номер</NavLink></li>
                                </ul>
                            </li>{/*end bookings nav */}

                            <li>{/*start customers nav */}
                                <NavLink activeStyle={this.activeStyles} to="/admin/customers">Клиенты</NavLink>
                                <ul>
                                    <li><NavLink activeStyle={this.activeStyles} to="/admin/customers/create">Создать клиента</NavLink></li>
                                    <li>
                                        <NavLink activeStyle={this.activeStyles} to="/admin/customers/source">Источники</NavLink>
                                        <ul>
                                            <li><NavLink activeStyle={this.activeStyles} to="/admin/customers/source/create">Создать источник</NavLink></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>{/*end bookings nav */}

                            <li>{/*start news nav */}
                                <NavLink activeStyle={this.activeStyles}  to="/admin/news">Блог</NavLink>
                                <ul>
                                    <li><NavLink activeStyle={this.activeStyles} to="/admin/news/create">Создать новость</NavLink></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </>
        );
    }
}

export default NavBarAdmin;