export interface PostCardProps {
    postId: number
}
export interface Post {
    message: string,
    id: number,
    date:Date,
    UserId: number
}
export interface User {
    id: number,
    username: string,
    email: string,
}

export interface Comment {
    Id: number,
    commentorId: number,
    postId: number,
    Text: string,
    Date: Date,
    username: string
}

export interface ImageUrlInfo {
    hasUrl: boolean;
    url: string | null;
    cleanString: string;
}