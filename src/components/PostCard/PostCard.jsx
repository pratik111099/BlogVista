import { Link } from "react-router-dom";
import service from "../../appwrite/services";
import { useEffect, useState } from "react";
import { PiShareFat } from "react-icons/pi";
import { TfiComment } from "react-icons/tfi";
import { useSelector } from "react-redux";
import Likes from "../Likes/Likes";

const PostCard = ({ post }) => {
    const [postData, setPostData] = useState(post);
    const { $id, title, image, userName, likes } = postData;
    const { userData } = useSelector((store) => store.auth);
    const [currentUserLikes, setCurrentUserLikes] = useState(
        likes.includes(userData.name)
    );

    useEffect(() => {
        service.getPost($id).then((res) => {
            console.log("res", res);
            setPostData(res);
        });
    }, [currentUserLikes]);

    return (
        <div>
            <div className="w-4/5 mx-auto">
                <Link to={`/post/${$id}`}>
                    <h2 className="text-2xl font-bold mb-3">@{userName}</h2>
                    <div className="w-full justify-center">
                        <img
                            src={service.getFilePreview(image)}
                            alt={title}
                            className=" w-full rounded-xl aspect-video object-contain"
                        />
                    </div>
                </Link>
                <p>{title}</p>
                <p className="flex gap-3 py-2 z-10 ">
                    <Likes
                        post={postData}
                        userData={userData}
                        currentUserLikes={currentUserLikes}
                        setCurrentUserLikes={setCurrentUserLikes}
                    />
                    {/* <BsHeart onClick={handleLikes} /> */}
                    {/* <BsHeartFill color="#F44336" /> */}
                    {/* <FaRegComment /> */}
                    <TfiComment
                        style={{ fontSize: "16px" }}
                        className="cursor-pointer"
                    />
                    <PiShareFat
                        style={{
                            fontSize: "19px",
                            position: "relative",
                            top: "-2px",
                        }}
                        className="cursor-pointer"
                    />
                </p>
                <p>{likes?.length} likes</p>
            </div>
        </div>
    );
};

export default PostCard;
