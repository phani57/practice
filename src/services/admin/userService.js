import api from "../../api/axios";

async function getUsers() {

    const response = await api.get(

        "/admin/users-api"

    );

    return response.data;

}

export default {

    getUsers

};