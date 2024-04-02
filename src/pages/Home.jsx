import React from "react";
import service from "../appwrite/services";
import { Container, PostCard } from "../components";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        service.allPosts([]).then((res) => {
            if (res) setPosts(res.documents);
        });
    }, []);

    if (posts.length === 0)
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to Read Posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-col w-4/4 md:w-3/4 mx-auto">
                    {posts?.map((post) => (
                        <div
                            key={post.$id}
                            className="p-3 m-5 w-full border-b-2"
                        >
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Home;
