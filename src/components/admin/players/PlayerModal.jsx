import styles from "../../../styles/admin/Players.module.css";
import { useState, useEffect } from "react";

function PlayerModal({show,isEditMode,editingPlayer,onClose,onSave}) {

    const emptyForm = {

        player_name: "",

        player_price: "",

        age: "",

        country: ""

    };

    const [form, setForm] = useState(emptyForm);

    //rehydration
    useEffect(() => {

        if (!show) {

            return;

        }

        const draft = localStorage.getItem(

            "playerModalDraft"

        );

        if (draft) {

            setForm(

                JSON.parse(draft)

            );

        }

        else if (editingPlayer) {

            setForm({

                player_name: editingPlayer.player_name,

                player_price: editingPlayer.player_price,

                age: editingPlayer.age,

                country: editingPlayer.country

            });

        }

        else {

            setForm(emptyForm);

        }

    }, [

        show,

        editingPlayer

    ]);

    //rehydration
    useEffect(() => {

        if (!show) {

            return;

        }

        localStorage.setItem(

            "playerModalDraft",

            JSON.stringify(form)

        );

    }, [

        form,

        show

    ]);

    function handleChange(e) {

        const {

            name,

            value

        } = e.target;

        setForm({

            ...form,

            [name]: value

        });

    }

    function handleSubmit(e) {

        e.preventDefault();

        onSave(form);

    }

    if (!show) {

        return null;

    }

    return (

        <div className={styles.modalBackdrop}>

            <div className={styles.modalCard}>

                <h2>

                    {

                        isEditMode

                            ?

                            "Edit Player"

                            :

                            "Add Player"

                    }

                </h2>

                <form onSubmit={handleSubmit}>

                    <div className={styles.formGroup}>

                        <label>

                            Player Name

                        </label>

                        <input

                            type="text"

                            name="player_name"

                            value={form.player_name}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div className={styles.formGroup}>

                        <label>

                            Player Price

                        </label>

                        <input

                            type="number"

                            name="player_price"

                            value={form.player_price}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div className={styles.formGroup}>

                        <label>

                            Age

                        </label>

                        <input

                            type="number"

                            name="age"

                            value={form.age}

                            onChange={handleChange}

                        />

                    </div>

                    <div className={styles.formGroup}>

                        <label>

                            Country

                        </label>

                        <input

                            type="text"

                            name="country"

                            value={form.country}

                            onChange={handleChange}

                        />

                    </div>

                    <div className={styles.modalButtons}>

                        <button

                            type="button"

                            className={styles.cancelBtn}

                            onClick={onClose}

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className={styles.saveBtn}

                        >

                            {

                                isEditMode

                                    ?

                                    "Update Player"

                                    :

                                    "Save Player"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default PlayerModal;