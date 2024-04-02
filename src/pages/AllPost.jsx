import React from "react";
import service from "../appwrite/services";
import { Container, PostCard } from "../components";
import { useEffect } from "react";
import { useState } from "react";

const AllPost = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        service.allPosts([]).then((res) => {
            setPosts(res.documents);
        });
    }, []);
    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts?.map((post) => (
                        <div className="p-2 w-1/4" key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default AllPost;
