export const uploadToCloudinary = async (image) => {
    if (image) {
        const data = new FormData();
        data.append("file", image); // The file to upload
        data.append("upload_preset", "ml_default"); // Preset configured in Cloudinary

        const res = await fetch("https://api.cloudinary.com/v1_1/dlghlec5s/image/upload", {
            method: "POST",
            body: data,
        });

        if (!res.ok) {
            throw new Error("Failed to upload image to Cloudinary");
        }

        const fileData = await res.json();
        console.log("fileData", fileData);
        return fileData.secure_url; // Use secure_url for HTTPS links
    }

    throw new Error("No image provided for upload");
};
