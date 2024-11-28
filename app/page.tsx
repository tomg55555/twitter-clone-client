import { redirect, RedirectType } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { SearchComponent } from "@/components/ui/search";
import { Bird, TrophyIcon} from "lucide-react";
import { ArrowDownIcon } from "@radix-ui/react-icons"
import { getAllPosts, getFollowedUsers, getUsers, logout } from "@/app/actions";
import { CreatePost } from "@/components/create-post";
import { SubmitButton } from "@/components/submit-button";
import { PostCard } from "@/components/post-card";
import { Suspense } from "react";
import { connection } from "next/server";
import { Button } from "@/components/ui/button";
import { Post, User } from "@/lib/types";
import Loading from "@/app/loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FollowButton } from "@/components/follow-button";

export default async function Home() {
    await connection();

    const cookieStore = await cookies();
    //@ts-expect-error: see later
    const user = cookieStore.get({name: "token"});
    const currentUser:{name:string, value:string} | undefined = cookieStore.get("user" as never)
    if(!user) redirect("/login");

    const dataPosts  = await getAllPosts();
    const posts: Post[] = await dataPosts.data

    if(!dataPosts.success) {
        console.log("failed to fetch post informations");
       return redirect("/login?session=expired", RedirectType.push)
    }

    const dataUsers = await getUsers()
    const users: User[] = await dataUsers.data

    if(!dataUsers.success) {
        console.log("failed to fetch users");
        return redirect("/login?session=expired", RedirectType.push)
    }

    const followedDataUsers = await getFollowedUsers()
    const followedUsers: User[] = await followedDataUsers.data

    if(!followedDataUsers.success) {
        console.log("failed to fetch followed users");
        return redirect("/login?session=expired", RedirectType.push)
    }


    return (
        <main className="relative w-full">
            <Suspense fallback={<Loading/>}>
                <div className="sticky top-0 z-50 pt-6 pb-4 rounded-lg w-full bg-white">
                    <div className="max-w-7xl mx-auto grid gap-5 sm:gap-10 px-2 sm:px-4">
                        <Link href={"/"} className="flex sm:hidden items-center justify-center mt-2 sm:mt-4">
                            <h1 className="font-bold text-primary text-xl">twotter</h1>
                            <Bird className="text-primary"/>
                        </Link>
                        <div className="flex gap-6 items-start">
                            <Link href={"/"} className="hidden sm:flex items-center mt-2 sm:mt-4">
                                <h1 className="font-bold text-primary text-xl">twotter</h1>
                                <Bird className="text-primary"/>
                            </Link>
                            <div className="flex justify-center max-w-3xl mx-auto w-full">
                                <SearchComponent followedList={followedUsers} usersList={users} activeUser={currentUser?.value}/>
                            </div>
                            <Popover>
                                <PopoverTrigger>
                                    <Avatar className="relative sm:mt-4">
                                        <AvatarImage src={`https://avatar.vercel.sh/${currentUser?.value}.svg?text=${currentUser?.value.slice(0,2).toUpperCase()}`}/>
                                        <AvatarFallback>
                                            {currentUser?.value.slice(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <p className="text-muted-foreground text-sm font-medium">
                                        @{currentUser?.value}
                                    </p>
                                    <form action={logout as string} className="mt-2">
                                        <SubmitButton text="Esci" className={"w-full"}/>
                                    </form>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <CreatePost activeUser={currentUser?.value} />
                    </div>
                </div>
                <div className="p-4 pb-6 pt-0 sm:p-6 sm:pt-0">
                    <div className="sm:max-w-xl mx-auto grid gap-2">
                        {
                            posts.length == 0 &&
                            <div className="p-6 border rounded-lg w-full">
                                <div className="w-full mx-auto relative">
                                    <img src={"https://error404.fun/img/full-preview/1x/9.png"}
                                         className="object-cover"
                                         alt="not found"
                                    />
                                </div>
                                <h2 className="text-7xl font-semibold text-primary text-center">Oh no...</h2>
                                <p className="text-sm text-muted-foreground text-center mt-5">
                                    Sembra che tu non segua nessuno e che tu non abbia mai creato un post!<br/>
                                    Ti suggerisco di aggiungere &lsquo;tomg55555&lsquo; tra i seguiti
                                </p>
                                <ArrowDownIcon className="mx-auto text-muted-foreground mt-5"/>
                                <div className="w-full mt-5 flex justify-center">
                                    <FollowButton userId={19} text={"Segui tomg55555"} className="py-2 px-8"/>
                                </div>
                            </div>
                        }
                        {
                            posts.map((item,_)=>((
                                    <div key={_}>
                                        <PostCard activeUser={currentUser?.value} post={item}/>
                                        {
                                            (_+1) % 5 === 0 ?
                                                <div className="mt-2 rounded-lg bg-slate-600 p-6 text-white flex justify-between items-center">
                                                    <div>
                                                        <h2 className="font-semibold text-xl">
                                                            Impressed?
                                                        </h2>
                                                        <p className="">Imagine what we could achieve working together!</p>
                                                    </div>
                                                    <Button asChild variant="secondary">
                                                        <Link href={"mailto:tommasogarzaro@gmail.com"}>
                                                            Hire me!
                                                            <TrophyIcon/>
                                                        </Link>
                                                    </Button>
                                                </div> : <></>
                                        }
                                    </div>
                                )
                            ))
                        }
                    </div>
                </div>
            </Suspense>
        </main>
    );
}
