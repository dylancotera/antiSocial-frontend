import type { User } from "./users";

export type Comment = {
    id: number;
    content: string;
    createdAt: string;
    PostId: number;
    UserId: number;
    User: User;
}

export type CrearCommentData = {
    content: string;
    userId: number;
    postId: number;
}