import styles from "../styles/pages/Login.module.css";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import AuthContext from "../context/AuthContext";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    async function login(e) {
        e.preventDefault();

        setErrorMessage("");

        if (!email.trim()) {
            setErrorMessage("Email is required");
            return;
        }

        if (!password.trim()) {
            setErrorMessage("Password is required");
            return;
        }

        try {
            setLoading(true);

            const response = await authService.login(
                email,
                password
            );
            setUser(response.user);
            if (response.user.role === "admin") {

                navigate("/admin/dashboard");

            }

            else {

                navigate("/dashboard");

            }

        } catch (error) {

            console.log(error);

            setErrorMessage("Invalid Email or Password");

        } finally {

            setLoading(false);

        }
    }

    return (
        <div className={styles.authContainer}>
            <div className={styles.authCard}>
                <form onSubmit={login}>
                    <div className={styles.logo}>🏆</div>

                    <h1>Fantasy League</h1>

                    <p className={styles.subtitle}>
                        Welcome back! Login to continue
                    </p>

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {errorMessage && (
                        <p className={styles.error}>
                            {errorMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className={styles.authLink}>
                        Don't have an account?{" "}
                        <Link to="/register">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;