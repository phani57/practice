import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/admin/AdminAnnouncement.module.css";
import RichTextEditor from "../../components/admin/RichTextEditor";
import announcementService from "../../services/admin/announcementService";

/**
 * AdminAnnouncement Page Component
 * Allows administrators to compose rich text announcements, manage state,
 * and dispatch the generated HTML payload to the announcementService.
 */
function AdminAnnouncement() {
    const navigate = useNavigate();

    // Local state for the form inputs
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // Notification and status states
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    /**
     * Form submission handler.
     * Packages the title and content state into a payload and sends it
     * to the announcementService.
     */
    async function handleSave(e) {
        e.preventDefault();

        // Validate that title is not empty
        if (!title.trim()) {
            setErrorMessage("Please enter an announcement title.");
            setTimeout(() => setErrorMessage(""), 3000);
            return;
        }

        setIsSaving(true);
        setErrorMessage("");

        try {
            // Build the payload
            const payload = {
                title: title.trim(),
                content: content
            };

            // Call the announcement service (which logs the payload to the console)
            const response = await announcementService.saveAnnouncement(payload);

            if (response.success) {
                setSuccessMessage("Announcement saved successfully! (Payload logged to console)");
                
                // Clear the form fields upon successful completion
                setTitle("");
                setContent("");

                // Dismiss success banner after 4 seconds
                setTimeout(() => {
                    setSuccessMessage("");
                }, 4000);
            }
        } catch (error) {
            console.error("Error saving announcement:", error);
            setErrorMessage("Failed to save announcement. Please try again.");
            setTimeout(() => setErrorMessage(""), 3000);
        } finally {
            setIsSaving(false);
        }
    }

    /**
     * Cancel handler.
     * Prompts the user if there are unsaved changes before navigating back.
     */
    function handleCancel() {
        if (title || content) {
            if (window.confirm("Are you sure you want to discard your changes?")) {
                navigate("/admin/dashboard");
            }
        } else {
            navigate("/admin/dashboard");
        }
    }

    return (
        <div className={styles.container}>
            {/* Page Title Header */}
            <div className={styles.pageHeader}>
                <div>
                    <h5 className={styles.subtitle}>Management</h5>
                    <h1 className={styles.title}>Announcements</h1>
                </div>
            </div>

            {/* Notification Banners */}
            {successMessage && (
                <div className={styles.successMessage}>
                    <span>✅</span>
                    <span>{successMessage}</span>
                </div>
            )}

            {errorMessage && (
                <div className={styles.errorMessage}>
                    <span>⚠️</span>
                    <span>{errorMessage}</span>
                </div>
            )}

            {/* Editor Input Area */}
            <div className={styles.card}>
                <form onSubmit={handleSave}>
                    {/* Announcement Title Field */}
                    <div className={styles.formGroup}>
                        <label htmlFor="announcement-title">Announcement Title</label>
                        <input
                            id="announcement-title"
                            type="text"
                            placeholder="Enter a descriptive title for this announcement..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={styles.input}
                            required
                            disabled={isSaving}
                        />
                    </div>

                    {/* Rich Text Editor Field */}
                    <div className={styles.formGroup}>
                        <label>Announcement Details</label>
                        <div className={styles.editorWrapper}>
                            <RichTextEditor
                                value={content}
                                onChange={setContent}
                                placeholder="Type or paste the announcement details here. Use the formatting toolbar to design your message..."
                                disabled={isSaving}
                            />
                        </div>
                    </div>

                    {/* Submit and Cancel Buttons */}
                    <div className={styles.actionsBar}>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className={styles.cancelBtn}
                            disabled={isSaving}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={styles.saveBtn}
                            disabled={isSaving}
                        >
                            {isSaving ? "Saving..." : "Save Announcement"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminAnnouncement;
