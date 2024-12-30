import React, { useEffect, useState } from 'react';

type PostType = {
    id: number;
    image: string | null;
    text: string;
};

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true); // Start loading
            try {
                const response = await fetch('https://localhost:7163/Post/GetPost');
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data: PostType[] = await response.json(); // Array of posts
                setPosts(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {posts.map(post => (
                <div key={post.id} className="post-card">
                    <h2>Post #{post.id}</h2>
                    <img
                        src={post.image ? post.image : 'path/to/placeholder-image.jpg'}
                        alt={`Post ${post.id}`}
                    />
                    <p>{post.text}</p>
                </div>
            ))}
        </div>
    );
};

export default PostList;