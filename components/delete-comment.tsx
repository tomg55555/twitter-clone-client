"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2Icon } from "lucide-react";
import { deleteComment } from "@/app/actions";
import { useRouter } from "next/navigation";
import {useState} from "react";

interface iAppProps {
    commentId:number,
    postId: number,
}
export function DeleteComment({commentId, postId}: iAppProps){

    const [open, setOpen]= useState(false);

    const router = useRouter();
    const withParamsDeleteComment = deleteComment.bind(null, postId, commentId)
    return(
        <form id={"delete-comment"} action={withParamsDeleteComment as string} onSubmit={()=>{
            setOpen(false);
            setTimeout(() => {
                router.push("/");
            }, 500);}}>
            <AlertDialog open={open} defaultOpen={false} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <button className="mt-2 flex items-center justify-center text-red-600">
                        <Trash2Icon size={16}/>
                    </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Sei assolutamente sicuro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Questa azione non potrà essere annullata. Il messaggio sarà cancellato definitivamente dal server e non potrà essere recuperato
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annulla</AlertDialogCancel>
                        <AlertDialogAction form={"delete-comment"} type="submit" formAction={withParamsDeleteComment as string} >
                            Elimina definitivamente
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </form>
    )
}