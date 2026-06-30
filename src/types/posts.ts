import type { Tag } from "./tags";
import type { User } from "./users";

export type Post = {
    id: number;
    description: string;
    userId: number;
    User: User;
    Tags: Tag[];
    createdAt: string;
}

export type CreatePostData = {
    description: string;
    userId: number;
    tagIds?: number[];
}