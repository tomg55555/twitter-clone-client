"use client";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useActionState, useState} from "react"
import { login } from "@/app/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import {loginSchema} from "@/lib/zodSchemas";
import { SubmitButton } from "@/components/submit-button";
import {useSearchParams} from "next/navigation";
import {useToast} from "@/hooks/use-toast";
import {Bird} from "lucide-react";

export default function LoginPage(){

    const [fired, setFired] = useState(false)

    const { toast } = useToast()

    const params = useSearchParams()

    const session = params.get("session");
    if(session === "expired" && !fired){
        toast({
            title: "Sessione scaduta.",
            description: "Eseguire nuovamente l'accesso",
            className: "bg-red-50"
        });

        setFired(true);
    }

    const [lastResult, action] = useActionState(login, null);
    const [form, fields] = useForm({
        //@ts-expect-error see later
        lastResult,
        onValidate({formData}){
            return parseWithZod(formData, {schema: loginSchema})
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",

    });

    return(
        <main className="h-screen md:-mt-10 w-full flex items-center justify-center p-4">
            <Card className="max-w-lg w-full rounded-xl bg-blue-50">
                <CardHeader>
                    <div className="mb-5">
                        <Bird size={32}/>
                    </div>
                    <CardTitle>
                        Accedi a Twotter
                    </CardTitle>
                    <CardDescription>
                        Fai il log in se possiedi un account o <Link className="font-medium underline text-blue-600" href={"/signup"}>registrati qui</Link>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.onSubmit} id={form.id} key={form.key} name={form.name} action={/*@ts-expect-error see later*/action} className="grid gap-2">
                        {
                            lastResult?.success === false &&
                            <p className="text-red-500 text-sm text-right">{lastResult.data.errors[0].msg}</p>
                        }
                        {
                            lastResult?.success === true &&
                            <p className="text-red-500 text-sm text-right text-wrap">{lastResult.data.token}</p>
                        }
                        <div className="flex flex-col">
                            <div className="flex flex-col sm:flex-row sm:gap-6 sm:items-center">
                                <Label className="text-base ms-2">Username</Label>
                                <Input
                                    key={fields.username.key}
                                    name={fields.username.name}
                                    defaultValue={fields.username.initialValue as string}
                                    type="text"
                                    placeholder="Il tuo username"
                                    className="w-full"
                                />
                            </div>
                            <p className="text-right text-sm text-red-500 mt-0.5">{fields.username.errors}</p>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex sm:gap-6 sm:items-center flex-col sm:flex-row">
                                <Label className="text-base ms-2">Password</Label>
                                <Input
                                    key={fields.password.key}
                                    name={fields.password.name}
                                    defaultValue={fields.password.initialValue as string}
                                    type="password"
                                    placeholder="Password"
                                    className="w-full"
                                />
                            </div>
                            <p className="text-right text-sm text-red-500 mt-0.5">{fields.password.errors}</p>
                        </div>
                        <SubmitButton className="w-full mt-5" text="Login"/>
                        <p className="mt-10 text-sm text-muted-foreground">
                            Non hai un account? <Link className="font-medium underline text-blue-600" href={"/signup"}>Registrati qui</Link>
                        </p>

                    </form>
                </CardContent>
            </Card>

        </main>
    )
}