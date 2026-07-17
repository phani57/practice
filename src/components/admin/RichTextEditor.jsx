import React, { useEffect, useRef } from "react";
import Quill from "quill";
// Import Quill's snow theme styles
import "quill/dist/quill.snow.css";

// Register custom SVG icons for undo and redo to match the native Quill look
const Icons = Quill.import("ui/icons");
if (Icons) {
    // Left-curving arrow for Undo
    Icons["undo"] = `
        <svg viewBox="0 0 18 18" style="width: 16px; height: 16px;">
            <path class="ql-stroke" d="M12.5,9.5 C12.5,12.5 10.5,14.5 7.5,14.5 C4.5,14.5 2.5,12.5 2.5,9.5 C2.5,6.5 4.5,4.5 7.5,4.5 L12.5,4.5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
            <path class="ql-stroke ql-fill" d="M9.5,1.5 L12.5,4.5 L9.5,7.5 L9.5,1.5" fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
        </svg>
    `;
    // Right-curving arrow for Redo
    Icons["redo"] = `
        <svg viewBox="0 0 18 18" style="width: 16px; height: 16px;">
            <path class="ql-stroke" d="M5.5,9.5 C5.5,12.5 7.5,14.5 10.5,14.5 C13.5,14.5 15.5,12.5 15.5,9.5 C15.5,6.5 13.5,4.5 10.5,4.5 L5.5,4.5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
            <path class="ql-stroke ql-fill" d="M8.5,1.5 L5.5,4.5 L8.5,7.5 L8.5,1.5" fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
        </svg>
    `;
}

/**
 * RichTextEditor Component
 * Wraps vanilla Quill in a React 19 compatible lifecycle to avoid peer-dependency issues.
 * 
 * Props:
 * - value: HTML string representing the current state content.
 * - onChange: Callback function triggered when editor content changes.
 * - placeholder: Placeholder text when editor is empty.
 */
function RichTextEditor({ value, onChange, placeholder = "Write something..." }) {
    const containerRef = useRef(null);
    const quillRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Clear any leftover elements just in case
        containerRef.current.innerHTML = "";

        // Create a new child div for Quill to attach itself to
        const editorElement = document.createElement("div");
        editorElement.className = "quill-editor-container";
        containerRef.current.appendChild(editorElement);

        // Create the Quill editor instance on the dynamically created element
        const quillInstance = new Quill(editorElement, {
            theme: "snow",
            placeholder: placeholder,
            modules: {
                // Configure toolbar buttons and custom undo/redo handlers
                toolbar: {
                    container: [
                        // Group 1: History
                        ["undo", "redo"],
                        // Group 2: Inline Styles
                        ["bold", "italic", "underline"],
                        // Group 3: Semantic Headings
                        [{ header: [1, 2, 3, false] }],
                        // Group 4: Lists
                        [{ list: "ordered" }, { list: "bullet" }],
                        // Group 5: Blocks and Links
                        ["blockquote", "link"],
                        // Group 6: Clear styling
                        ["clean"]
                    ],
                    handlers: {
                        // Bind custom toolbar actions to the History module
                        undo: function () {
                            this.quill.history.undo();
                        },
                        redo: function () {
                            this.quill.history.redo();
                        }
                    }
                }
            }
        });

        quillRef.current = quillInstance;

        // Set the initial value if provided
        if (value) {
            quillInstance.root.innerHTML = value;
        }

        // Listen for user changes inside the editor
        quillInstance.on("text-change", () => {
            const htmlContent = quillInstance.root.innerHTML;
            
            // Avoid triggering update if it's just empty/placeholder HTML
            const isEmptyHTML = htmlContent === "<p><br></p>";
            const cleanContent = isEmptyHTML ? "" : htmlContent;

            if (onChange) {
                onChange(cleanContent);
            }
        });

        // Clean up: completely wipe all child nodes from the container on unmount.
        // This removes the editor DOM element, the Quill toolbar, and listeners.
        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = "";
            }
            quillRef.current = null;
        };
    }, []); // Empty dependency array ensures initialization runs only once

    // Sync content changes from external parent state to editor
    useEffect(() => {
        if (!quillRef.current) return;

        // To avoid infinite loops, only update if the content actually differs
        const currentHTML = quillRef.current.root.innerHTML;
        const normalizedValue = value || "";

        // Standardize empty Quill state comparison
        const isCurrentEmpty = currentHTML === "<p><br></p>" || currentHTML === "";
        const isNewEmpty = normalizedValue === "";

        if (normalizedValue !== currentHTML && !(isCurrentEmpty && isNewEmpty)) {
            quillRef.current.root.innerHTML = normalizedValue;
        }
    }, [value]);

    return (
        <div ref={containerRef} className="modern-rich-editor-wrapper">
            {/* Child editor div is created dynamically to guarantee no double-initialization */}
        </div>
    );
}

export default RichTextEditor;
