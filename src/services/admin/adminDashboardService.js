import api from "../../api/axios";

const getDashboardStats = async () => {

    const response = await api.get(

        "/admin/dashboard-api"

    );

    return response.data;

};

//practice --sample data from api
async function getExternalUsers() {

    const token = localStorage.getItem("token");

    const response = await api.get(
        "/external-users",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
}
export default {

    getDashboardStats,
    getExternalUsers
};