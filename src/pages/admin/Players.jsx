import styles from "../../styles/admin/Players.module.css";

import { useEffect, useState } from "react";

import playerService from "../../services/admin/playerService";
import PlayersHeader from "../../components/admin/players/PlayersHeader";
import PlayersToolbar from "../../components/admin/players/PlayersToolbar";
import PlayersTable from "../../components/admin/players/PlayersTable";
import PlayerModal from "../../components/admin/players/PlayerModal";
import ConfirmModal from "../../components/common/ConfirmModal";
function Players() {

    const [players, setPlayers] = useState([]);

    const [searchText, setSearchText] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const [showModal, setShowModal] = useState(false);

    const [isEditMode, setIsEditMode] = useState(false);

    const [editingPlayer, setEditingPlayer] = useState(null);

    const [successMessage, setSuccessMessage] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const [deleteTargetId, setDeleteTargetId] = useState(null);

    useEffect(() => {

        loadPlayers();

    }, []);

    async function loadPlayers() {

        try {

            const data = await playerService.getPlayers();

            setPlayers(data);

        }

        catch (error) {

            console.log(error);

        }

    }

    function openCreateModal() {

        setShowModal(true);

        setIsEditMode(false);

        setEditingPlayer(null);

    }
    function closeModal() {

        setShowModal(false);

        setIsEditMode(false);

        setEditingPlayer(null);

        localStorage.removeItem(

            "playerFormDraft"

        );

    }

    function editPlayer(player) {

        setEditingPlayer(player);

        setIsEditMode(true);

        setShowModal(true);

    }

    // Open confirm modal for deleting a player
    function handleDeleteClick(id) {
        setDeleteTargetId(id);
        setIsConfirmOpen(true);
    }

    async function deletePlayer() {
        setIsConfirmOpen(false);
        if (!deleteTargetId) return;

        try {
            const response = await playerService.deletePlayer(deleteTargetId);

            setSuccessMessage(

                response.message

            );

            loadPlayers();

            setTimeout(() => {

                setSuccessMessage("");

            }, 3000);

        }

        catch (error) {

            setErrorMessage(

                error.response?.data?.message ||

                "Unable to delete player"

            );

            setTimeout(() => {

                setErrorMessage("");

            }, 3000);

        }

    }
    async function savePlayer(formData) {

        try {

            if (isEditMode) {

                await playerService.updatePlayer(

                    editingPlayer.id,

                    formData

                );

                setSuccessMessage(

                    "Player Updated Successfully"

                );

            }

            else {

                await playerService.addPlayer(

                    formData

                );

                setSuccessMessage(

                    "Player Added Successfully"

                );

            }

            await loadPlayers();

            closeModal();

            setTimeout(() => {

                setSuccessMessage("");

            }, 3000);


        }

        catch (error) {

            setErrorMessage(

                error.response?.data?.message ||

                "Something went wrong"

            );

            setTimeout(() => {

                setErrorMessage("");

            }, 3000);

        }

    }

    const filteredPlayers = players.filter(player =>

        (player.player_name || "")

            .toLowerCase()

            .includes(searchText.toLowerCase())

    );

    const totalPages = Math.ceil(

        filteredPlayers.length / itemsPerPage

    );

    const start =

        (currentPage - 1) * itemsPerPage;

    const end = start + itemsPerPage;

    const paginatedPlayers =

        filteredPlayers.slice(start, end);

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

    //rehydration
    useEffect(() => {

        const draft = localStorage.getItem(

            "playerFormDraft"

        );

        if (!draft) {

            return;

        }

        const data = JSON.parse(draft);

        setShowModal(data.showModal);

        setIsEditMode(data.isEditMode);

        setEditingPlayer(data.editingPlayer);

    }, []);

    //rehydration
    useEffect(() => {

        if (!showModal) {

            return;

        }

        const draft = {

            showModal,

            isEditMode,

            editingPlayer

        };

        localStorage.setItem(

            "playerFormDraft",

            JSON.stringify(draft)

        );

    }, [

        showModal,

        isEditMode,

        editingPlayer

    ]);

    return (

        <div className={styles.playersContainer}>

            <PlayersHeader

                onAddPlayer={openCreateModal}

            />
            {

                successMessage && (

                    <div className={styles.successMessage}>

                        {successMessage}

                    </div>

                )

            }

            {

                errorMessage && (

                    <div className={styles.errorMessage}>

                        {errorMessage}

                    </div>

                )

            }

            <PlayersToolbar

                searchText={searchText}

                onSearchChange={onSearchChange}

            />

            <PlayersTable

                players={paginatedPlayers}

                onEdit={editPlayer}

                onDelete={handleDeleteClick}

            />
            <div className={styles.pagination}>

                <button

                    className={styles.pageBtn}

                    onClick={previousPage}

                    disabled={currentPage === 1}

                >

                    Previous

                </button>

                <span>

                    Page {currentPage} of {totalPages || 1}

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
            <PlayerModal

                show={showModal}

                isEditMode={isEditMode}

                editingPlayer={editingPlayer}

                onClose={closeModal}

                onSave={savePlayer}

            />

            <ConfirmModal
                open={isConfirmOpen}
                title="Delete Player"
                message="Are you sure you want to delete this player? This action cannot be undone."
                onConfirm={deletePlayer}
                onCancel={() => setIsConfirmOpen(false)}
            />

        </div>


    );

}

export default Players;