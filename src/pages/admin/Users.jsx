import styles from "../../styles/admin/Users.module.css";
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

        <div className={styles.usersContainer}>

            {/* ==========================
                PAGE HEADER
            ========================== */}

            <div className={styles.pageHeader}>

                <div>

                    <p className={styles.pageSubtitle}>

                        User Management

                    </p>

                    <h1 className={styles.pageTitle}>

                        Registered Users

                    </h1>

                </div>

            </div>

            {/* SEARCH */}

            <div className={styles.toolbar}>

                <input

                    className={styles.searchBox}

                    type="text"

                    placeholder="Search users..."

                    value={searchText}

                    onChange={onSearchChange}

                />

            </div>

            {/* TABLE */}

            <div className={styles.tableCard}>

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

                                            className={styles.emptyState}

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

            <div className={styles.pagination}>

                <button

                    className={styles.pageBtn}

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

                    className={styles.pageBtn}

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