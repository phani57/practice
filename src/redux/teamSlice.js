import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    teamName: "",

    selectedPlayers: [],

    captain: null,

    viceCaptain: null,

    totalBudget: 100,

    usedBudget: 0,

    remainingBudget: 100,

    errorMessage: "",

    editingTeam: null,

};


const teamSlice = createSlice({

    name: "team",

    initialState,

    reducers: {

        setTeamName(state, action) {

            state.teamName = action.payload;

        },

        addPlayer(state, action) {

            const player = action.payload;

            const price = Number(player.player_price);

            if (state.selectedPlayers.length >= 11) {

                state.errorMessage = "Maximum 11 players allowed";

                return;

            }

            if (state.remainingBudget < price) {

                state.errorMessage = "Not enough budget";

                return;

            }

            state.selectedPlayers.push(player);

            state.usedBudget += price;

            state.remainingBudget =
                state.totalBudget - state.usedBudget;

            state.errorMessage = "";

        },

        removePlayer(state, action) {

            const player = state.selectedPlayers.find(

                p => p.id === action.payload

            );

            if (player) {

                state.usedBudget -= Number(player.player_price);

                state.remainingBudget =
                    state.totalBudget - state.usedBudget;

            }

            state.selectedPlayers =
                state.selectedPlayers.filter(

                    p => p.id !== action.payload

                );

            if (
                state.captain &&
                state.captain.id === action.payload
            ) {

                state.captain = null;

            }

            if (
                state.viceCaptain &&
                state.viceCaptain.id === action.payload
            ) {

                state.viceCaptain = null;

            }

            state.errorMessage = "";

        },

        setCaptain(state, action) {

            if (

                state.viceCaptain &&

                state.viceCaptain.id === action.payload.id

            ) {

                state.errorMessage =
                    "Captain and Vice Captain cannot be same";

                return;

            }

            state.captain = action.payload;

            state.errorMessage = "";

        },

        setViceCaptain(state, action) {

            if (

                state.captain &&

                state.captain.id === action.payload.id

            ) {

                state.errorMessage =
                    "Captain and Vice Captain cannot be same";

                return;

            }

            state.viceCaptain = action.payload;

            state.errorMessage = "";

        },

        setEditingTeam(state, action) {

            state.editingTeam = action.payload;

        },

        clearEditingTeam(state) {

            state.editingTeam = null;

        },

        loadEditingTeam(state, action) {

            const team = action.payload;

            state.teamName = team.team_name;

            state.selectedPlayers = team.players;

            state.captain = team.players.find(

                player => player.pivot.is_captain === 1

            ) || null;

            state.viceCaptain = team.players.find(

                player => player.pivot.is_vice_captain === 1

            ) || null;

            state.usedBudget = team.players.reduce(

                (total, player) =>

                    total + Number(player.player_price),

                0

            );

            state.remainingBudget =

                state.totalBudget -

                state.usedBudget;

        },

        resetTeam(state) {

            state.teamName = "";

            state.selectedPlayers = [];

            state.captain = null;

            state.viceCaptain = null;

            state.usedBudget = 0;

            state.remainingBudget = 100;

            state.errorMessage = "";

            state.editingTeam = null;

        },
        restoreDraft(state, action) {

            state.teamName = action.payload.teamName;

            state.selectedPlayers = action.payload.selectedPlayers;

            state.captain = action.payload.captain;

            state.viceCaptain = action.payload.viceCaptain;

            state.usedBudget = action.payload.usedBudget;

            state.remainingBudget = action.payload.remainingBudget;

        }

    }

});

export const {

    setTeamName,

    addPlayer,

    removePlayer,

    setCaptain,

    setViceCaptain,

    setEditingTeam,

    clearEditingTeam,

    loadEditingTeam,
    resetTeam,
    restoreDraft

} = teamSlice.actions;

export default teamSlice.reducer;