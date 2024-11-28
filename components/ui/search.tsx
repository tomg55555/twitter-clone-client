'use client'

import {useState, useEffect, useRef } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {User} from "@/lib/types";
import { unstable_noStore } from "next/cache";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {UnfollowButton} from "@/components/unfollw-button";
import {FollowButton} from "@/components/follow-button";

interface PageProps {
    usersList: User[],
    followedList: User[]
    activeUser?: string;
}
export function SearchComponent({usersList, followedList, activeUser}: PageProps) {
    unstable_noStore();

    const [searchTerm, setSearchTerm] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [users, setUsers] = useState<User[]>([])
    const [followedUsers, setFollowedUsers] = useState<User[]>([])
    const [filteredUsers, setFilteredUsers] = useState<User[]>([])
    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        setFollowedUsers(followedList);
        setUsers(usersList.filter((user)=>(user.username !== activeUser)));
    }, [usersList, followedList, activeUser]);

    useEffect(() => {
        // Filter users based on search term
        const filtered = users.filter(user =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredUsers(filtered)
    }, [searchTerm, users]);

    return (
        <div className="relative mx-auto w-full overflow-clip">
            <Command shouldFilter={false}
                     onFocus={() => setIsDialogOpen(true)}
                     onBlur={() => setIsDialogOpen(false)}
                     className=""
            >
                <CommandInput
                    ref={inputRef}
                    placeholder="Search users..."
                    value={searchTerm}
                    onValueChange={setSearchTerm}
                    className="w-full h-10 sm:h-14"
                />
                <div
                    className={`
            relative mt-2 w-full z-10
            transition-all duration-300 ease-in-out
            ${isDialogOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none h-0'}
          `}
                >
                    <CommandList className="bg-white border rounded-lg shadow-lg max-h-60 h-fit">
                        <CommandEmpty>No users found</CommandEmpty>
                        <CommandGroup>
                            {(searchTerm === '' ? users : filteredUsers).map(user => (
                                <CommandItem key={user.id} value={user.username} className="px-2 sm:px-6 py-4 rounded-3xl flex items-center justify-between w-full">
                                    <div className="flex items-center gap-2 sm:gap-4">
                                        <Avatar>
                                            <AvatarImage src={`https://avatar.vercel.sh/${user?.username}.svg?text=${user?.username.slice(0,2).toUpperCase()}`}/>
                                            <AvatarFallback>
                                                {user?.username.slice(0, 2)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="">
                                            <p className="text-sm sm:text-lg font-semibold">{user.username}</p>
                                            <p className="text-xs sm:text-sm text-muted-foreground text-wrap max-w-20 sm:max-w-fit">{user.email}</p>
                                        </div>
                                    </div>
                                        {
                                            followedUsers.some((item)=>item.id == user.id) ?
                                                <UnfollowButton userId={user.id} className="block px-3 py-1"/>
                                                :
                                                <FollowButton userId={user.id} className="block px-3 py-1 h-10"/>
                                        }
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </div>
            </Command>
        </div>
    )
}