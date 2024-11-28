import { getUsers } from "@/app/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { connection} from "next/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post, User } from "@/lib/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {extractImageUrl, timeSince} from "@/lib/utils";
import { CommentSection } from "@/components/comment-section";
import { UnfollowButton } from "@/components/unfollw-button";

export function getUserName(id:number, usersList: User[]){
    return usersList.find((user) => user.id == id)
}

interface PostCard {
    post: Post,
    activeUser?:string
}
export async function PostCard({ post, activeUser }:PostCard){
    await connection();

    const  processedPost = extractImageUrl(post.message);

    const dataUsers = await getUsers()
    const users: User[] = await dataUsers.data

    if(!dataUsers.success) {
        console.log("failed to fetch users");
        return redirect("/login?session=expired")
    }

    const user = getUserName(post.UserId, users)

    return(
        <Suspense>
            <Card className="border p-0 pb-4 drop-shadow-lg">
                <CardHeader className={"pb-3"}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className={`absolute inset-0 ${user?.username === activeUser ? "ring-2 ring-offset-2 rounded-full animate-pulse" : "ring-0"} `}/>
                                <Avatar className="relative">
                                    <AvatarImage src={`https://avatar.vercel.sh/${user?.username}.svg?text=${user?.username.slice(0,2).toUpperCase()}`}/>
                                    <AvatarFallback>
                                        {user?.username.slice(0, 2)}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <div>
                                <CardTitle className="flex">
                                    {user?.username || `no username, userId: ${post.UserId}`}
                                </CardTitle>
                                <CardDescription className="text-xs">
                                    {timeSince(post.date)}
                                </CardDescription>
                            </div>
                        </div>
                        <Popover>
                            <PopoverTrigger className="leading-none text-muted-foreground -mt-2">
                                ...
                            </PopoverTrigger>
                            <PopoverContent className="flex w-fit">
                                <UnfollowButton userId={post.UserId} className="bg-red-50 text-red-900 border-red-600 hover:bg-red-100 hover:text-red-950"/>
                            </PopoverContent>
                        </Popover>
                    </div>
                </CardHeader>
                <CardContent className="pb-0">
                    {
                        processedPost.hasUrl ?
                            <div>
                                <p>{processedPost.cleanString}</p>
                                <img src={processedPost.url as string}
                                     alt="post image"
                                     className="mt-4 rounded-lg object-cover"
                                />
                            </div>
                            :
                            <div>{post.message}</div>
                    }

                </CardContent>
                <CommentSection activeUser={activeUser} postId={post.id} />
            </Card>
        </Suspense>

    )
}