import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

class Service {
    client = new Client();
    database;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.database = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({
        title,
        slug,
        content,
        image,
        status,
        userId,
        userName,
        comments,
        likes = 0,
    }) {
        try {
            return await this.database.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                    userId,
                    userName,
                    comments,
                    likes,
                }
            );
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error ", error);
        }
    }

    async updatePost(slug, { title, content, image, status, likes, comments }) {
        try {
            return await this.database.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    image,
                    status,
                    likes,
                    comments,
                }
            );
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error ", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error ", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.database.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error ", error);
            return false;
        }
    }

    async allPosts(quries = Query.equal("status", "active")) {
        try {
            return await this.database.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                quries
            );
        } catch (error) {
            console.log("Appwrite Service :: allPosts :: error ", error);
            return false;
        }
    }

    // Image upload
    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error ", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(conf.appWriteBucketId, fileId);
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error ", error);
        }
    }

    getFilePreview(fileId) {
        try {
            return this.storage.getFilePreview(conf.appWriteBucketId, fileId);
        } catch (error) {
            console.log("Appwrite Service :: filePreview :: error ", error);
            return false;
        }
    }
}

const service = new Service();
export default service;
