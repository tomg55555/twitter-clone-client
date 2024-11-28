import {LoaderCircle} from "lucide-react";

export default function Loading() {
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <LoaderCircle className="animate-spin size 16"/>
        </div>
    )
}