import styles from "../styles/pages/Register.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

function Register() {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const [successMessage, setSuccessMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function register(e) {

        e.preventDefault();

        setErrorMessage("");

        setSuccessMessage("");

        if (!name.trim()) {

            setErrorMessage("Name is required");

            return;

        }

        if (!email.trim()) {

            setErrorMessage("Email is required");

            return;

        }

        if (!password.trim()) {

            setErrorMessage("Password is required");

            return;

        }

        if (password.length < 6) {

            setErrorMessage("Password must be at least 6 characters");

            return;

        }

        try {

            setLoading(true);

            const response = await authService.register(

                name,

                email,

                password

            );

            setSuccessMessage(response.message);

            setTimeout(() => {

                navigate("/");

            }, 2000);

        }

        catch (error) {

            const errors = error.response?.data?.errors;

            if (errors) {

                const firstError = Object.values(errors).flat()[0];

                setErrorMessage(firstError);

            }

            else {

                setErrorMessage(

                    error.response?.data?.message ||

                    "Registration Failed"

                );

            }

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className={styles.authContainer}>

            <div className={styles.authCard}>

                <div className={styles.logo}>

                    🏆

                </div>

                <h1>

                    Create Account

                </h1>

                <p className={styles.subtitle}>

                    Join Fantasy League and start managing tournaments

                </p>

                <form onSubmit={register}>

                    <input

                        type="text"

                        placeholder="Full Name"

                        value={name}

                        onChange={(e) =>

                            setName(e.target.value)

                        }

                    />

                    <input

                        type="email"

                        placeholder="Email Address"

                        value={email}

                        onChange={(e) =>

                            setEmail(e.target.value)

                        }

                    />

                    <input

                        type="password"

                        placeholder="Password"

                        value={password}

                        onChange={(e) =>

                            setPassword(e.target.value)

                        }

                    />

                    {

                        errorMessage &&

                        <p className={styles.error}>

                            {errorMessage}

                        </p>

                    }

                    {

                        successMessage &&

                        <div className={styles.successMessage}>

                            {successMessage}

                        </div>

                    }

                    <button

                        type="submit"

                        disabled={loading}

                    >

                        {

                            loading

                                ?

                                "Creating Account..."

                                :

                                "Create Account"

                        }

                    </button>

                    <p className={styles.authLink}>

                        Already have an account?

                        {" "}

                        <Link to="/">

                            Login

                        </Link>

                    </p>

                </form>

            </div>

        </div>

    );

}

export default Register;