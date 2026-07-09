import styles from "../styles/pages/Profile.module.css";
import { useEffect, useState } from "react";
import profileService from "../services/profileService";

function Profile() {

    const [profile, setProfile] = useState(null);

    useEffect(() => {

        async function loadProfile() {

            try {

                const data = await profileService.getProfile();

                setProfile(data);

            }

            catch (error) {

                console.log(error);

            }

        }

        loadProfile();

    }, []);

    if (!profile) {

        return null;

    }

    return (

        <>


            <div className={styles.profileContainer}>

                <div className={styles.profileCard}>

                    <div className={styles.profileHeader}>

                        <div className={styles.profileAvatar}>

                            {profile.name.charAt(0).toUpperCase()}

                        </div>

                        <h2>

                            {profile.name}

                        </h2>

                        <p>

                            {profile.email}

                        </p>

                    </div>

                    <div className={styles.profileStatsGrid}>

                        <div className={styles.profileStatCard}>

                            <h3>

                                Fantasy Points

                            </h3>

                            <p>

                                🏆 {profile.fantasy_points}

                            </p>

                        </div>

                        <div className={styles.profileStatCard}>

                            <h3>

                                Wallet Balance

                            </h3>

                            <p>

                                ₹{profile.wallet_balance}

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Profile;