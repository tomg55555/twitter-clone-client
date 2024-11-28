/* eslint-disable */
// @ts-nocheck
"use client";
import {followUser as action} from "@/app/actions";
import {SubmitButton} from "@/components/submit-button";
import { useRouter } from "next/navigation";
import {cn} from "@/lib/utils";

interface UnfollowProps {
    userId: number
    text?: string
    className?:string
}
export function FollowButton({userId, text, className}:UnfollowProps){
    const router = useRouter();

    return (
        <>
            {/* eslint-disable-next-line */}
            <form action={/*@ts-ignore*/action.bind(null, userId)} onSubmit={()=>{
                setTimeout(() => {
                    router.push("/");
                }, 500);
            }}>
                <SubmitButton text={text || "segui"} className={cn("px-6 py-1.5 text-sm h-min", className as string)}/>
            </form>
        </>
    )
}
