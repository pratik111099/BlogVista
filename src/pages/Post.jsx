import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/services";
import { useSelector } from "react-redux";
import { Button, Container, Input } from "../components";
import parse from "html-react-parser";

const Post = () => {
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState("");
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((store) => store.auth.userData);

    const isAuther = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((res) => {
                if (res) setPost(res);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate, comment]);

    const deletePost = () => {
        service.deletePost(post.$id).then((res) => {
            navigate("/");
        });
    };

    const addComment = async (e) => {
        e.preventDefault();
        if (comment) {
            const newComment = [
                ...post.comments,
                comment,
                // {
                //     comment: comment,
                //     reply: "",
                //     like: "",
                // },
            ];
            // console.log("🚀 ~ file: Post.jsx:43 ~ addComment ~ newComment:", {
            //     ...post,
            //     comments: newComment,
            // });
            console.log("🚀 ~ addComment ~ post:", post, {
                ...post,
                comments: "[...post.comments, newComment]",
            });
            // post = { ...post, comments: "[...post.comments, newComment]" };
            console.log("🚀 ~ addComment ~ post:", post);
            const resp = await service.updatePost(post.$id, {
                ...post,
                comments: [...newComment],
                // comments: [...post.comments, newComment],
            });
            console.log("🚀 ~ file: Post.jsx:55 ~ addComment ~ resp:", resp);

            setComment("");
        }
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="flex row border p-2 rounded-lg bg-gray-200">
                    <div className="w-3/5">
                        <div className="w-full flex justify-center mb-4 relative rounded-xl">
                            <img
                                src={service.getFilePreview(post.image)}
                                alt={post.title}
                                className=""
                            />
                            {isAuther && (
                                <div className="absolute right-6 top-6">
                                    <Link to={`/edit-post/${post?.$id}`}>
                                        <Button
                                            bgColor="bg-green-500"
                                            classname="mr-3"
                                        >
                                            Edit
                                        </Button>
                                    </Link>

                                    <Button
                                        bgColor="bg-red-500"
                                        onClick={deletePost}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </div>
                        <div className="w-full mb-6">
                            <h1 className="text-2xl font-bold">
                                {post?.title}
                            </h1>
                        </div>
                        <div className="browser-css">
                            {parse(post?.content)}
                        </div>
                    </div>
                    <div className="w-2/5">
                        <div className="w-full bg-transparent">
                            <form
                                onSubmit={addComment}
                                className="w-full border-b-2 p-2"
                            >
                                <input
                                    type="text"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Enter your comments"
                                    className="w-10/12 border-none outline-none bg-transparent text-red-600"
                                />
                                <button className="w-2/12 text-blue-600">
                                    Post
                                </button>
                            </form>
                            <div>
                                <ul>
                                    {
                                        post.comments.map((comment, index) => (
                                            <li key={comment + index}>
                                                {comment}
                                            </li>
                                        ))
                                        /* console.log(post.comments) */
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
};

export default Post;
