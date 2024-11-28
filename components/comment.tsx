"use client";

import {useRouter} from "next/navigation";
import {useActionState, useEffect, useRef, useState} from "react";
import { SendComment } from "@/app/actions";
import {useForm} from "@conform-to/react";
import {parseWithZod} from "@conform-to/zod";
import { commentSchema } from "@/lib/zodSchemas";
import {SubmitButton} from "@/components/submit-button";
import CircularProgress from "@/components/ui/circular-progress";


interface CommentPage {
    postId: number
}
export function Comment( { postId } : CommentPage ){

    const router = useRouter()

    const withIdSendComment = SendComment.bind(null, postId)

    const [lastResult, action] = useActionState(withIdSendComment, null);
    const [form, fields] = useForm({
        //@ts-expect-error: see later
        lastResult,
        onValidate({formData}){
            return parseWithZod(formData, {schema: commentSchema})
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
        onSubmit: ()=> {
            form.reset();
            setText("");
            setTimeout(() => {
                router.push("/");
            }, 500);
        }
    });

    const maxLength = 256;

    const ref = useRef(null);
    const [text, setText] = useState('')

    useEffect(() => {
        const growers = document.querySelectorAll(".grow-wrap");

        growers.forEach((grower) => {
            const textarea = grower.querySelector("textarea");
            textarea?.addEventListener("input", () => {
                //@ts-expect-error:later
                grower.dataset.replicatedValue = textarea.value;
            });
        });
    }, []);


    return(
       <>
           {/* eslint-disable-next-line */}
           <form
               key={form.key} id={form.id} name={form.name} onSubmit={form.onSubmit} action={/*@ts-expect-error:later*/action}
               ref={ref}
               className="grid gap-2 p-6"
           >

            <textarea
                autoFocus
                key={fields.message.key}
                name={fields.message.name}
                placeholder="Scrivi il tuo commento"
                wrap="soft"
                maxLength={256}
                className="w-full p-0 resize-none focus:outline-0 border-none rounded-none ring-none text-base focus-visible:ring-0"
                onChange={(e) => setText(e.target.value)}
                value={text}
            />
               <div className="flex items-center justify-between">
                   <div className="mt-2 text-muted-foreground text-sm">
                       <CircularProgress percentage={text.length*100/maxLength} />
                   </div>
                   <SubmitButton text="Commenta"/>
               </div>

           </form>
       </>
    )
}