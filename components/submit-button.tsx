"use client";
import { useFormStatus } from "react-dom"
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {cn} from "@/lib/utils";

interface ButtonProps {
    text: string,
    className?: string
    variant?: "secondary" | "destructive" | "outline" | "ghost"
}
export function SubmitButton({text, className, variant}:ButtonProps){
    const {pending} = useFormStatus();
    return(
        <>
            {
                pending ?
                    (
                    <Button variant={variant} disabled className={cn(className as string, "")}>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                            Attendi
                    </Button>
                    ) : (
                        <Button variant={variant} type="submit" className={cn(className as string, "")}>
                            {text}
                        </Button>
                    )
            }
        </>
    )
}

