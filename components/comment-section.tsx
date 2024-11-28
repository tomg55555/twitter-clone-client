import { getPost } from "@/app/actions";
import { redirect} from "next/navigation";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import type { Comment } from "@/lib/types"

import { MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {extractImageUrl, timeSince} from "@/lib/utils";
import { Comment as SendComment} from "@/components/comment"
import { DeleteComment } from "@/components/delete-comment";


interface CommentSection {
    postId: number,
    activeUser?: string
}
export async function CommentSection({ postId, activeUser }: CommentSection){

    const getPostwithId = getPost.bind(null, postId)

    const res = await getPostwithId();

    if(!res.success) {
        console.log("failed to fetch comments");
        return redirect("/login?session=expired")
    }
    const postMessages: Comment[]  = await res.data
    const hasComments = await res.comments


    return(
        <div className="pt-2">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="">
                    <AccordionTrigger className="pt-0">
                        <div className="text-sm text-primary px-6 flex items-center gap-1">
                            <MessageCircle size={20}/>
                            {
                                hasComments ?
                                    <span>{postMessages.length}</span>
                                    :
                                    <span>0</span>
                            }
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className=" grid">
                        <div className="w-full border-b pt-6"/>
                        <SendComment postId={postId}/>
                        {
                            !hasComments &&
                            <>
                                <div className="border-b w-full"/>
                                <div className="p-6 pb-0 flex gap-4">
                                    <p className="text-muted-foreground text-sm">
                                        Ancora nessun commento qui...
                                    </p>
                                </div>
                            </>
                        }
                        {
                            hasComments && postMessages.map((message,_)=>(
                                <div key={message.Id} className="">
                                    <div className="border-b w-full"/>
                                    <div className="p-6 grid gap-2 pb-0">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <Avatar>
                                                    <AvatarImage src={`https://avatar.vercel.sh/${message?.commentorId}.svg?text=${message?.username.slice(0,2).toUpperCase()}`}/>
                                                    <AvatarFallback>
                                                        {message?.username.slice(0, 2)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <h3 className="font-medium text-base">{message.username}</h3>
                                            </div>
                                            <span className="text-xs text-muted-foreground">{timeSince(message.Date)}</span>
                                        </div>
                                        {
                                            extractImageUrl(message.Text).hasUrl ?
                                                <div className="relative">
                                                    <p className="text-muted-foreground text-base">{extractImageUrl(message.Text).cleanString}</p>
                                                    <img src={extractImageUrl(message.Text).url as string}
                                                         alt="post image"
                                                         className="mt-4 rounded-lg object-cover"
                                                    />
                                                </div>
                                                :
                                                <p className="text-muted-foreground text-base">
                                                    {message.Text}
                                                </p>
                                        }
                                        {
                                            message.username === activeUser ? <DeleteComment commentId={message.Id} postId={message.postId}/> : <></>
                                        }
                                        {
                                            postMessages.length-_>1 ? <div className="pb-2"/>: <></>
                                        }
                                    </div>
                                </div>

                            ))
                        }
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}