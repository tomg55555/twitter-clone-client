"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {useActionState} from "react"
import { createUser } from "@/app/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { userSchema } from "@/lib/zodSchemas";
import { SubmitButton } from "@/components/submit-button";
import {Bird} from "lucide-react";


export default function SignUpPage(){

    const [lastResult, action] = useActionState(createUser, null);
    const [form, fields] = useForm({
        //@ts-expect-error see later
        lastResult,
        onValidate({formData}){
            return parseWithZod(formData, {schema: userSchema})
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
                        Registrati a Twotter
                    </CardTitle>
                    <CardDescription>
                        Se invece possiedi un account <Link className="font-medium underline text-blue-600" href={"/login"}> fai il log in</Link>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.onSubmit} id={form.id} key={form.key} name={form.name} action={action as undefined} className="grid gap-2">
                        {lastResult?.success === false &&
                            <p className="text-red-500 text-sm text-right">{lastResult.message}</p>
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
                            <div className="flex flex-col sm:flex-row sm:gap-6 sm:items-center">
                                <Label className="text-base ms-2">Email</Label>
                                <Input
                                    key={fields.email.key}
                                    name={fields.email.name}
                                    defaultValue={fields.email.initialValue as string}
                                    type="email"
                                    placeholder="La tua email"
                                    className=""
                                />
                            </div>
                            <p className="text-right text-sm text-red-500 mt-0.5">{fields.email.errors}</p>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-col sm:flex-row sm:gap-6 sm:items-center">
                                <Label className="text-base ms-2">Password</Label>
                                <Input
                                    key={fields.password.key}
                                    name={fields.password.name}
                                    defaultValue={fields.password.initialValue as string}
                                    type="password"
                                    placeholder="Password"
                                    className=""
                                />
                            </div>
                            <p className="text-right text-sm text-red-500 mt-0.5">{fields.password.errors}</p>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-col sm:flex-row sm:gap-6 sm:items-center">
                                <Label className="text-base ms-2 block text-nowrap">Ripeti Password</Label>
                                <Input
                                    key={fields.confirmPassword.key}
                                    name={fields.confirmPassword.name}
                                    defaultValue={fields.confirmPassword.initialValue as string}
                                    type="password"
                                    placeholder="Ripeti password"
                                    className=""
                                />
                            </div>
                            <p className="text-right text-sm text-red-500 mt-0.5">{fields.confirmPassword.errors}</p>
                        </div>
                        <SubmitButton className="w-full mt-5" text="Crea Account"/>
                        <p className="mt-10 text-sm text-muted-foreground">
                            Hai già un account? <Link className="font-medium underline text-blue-600" href={"/login"}>Fai il log in</Link>
                        </p>

                    </form>
                </CardContent>
            </Card>

        </main>
    )
}