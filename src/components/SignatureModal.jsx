import styles from "../styles/components/SignatureModal.module.css";
import { useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import api from "../api/axios";

export default function SignatureModal({ onClose }) {
  const canvasRef = useRef(null);
  const clearSignature = () => {
    canvasRef.current.clearCanvas();
  };
  const saveSignature = async () => {
    const paths = await canvasRef.current.exportPaths();

    if (paths.length === 0) {
      alert("Please sign first.");
      return;
    }

    const dataUrl = await canvasRef.current.exportImage("png");

    const blob = await fetch(dataUrl).then((res) => res.blob());

    const formData = new FormData();

    formData.append("signature", blob, "signature.png");
    await api.post("/signature", formData);
    onClose();
  };

  const saveBase64Signature = async () => {
    const paths = await canvasRef.current.exportPaths();

    if (paths.length === 0) {
      alert("Please sign first.");
      return;
    }

    const dataUrl = await canvasRef.current.exportImage("png");

    await api.post("/signature-base64", {
      signature: dataUrl,
    });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <h2>Sign Here</h2>

        <ReactSketchCanvas
          ref={canvasRef}
          width="600px"
          height="250px"
          strokeWidth={4}
          strokeColor="black"
          className={styles.signatureCanvas}
        />

        <div className={styles.buttons}>
          <button onClick={clearSignature}>Clear</button>
          <button onClick={saveSignature}>Save</button>
          <button onClick={saveBase64Signature}>Save (Base64)</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
