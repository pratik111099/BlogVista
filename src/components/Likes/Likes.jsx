import React from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import service from "../../appwrite/services";

const Likes = ({ post, userData, currentUserLikes, setCurrentUserLikes }) => {
    const handleLikes = async () => {
        if (userData.name) {
            if (post.likes.includes(userData.name)) {
                const index = post.likes.indexOf(userData.name);
                const newLikes = post.likes;
                newLikes.splice(index, 1);
                post = { ...post, likes: newLikes };
                await service.updatePost(post.$id, { ...post });
                setCurrentUserLikes(false);
            } else {
                post = { ...post, likes: [...post.likes, userData.name] };
                await service.updatePost(post.$id, { ...post });
                setCurrentUserLikes(true);
            }
        }
    };

    return (
        <span className="cursor-pointer" onClick={handleLikes}>
            {currentUserLikes ? <BsHeartFill color="#F44336" /> : <BsHeart />}
        </span>
    );
};

export default Likes;
