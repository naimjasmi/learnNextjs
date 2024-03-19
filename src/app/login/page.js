'use client';

import { useRouter } from "next/navigation";
import(useRouter)
export default function LoginPage() { 

    const router = useRouter()

    function handleLogin(ev){
        ev.preventDefault();

        //login logic
        router.push('/dashboard')

    }
    return ( 
        <div> 
            <h1>MSA eWorklog</h1> 
            <form onSubmit={handleLogin}> 
                <div> 
                    <label htmlFor="loginid">Login</label> 
                    <input type="text" id="loginid" /> 
                </div> 
 
                <div> 
                    <label htmlFor="password">Password</label> 
                    <input type="password" id="password" /> 
                </div> 
 
                <button type="submit">Login</button> 
            </form> 
            <footer></footer>
        </div> 
    ) 
}