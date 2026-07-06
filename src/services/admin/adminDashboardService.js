import api from "../../api/axios";

const getDashboardStats = async () => {

    const response = await api.get(

        "/admin/dashboard-api"

    );

    return response.data;

};

export default {

    getDashboardStats

};