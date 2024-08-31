export const BACKEND_URL = "http://localhost:8080";

export const uploadImage = async (imageFile: File): Promise<{ success: boolean; image: string }> => {
    try {

        const formData = new FormData();
        formData.append('image', imageFile); 

        const response = await fetch(`${BACKEND_URL}/api/photos/upload/image`, {
            method: 'POST',
            body: formData, 
        });
        if (!response.ok) {
            const errorText = await response.text(); 
            console.error('Error response body:', errorText);
            throw new Error('Failed to upload image: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Response data:', data);
        return data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};
