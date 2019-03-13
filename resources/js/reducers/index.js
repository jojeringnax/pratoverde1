import { combineReducers } from 'redux'
import { getRoomTypes } from './booking';
import { getRooms } from "./rooms";


export const rootReducer =  combineReducers({
    roomTypes: getRoomTypes,
    rooms: getRooms
});