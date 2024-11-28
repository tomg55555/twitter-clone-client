"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";



export default function ErrorPage(){


    return(
        <main className="h-screen w-full flex items-center justify-center p-4">
            <Card className="max-w-lg w-full rounded-xl z-50">
                <CardHeader>
                    <div className="bg-red-50 flex items-center justify-center p-6 aspect-square border rounded-full mx-auto font-black text-center mb-5">
                        <XIcon className="size-14 text-red-700"/>
                    </div>
                    <CardTitle>
                        Ops... C&apos;è stato un errore
                    </CardTitle>
                    <CardDescription>
                        Si è verificato un errore nella gestione del login-logout, è necessario accedere nuovamente.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full mt-5"><Link href={"/login"}>Vai al login</Link></Button>
                </CardContent>
            </Card>

        </main>
    )
}