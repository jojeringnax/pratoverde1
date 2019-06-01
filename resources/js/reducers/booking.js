import axios from "axios";
let initialState = [
    {asd:'asd '}
];

function getTypes() {
    axios.get("/public/api/admin/room_types")
        .then(response => {
            if(response.data.length !== 0) {
                initialState = response.data
            } else {
                return "Типов номеров нет"
            }
        })
        .catch(function(error) {
        });
}

getTypes();


export function getRoomTypes(state = initialState) {
    return state
}