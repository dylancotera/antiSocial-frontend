import type { User } from "./users";

export type Comment = {
    id: number;
    content: string;
    visible: boolean;
    userId: number;
    postId: number;
    createdAt: string;
    User: User;
}

export type CrearCommentData = {
    content: string;
    userId: number;
    postId: number;
}