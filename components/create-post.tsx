"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActionState, useEffect, useRef, useState } from "react";
import { SubmitButton } from "@/components/submit-button";
import { createMessage } from "@/app/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { messageSchema } from "@/lib/zodSchemas";
import { useRouter } from "next/navigation";
import CircularProgress from "@/components/ui/circular-progress";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {MessageSquareMore} from "lucide-react";

interface PageProps {
    activeUser?: string
}

export function CreatePost({ activeUser } : PageProps ){

    const router = useRouter()

    const [lastResult, action] = useActionState(createMessage, null);
    const [form, fields] = useForm({
        //@ts-expect-error see later
        lastResult,
        onValidate({formData}){
            return parseWithZod(formData, {schema: messageSchema})
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

    const maxLength = 100;

    const ref = useRef(null);
    const [text, setText] = useState('')

    useEffect(() => {
        const growers = document.querySelectorAll(".grow-wrap");

        growers.forEach((grower) => {
            const textarea = grower.querySelector("textarea");
            textarea.addEventListener("input", () => {
                grower.dataset.replicatedValue = textarea.value;
            });
        });
    }, []);


    return(
        <form key={form.key} id={form.id} name={form.name} onSubmit={form.onSubmit} action={action as string}>
            <Card ref={ref} className="shadow-inner max-w-xl mx-auto">
                <Accordion type="single" collapsible >
                    <AccordionItem value="message-1">
                        <AccordionTrigger className="p-0 m-0 hover:no-underline [&[data-state=open]>svg]:opacity-0">
                            <CardHeader className="w-full px-4 sm:px-6 flex-shrink-0">
                                <CardTitle className="flex justify-between w-full items-end gap-2">
                                    <div className="text-left text-xl leading-none">
                                        Benvenuto <span className="text-primary">{activeUser }</span>,<br/>Cosa vorresti condividere?
                                    </div>
                                    <MessageSquareMore className="text-blue-600"/>
                                </CardTitle>
                            </CardHeader>
                        </AccordionTrigger>
                        <AccordionContent className="p-0 m-0 w-full">
                            <CardContent className="w-full px-4 sm:px-6">
                                <div className="grow-wrap">
                                    <textarea
                                        key={fields.message.key}
                                        name={fields.message.name}
                                        placeholder="Scrivi qui"
                                        wrap="soft"
                                        maxLength={maxLength}
                                        className="h-full w-full p-0 resize-none focus:outline-0 text-base"
                                        onChange={(e) => setText(e.target.value)}
                                        value={text}
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <CircularProgress percentage={text.length*100/maxLength} />
                                    <SubmitButton className="w-min" text="Posta"/>
                                </div>
                            </CardContent>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>


            </Card>
        </form>

    )
}