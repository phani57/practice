import styles from "../styles/pages/Profile.module.css";
import { useEffect, useState, useContext } from "react";
import profileService from "../services/profileService";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import { useRef } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/cropImage";

function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  // Reference to access the hidden file input element programmatically
  const fileInputRef = useRef(null);

  // Form states
  const [editName, setEditName] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  //image cropper
  // Tracks the coordinates (x, y) of the crop box
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const [zoom, setZoom] = useState(1);

  // Stores the final cropped region dimensions in pixels
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Controls whether the image cropper modal is visible
  const [showCropper, setShowCropper] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await profileService.getProfile();
        setProfile(data);
        setEditName(data.name || "");

        // Sync with AuthContext user state
        if (user) {
          const updatedUser = {
            ...user,
            name: data.name,
            email: data.email,
            wallet_balance: data.wallet_balance,
            fantasy_points: data.fantasy_points,
          };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        toast.error("Failed to load profile details");
      }
    }
    loadProfile();
  }, [setUser]);

  if (!profile) {
    return (
      <div className={styles.loadingContainer}>
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  // Handle Profile Update (Client-side simulation with synced local storage & AuthContext)
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (!editName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const updatedProfile = { ...profile, name: editName };
      setProfile(updatedProfile);

      // Sync auth context
      if (user) {
        const updatedUser = { ...user, name: editName };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      setIsSubmitting(false);
      toast.success("Profile updated successfully!");
      setActiveTab("overview");
    }, 800);
  };

  // Handle Deposit (Client-side simulation with synced local storage & AuthContext)
  const handleDeposit = (e) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid deposit amount");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newBalance = parseFloat(profile.wallet_balance || 0) + amount;
      const updatedProfile = { ...profile, wallet_balance: newBalance };
      setProfile(updatedProfile);

      // Sync auth context
      if (user) {
        const updatedUser = { ...user, wallet_balance: newBalance };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      setIsSubmitting(false);
      toast.success(`Successfully deposited ₹${amount.toLocaleString()}!`);
      setDepositAmount("");
      setActiveTab("overview");
    }, 1000);
  };

  const handleQuickAmount = (amount) => {
    setDepositAmount(amount.toString());
  };

  // Handles file selection, creates a temporary preview URL, and opens the cropper
  function handleImageSelect(event) {
    // Get the first selected file from the file input
    const file = event.target.files[0];

    if (!file) return;

    setSelectedImage(file);

    // Create a temporary object URL representing the selected file for image previewing
    const preview = URL.createObjectURL(file);

    setPreviewImage(preview);

    setShowCropper(true);
  }

  // Handles the profile image upload process
  async function uploadImage() {
    if (!selectedImage) return;

    // Create FormData object to send binary file data via multipart/form-data request
    // const formData = new FormData();

    // formData.append("profile_image", selectedImage);

    //Base64
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result;

      console.log(base64Image);

      try {
        const response = await profileService.uploadProfileImage({
          profile_image: base64Image,
        });

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    reader.readAsDataURL(selectedImage);

    return;

    // try {
    //   // Backend validates (required, image, mimes:jpg,jpeg,png, max:5MB), stores in public storage, and updates DB path
    //   await profileService.uploadProfileImage(formData);

    //   // Refresh user profile details from the database after successful image upload
    //   const updatedProfile = await profileService.getProfile();

    //   setProfile(updatedProfile);

    //   setSelectedImage(null);

    //   setPreviewImage(null);

    //   toast.success("Profile image updated successfully!");
    // } catch (error) {
    //   console.log(error);
    // }
  }

  // Simulates a click on the hidden file input to trigger the system's file browser
  function openFilePicker() {
    fileInputRef.current.click();
  }
  // Resets the selected and preview image states, cancelling the selection
  function cancelImage() {
    setSelectedImage(null);

    setPreviewImage(null);
  }

  // Generates the cropped image blob using the canvas utility and updates the preview/selection
  async function handleCropSave() {
    // Crop the image on a canvas using the selected pixel coordinates and return a blob
    const croppedBlob = await getCroppedImg(previewImage, croppedAreaPixels);

    // Convert the cropped blob into a File object to prepare it for uploading
    const croppedFile = new File([croppedBlob], "profile.jpg", {
      type: "image/jpeg",
    });

    setSelectedImage(croppedFile);

    setPreviewImage(URL.createObjectURL(croppedFile));

    setShowCropper(false);
  }
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        {/* Profile Card Header */}
        <div className={styles.profileHeader}>
          <div
            className={styles.profileAvatar}
            onClick={openFilePicker}
            style={{ cursor: "pointer" }}
          >
            {/* Conditionally display selected preview image, stored profile image, or the user's initial */}
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className={styles.avatarImage}
              />
            ) : profile.profile_image ? (
              <img
                src={profile.profile_image}
                alt="Profile"
                className={styles.avatarImage}
              />
            ) : (
              profile.name.charAt(0).toUpperCase()
            )}
            {/* Hidden file input element accessed via ref */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              style={{ display: "none" }}
            />
          </div>
          {selectedImage && (
            <div className={styles.imageActions}>
              <button className={styles.uploadBtn} onClick={uploadImage}>
                Upload Image
              </button>

              <button className={styles.cancelBtn} onClick={cancelImage}>
                Cancel
              </button>
            </div>
          )}
          <h2>{profile.name}</h2>
          <p className={styles.emailText}>{profile.email}</p>
          <span className={styles.roleBadge}>
            {user?.role === "admin" ? "🛡️ Administrator" : "🏆 Player"}
          </span>
        </div>

        {/* Tab Controls */}
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tabBtn} ${activeTab === "overview" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "edit" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("edit")}
          >
            Edit Profile
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "wallet" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("wallet")}
          >
            Wallet & Deposit
          </button>
        </div>

        {/* Tab Contents */}
        <div className={styles.tabContent}>
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className={styles.overviewSection}>
              <div className={styles.profileStatsGrid}>
                <div className={styles.profileStatCard}>
                  <div className={styles.statIcon}>🏆</div>
                  <h3>Fantasy Points</h3>
                  <p>
                    {parseFloat(profile.fantasy_points || 0).toLocaleString()}
                  </p>
                  <span className={styles.statDesc}>
                    Lifetime earned points
                  </span>
                </div>

                <div className={styles.profileStatCard}>
                  <div className={styles.statIcon}>💳</div>
                  <h3>Wallet Balance</h3>
                  <p>
                    ₹{parseFloat(profile.wallet_balance || 0).toLocaleString()}
                  </p>
                  <span className={styles.statDesc}>
                    Available for fantasy contests
                  </span>
                </div>
              </div>

              <div className={styles.accountInfoCard}>
                <h3>Account Information</h3>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Member Since</span>
                  <span className={styles.infoVal}>
                    {profile.created_at
                      ? new Date(profile.created_at).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long", day: "numeric" },
                        )
                      : "July 2026"}
                  </span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Account Status</span>
                  <span className={`${styles.infoVal} ${styles.activeStatus}`}>
                    Active
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* EDIT PROFILE TAB */}
          {activeTab === "edit" && (
            <form onSubmit={handleUpdateProfile} className={styles.profileForm}>
              <div className={styles.formGroup}>
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Enter your name"
                  maxLength={50}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={profile.email}
                  disabled
                  title="Email address cannot be changed"
                  className={styles.disabledInput}
                />
                <span className={styles.helpText}>
                  Registered email cannot be changed.
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.saveBtn}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </form>
          )}

          {/* WALLET & DEPOSIT TAB */}
          {activeTab === "wallet" && (
            <form onSubmit={handleDeposit} className={styles.profileForm}>
              <div className={styles.walletOverview}>
                <span>Current Balance</span>
                <h2>
                  ₹{parseFloat(profile.wallet_balance || 0).toLocaleString()}
                </h2>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="depositAmount">Deposit Amount (₹)</label>
                <input
                  type="number"
                  id="depositAmount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="Enter amount (e.g. 500)"
                  min="1"
                />
              </div>

              <div className={styles.quickAmounts}>
                <button type="button" onClick={() => handleQuickAmount(100)}>
                  + ₹100
                </button>
                <button type="button" onClick={() => handleQuickAmount(500)}>
                  + ₹500
                </button>
                <button type="button" onClick={() => handleQuickAmount(1000)}>
                  + ₹1,000
                </button>
                <button type="button" onClick={() => handleQuickAmount(2000)}>
                  + ₹2,000
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.depositBtn}
              >
                {isSubmitting ? "Processing Deposit..." : "Deposit Funds"}
              </button>
            </form>
          )}
        </div>
      </div>
      {showCropper && (
        <div className={styles.cropperOverlay}>
          <div className={styles.cropperContainer}>
            {/* Cropper component configuration for editing the profile picture layout */}
            <Cropper
              image={previewImage}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(croppedArea, croppedAreaPixels) => {
                setCroppedAreaPixels(croppedAreaPixels);
              }}
            />

            <div className={styles.cropperControls}>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
              />

              <button onClick={() => setShowCropper(false)}>Cancel</button>

              <button onClick={handleCropSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
