"use client";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import { PartyPopper } from "lucide-react";
import Confetti from 'react-confetti'
import {useLayoutEffect, useRef, useState} from "react";




export default function SuccessPage(){

    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const ref = useRef(null)

    useLayoutEffect(() => {
        setHeight(ref.current.clientHeight);
        setWidth(ref.current.clientWidth)
    }, [])


    return(
        <main ref={ref} className="h-screen w-full flex items-center justify-center p-4">
            <Confetti width={width} height={height} recycle={false} />
            <Card className="max-w-lg w-full rounded-xl z-50 bg-blue-50">
                <CardHeader>
                    <div className="bg-green-50 flex items-center justify-center p-6 aspect-square border rounded-full mx-auto font-black text-center mb-5">
                        <PartyPopper className="size-14"/>
                    </div>
                    <CardTitle>
                        Utente creato con successo!
                    </CardTitle>
                    <CardDescription>
                        Benvenuto su twotter.com, <Link href={"/login"} className="text-primary underline">accedi</Link> al tuo account per iniziare a navigare
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full mt-5"><Link href={"/login"}>Vai al login</Link></Button>
                </CardContent>
            </Card>

        </main>
    )
}