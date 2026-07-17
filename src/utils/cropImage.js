// Uses HTML5 Canvas to crop the image using coordinates and return it as a jpeg Blob
export default async function getCroppedImg(imageSrc, pixelCrop) {
    const image = new Image();

    image.src = imageSrc;

    // Wait for the source image to load before drawing
    await new Promise((resolve) => {
        image.onload = resolve;
    });

    // Create an off-screen HTML5 Canvas element to perform the cropping operation
    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to match the cropped area size
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // Draw the cropped portion of the source image onto the canvas
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    // Export the cropped canvas content as a JPEG image Blob
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob);
        }, "image/jpeg");
    });
}