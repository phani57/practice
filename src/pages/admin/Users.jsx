import "../../styles/admin/Users.css";
import { useEffect, useState } from "react";
import userService from "../../services/admin/userService";

function Users() {

    const [users, setUsers] = useState([]);

    const [searchText, setSearchText] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    useEffect(() => {

        loadUsers();

    }, []);

    async function loadUsers() {

        try {

            const data = await userService.getUsers();

            setUsers(data);

        }

        catch (error) {

            console.log(error);

        }

    }

    const filteredUsers = users.filter(user =>

        (user.name || "")

            .toLowerCase()

            .includes(searchText.toLowerCase())

        ||

        (user.email || "")

            .toLowerCase()

            .includes(searchText.toLowerCase())

    );

    const totalPages = Math.ceil(

        filteredUsers.length / itemsPerPage

    );

    const start =

        (currentPage - 1) * itemsPerPage;

    const end = start + itemsPerPage;

    const paginatedUsers =

        filteredUsers.slice(start, end);

    function previousPage() {

        if (currentPage > 1) {

            setCurrentPage(

                currentPage - 1

            );

        }

    }

    function nextPage() {

        if (currentPage < totalPages) {

            setCurrentPage(

                currentPage + 1

            );

        }

    }

    function onSearchChange(e) {

        setSearchText(

            e.target.value

        );

        setCurrentPage(1);

    }

    return (

        <div className="users-container">

            {/* ==========================
                PAGE HEADER
            ========================== */}

            <div className="page-header">

                <div>

                    <p className="page-subtitle">

                        User Management

                    </p>

                    <h1 className="page-title">

                        Registered Users

                    </h1>

                </div>

            </div>

            {/* SEARCH */}

            <div className="toolbar">

                <input

                    className="search-box"

                    type="text"

                    placeholder="Search users..."

                    value={searchText}

                    onChange={onSearchChange}

                />

            </div>

            {/* TABLE */}

            <div className="table-card">

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Wallet</th>

                            <th>Fantasy Points</th>

                            <th>Joined</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            paginatedUsers.length === 0 ?

                                (

                                    <tr>

                                        <td

                                            colSpan="6"

                                            className="empty-state"

                                        >

                                            No Users Found

                                        </td>

                                    </tr>

                                )

                                :

                                paginatedUsers.map(user => (

                                    <tr key={user.id}>

                                        <td>

                                            #{user.id}

                                        </td>

                                        <td>

                                            {user.name}

                                        </td>

                                        <td>

                                            {user.email}

                                        </td>

                                        <td>

                                            ₹ {user.wallet_balance}

                                        </td>

                                        <td>

                                            {user.fantasy_points}

                                        </td>

                                        <td>

                                            {

                                                new Date(

                                                    user.created_at

                                                ).toLocaleDateString(

                                                    "en-GB",

                                                    {

                                                        day: "2-digit",

                                                        month: "short",

                                                        year: "numeric"

                                                    }

                                                )

                                            }

                                        </td>

                                    </tr>

                                ))

                        }

                    </tbody>

                </table>

            </div>

            {/* PAGINATION */}

            <div className="pagination">

                <button

                    className="page-btn"

                    onClick={previousPage}

                    disabled={currentPage === 1}

                >

                    Previous

                </button>

                <span>

                    Page {totalPages === 0 ? 0 : currentPage}

                    {" "}of{" "}

                    {totalPages}

                </span>

                <button

                    className="page-btn"

                    onClick={nextPage}

                    disabled={

                        currentPage === totalPages ||

                        totalPages === 0

                    }

                >

                    Next

                </button>

            </div>

        </div>

    );

}

export default Users;