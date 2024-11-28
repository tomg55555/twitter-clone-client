/* eslint-disable */
// @ts-nocheck
"use client";
import {unfollowUser} from "@/app/actions";
import {SubmitButton} from "@/components/submit-button";
import { useRouter } from "next/navigation";
import {cn} from "@/lib/utils";

interface UnfollowProps {
    userId: number,
    className? : string
}
export function UnfollowButton({userId, className}:UnfollowProps){
    const router = useRouter();

    return (
        <>
            {/* eslint-disable-next-line */}
            <form action={/*@ts-ignore*/unfollowUser.bind(null, userId) as string} onSubmit={()=>{
                setTimeout(() => {
                    router.push("/");
                }, 500);
            }}>
                <SubmitButton text={"unfollow"} variant={"outline"} className={cn("px-6 py-1.5 text-sm h-min flex items-center", className as string)}/>
            </form>
        </>
    )
}
