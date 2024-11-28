"use server";

import { parseWithZod } from "@conform-to/zod"
import {commentSchema, loginSchema, messageSchema, userSchema} from "@/lib/zodSchemas";
import {redirect} from "next/navigation";
import { cookies } from 'next/headers'
import {unstable_noStore as noStore} from "next/cache";


export async function createUser(prevState:unknown, formData: FormData) {
    noStore();
    const submission = parseWithZod(formData, {
        schema: userSchema,
    });

    if(submission.status !== "success"){
        return {
            status: 400,
            data: submission.reply()
        }
    }

    const reqBody = {
        username: submission.value.username,
        email: submission.value.email,
        password: submission.value.password
    }

    const res = await fetch("http://staging.iakta.net:8000/api/register", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reqBody),
        cache: "no-cache",
    })

    const data = await res.json()

    if (res.ok) {
        return redirect("/signup/success")
    } else {
        return {
            success: false,
            data,
            message: "Utente già esistente o problema con il server"
        };
    }
}
export async function login(prevState:unknown, formData: FormData) {
    noStore();

    const submission = parseWithZod(formData, {
        schema: loginSchema,
    });

    if(submission.status !== "success"){
        return {
            status: 400,
            data: submission.reply()
        }
    }

    const reqBody = {
        username: submission.value.username,
        password: submission.value.password
    }

    const res = await fetch("http://staging.iakta.net:8000/api/login", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reqBody),
        cache: "default",
        keepalive: true,

    })

    const data = await res.json()

    if (res.ok) {
        const cookieStore = await cookies();
        cookieStore.set({
            name:"token",
            value: data.token,
            maxAge: 7200,
            //TODO: secure cookie storing https://nextjs.org/docs/app/api-reference/functions/cookies
        });

        cookieStore.set({
            name:"user",
            value: submission.value.username,
            maxAge: 7200,
            //TODO: secure cookie storing https://nextjs.org/docs/app/api-reference/functions/cookies
        });

        return redirect("/");
    } else {
        return {
            success: false,
            data,
            message: "Utente non esistente o password non valida"
        };
    }
}
export async function logout(){

    const cookieStore = await cookies()
    const authCookie = cookieStore.get('token')

    if(!authCookie)  return redirect("/auth-error")

    const res = await fetch("http://staging.iakta.net:8000/api/logout", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${authCookie.value}`,
            "Content-Type": "application/json"
        },
        cache: "no-cache",
    })

    const data = await res.json()
    console.log(data)

    if (res.ok) {
        (await cookies()).delete('token')
        return redirect("/login")
    } else {
        (await cookies()).delete('token')
        return redirect("/auth-error")
    }
}
export async function getAllPosts(){
    noStore();

    const cookieStore = await cookies()
    const authCookie = cookieStore.get('token')

    if(!authCookie)  return redirect("/auth-error")

    const res = await fetch("http://staging.iakta.net:8000/api/posts", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authCookie.value}`,
            "Content-Type": "application/json",
        },
        redirect:"follow",
        cache: "no-cache"
    })

    const data = await res.json()

    if (res.ok) {
        return {success: true, data}
    } else {
        return {success: false, data}
    }
}
export async function createMessage(prevState:unknown, formData: FormData){
    noStore();

    const cookieStore = await cookies()
    const authCookie = cookieStore.get('token')

    if(!authCookie)  return redirect("/auth-error");

    const submission = parseWithZod(formData, {
        schema: messageSchema,
    });

    if(submission.status !== "success"){
        return {
            status: 400,
            data: submission.reply()
        }
    }

    const reqBody = {
        message: submission.value.message,
    }

    const res = await fetch("http://staging.iakta.net:8000/api/postMessage", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${authCookie.value}`,
            "Content-Type": "application/json",
        },
        redirect:"follow",
        body: JSON.stringify(reqBody),
        cache: "no-cache",
    })

    const data = await res.json()

    if (res.ok) {
        return {success: true, data}
    } else {
        return {success: false, data }
    }
}
export async function getPost(postId:number){
    noStore();
    const cookieStore = await cookies()
    const authCookie = cookieStore.get('token')

    if(!authCookie)  return redirect("/auth-error");

    const id = await postId;
    const url = `http://staging.iakta.net:8000/api/postDetail/${id}`

    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authCookie.value}`,
            "Content-Type": "application/json",
        },
        redirect:"follow",
        cache: "no-cache",
    })

    const data = await res.json()

    if (res.ok) {
        if(!data[0].Text) {
            return {success: true, data, comments: false}
        } else { return {success: true, data, comments: true}}

    } else {
        return {success: false, data, comments: false }
    }
}
export async function getUsers(){

    const cookieStore = await cookies()
    const authCookie = cookieStore.get('token')

    if(!authCookie)  return redirect("/auth-error")

    const res = await fetch("http://staging.iakta.net:8000/api/listUsers", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authCookie.value}`,
            "Content-Type": "application/json",
        },
        redirect:"follow",
        cache: "no-cache"
    })

    const data = await res.json()

    if (res.ok) {
        return {success: true, data}
    } else {
        return {success: false, data}
    }
}
export async function followUser(userId:number){
    noStore();

    const cookieStore = await cookies()
    const authCookie = cookieStore.get('token')

    if(!authCookie)  return redirect("/auth-error");

    const reqBody = {
        id: userId,
    }

    const res = await fetch("http://staging.iakta.net:8000/api/followUser", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${authCookie.value}`,
            "Content-Type": "application/json",
        },
        redirect:"follow",
        body: JSON.stringify(reqBody),
        cache: "no-cache",
    })

    const data = await res.json()

    if (res.ok) {
        return {success: true, data}
    } else {
        return {success: false, data }
    }
}
export async function unfollowUser(userId:number){
    noStore();

    const cookieStore = await cookies()
    const authCookie = cookieStore.get('token')

    if(!authCookie)  return redirect("/auth-error");

    const reqBody = {
        id: userId,
    }

    const res = await fetch("http://staging.iakta.net:8000/api/unFollowUser", {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${authCookie.value}`,
            "Content-Type": "application/json",
        },
        redirect:"follow",
        body: JSON.stringify(reqBody),
        cache: "no-cache",
    })

    const data = await res.json()

    console.log(data);

    if (res.ok) {
        return {success: true, data}
    } else {
        return {success: false, data }
    }
}
export async function getFollowedUsers(){
    noStore();
    const cookieStore = await cookies()
    const authCookie = cookieStore.get('token')

    if(!authCookie)  return redirect("/auth-error");

    const url = `http://staging.iakta.net:8000/api/followedUsers`

    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authCookie.value}`,
            "Content-Type": "application/json",
        },
        redirect:"follow",
        cache: "no-cache",
    })

    const data = await res.json()

    if (res.ok) {
        return {success: true, data}
    } else {
        return {success: false, data }
    }
}
export async function SendComment(postId:number, prevState:unknown, formData: FormData){
    noStore();

    const cookieStore = await cookies()
    const authCookie = cookieStore.get('token')

    if(!authCookie)  return redirect("/auth-error");

    const submission = parseWithZod(formData, {
        schema: commentSchema,
    });

    if(submission.status !== "success"){
        return {
            status: 400,
            data: submission.reply()
        }
    }

    const reqBody = {
        comment: submission.value.message,
        postId: postId,
    }

    const res = await fetch("http://staging.iakta.net:8000/api/addcomment", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${authCookie.value}`,
            "Content-Type": "application/json",
        },
        redirect:"follow",
        body: JSON.stringify(reqBody),
        cache: "no-cache",
    })

    const data = await res.json()

    if (res.ok) {
        return {success: true, data}
    } else {
        return {success: false, data }
    }
}
export async function deleteComment(postId:number, commentId:number){
    noStore();

    const cookieStore = await cookies()
    const authCookie = cookieStore.get('token')

    if(!authCookie)  return redirect("/auth-error");


    const reqBody = {
        postId: postId,
        commentId: commentId
    }

    const res = await fetch("http://staging.iakta.net:8000/api/deleteComment", {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${authCookie.value}`,
            "Content-Type": "application/json",
        },
        redirect:"follow",
        body: JSON.stringify(reqBody),
        cache: "no-cache",
    })

    const data = await res.json()

    console.log(data)

    if (res.ok) {
        return {success: true, data}
    } else {
        return {success: false, data }
    }
}




