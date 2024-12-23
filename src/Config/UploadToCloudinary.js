export const uploadToCloudinary = async (image) => {
    if (!image) {
        throw new Error("No image provided for upload");
    }

    const data = new FormData();
    data.append("file", image); 
    data.append("upload_preset", "Instagram"); 

    // Debugging FormData
    for (let [key, value] of data.entries()) {
        console.log(`${key}: ${value}`);
    }

    const res = await fetch("https://api.cloudinary.com/v1_1/dlghlec5s/image/upload", {
        method: "POST",
        body: data,
    });

    if (!res.ok) {
        const errorData = await res.json(); // Parse error details from the response
        console.error("Error details:", errorData);
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    const fileData = await res.json();
    console.log("fileData", fileData);
    return fileData.secure_url;
};
