import React, { useState } from 'react';

const CreatePostForm: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);// checks if image is set
    const [loading, setLoading] = useState<boolean>(false);// shows if it's loading submission
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Set limits for text and image
    const MAX_TEXT_LENGTH = 500; // Set your desired limit for text (characters)
    const MAX_IMAGE_SIZE_MB = 2; // Set your desired image size limit (MB)


    // Handle text input change
    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    // Handle image file selection
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setImage(file);
    };

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        // Create a new FormData object to send the form data
        const formData = new FormData();
        formData.append('text', text); //always has ext

        // Append the image to the form data if an image is selected
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch('https://localhost:7163/Post/CreatePost', {
                method: 'POST',// http method
                body: formData, //data sent is body, object is caleld formdata
            });

            if (response.ok) {
                // If successful, show success message and reset form
                setSuccessMessage('Post created successfully!');
                setText(''); // Clear text input after successful post
                setImage(null); // Clear image selection
                window.location.reload()//refresh prage
            } else {
                // Handle non-200 responses
                const errorData = await response.json();
                setError(errorData.message || 'Failed to create post');
            }
        } catch (err) {
            // Log or display the error
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-post-form">
            <h2>Create a Post</h2>

            {/* Display success message */}
            {successMessage && <p className="success-message">{successMessage}</p>}

            {/* Display error message */}
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="text"></label>
                    <textarea
                        //type="text"
                        id="text"
                        value={text}
                        onChange={handleTextChange}
                        placeholder={`Max ${MAX_TEXT_LENGTH} characters`}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="image">Image (Optional)</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <p>Max Image Size {MAX_IMAGE_SIZE_MB} MB</p>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Creating Post...' : 'Create Post'}
                </button>
            </form>
        </div>
    );
};

export default CreatePostForm;