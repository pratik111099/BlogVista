import React from "react";
import { useForm } from "react-hook-form";
import service from "../../appwrite/services";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { Input, Select, Button, RTE } from "../index";
import { useEffect } from "react";

const PostForm = ({ post }) => {
    const navigate = useNavigate();
    const { userData } = useSelector((store) => store.auth);
    const { register, handleSubmit, watch, setValue, getValues, control } =
        useForm({
            defaultValues: {
                title: post?.title || "",
                slug: post?.$id || "",
                content: post?.content || "",
                likes: post?.likes || [],
                comments: post?.comments || [],
                status: post?.status || "active",
            },
        });

    const submit = async (data) => {
        if (post) {
            const newImage = data.image[0]
                ? await service.uploadFile(data.image[0])
                : null;

            if (newImage) {
                await service.deleteFile(post?.image);
            }

            const updatePost = await service.updatePost(post?.$id, {
                ...data,
                image: newImage.$id,
            });

            if (updatePost) navigate(`/post/${updatePost.$id}`);
        } else {
            const newImage = await service.uploadFile(data?.image[0]);

            if (newImage) {
                data.image = newImage?.$id;
                const newPost = await service.createPost({
                    ...data,
                    userId: userData?.$id,
                    userName: userData?.name,
                });

                if (newPost) navigate(`/post/${newPost.$id}`);
            }
        }
    };

    const slugTransform = useCallback((value) => {
        return value.trim().toLowerCase().replace(/\s/g, "-");
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue(
                    "slug",
                    slugTransform(value?.title, { shouldValidate: true })
                );
            }
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [watch, slugTransform, setValue]);

    return (
        <form className="flex flex-wrap" onSubmit={handleSubmit(submit)}>
            <div className="w-2/3 px-2">
                <Input
                    label="Title: "
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", {
                        required: true,
                    })}
                />
                <Input
                    label="Slug: "
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", {
                        required: true,
                    })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        });
                    }}
                />
                <RTE
                    label="Content: "
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.image)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status : "
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    classname="w-full"
                >
                    {post ? "Update" : "Create"}
                </Button>
            </div>
        </form>
    );
};

export default PostForm;
