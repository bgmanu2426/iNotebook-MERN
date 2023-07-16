import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, GoogleProvider, FacebookProvider } from "../Auth/Firebase";
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc'
import { BsFacebook } from 'react-icons/bs'

const Login = () => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        loginUser(credentials.email, credentials.password);
    }

    // TODO :Complete the app verification to get extra api requests
    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, GoogleProvider);
            loginUser(auth.currentUser.email, auth.currentUser.uid);
        } catch (error) {
            console.log(error);
        }
    }

    // TODO :Complete the Facebook Login
    const loginWithFacebook = async () => {
        try {
            await signInWithPopup(auth, FacebookProvider)
        } catch (error) {
            console.log(error);
        }
    }

    const loginUser = async (email, password) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST_URL}/api/user/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const json = await response.json();
            if (json.success) {
                localStorage.setItem("token", json.authToken);
                toast.success(json.message, {
                    duration: 1500
                })
                setTimeout(() => {
                    navigate("/");
                }, 1600);
            } else {
                toast.error(json.message, {
                    duration: 1500
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <section>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Log In</h2>

                            <p className="mt-2 text-sm text-gray-600">
                                Don&apos;t have an account?{' '}
                                <Link
                                    to="/signup"
                                    title=""
                                    className="font-semibold text-black transition-all duration-200 hover:underline"
                                >
                                    Create a free account
                                </Link>
                            </p>

                            <form onSubmit={handleSubmit} className="mt-8">
                                <div className="space-y-5">
                                    <div>
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Email address{' '}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="email"
                                                name='email'
                                                id='email'
                                                value={credentials.email}
                                                onChange={(e) => {
                                                    setCredentials({ ...credentials, email: e.target.value })
                                                }}
                                                required
                                                autoComplete='email'
                                                placeholder="Email"
                                            ></input>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="" className="text-base font-medium text-gray-900">
                                                {' '}
                                                Password{' '}
                                            </label>
                                            <Link
                                                to="/"
                                                title=""
                                                className="text-sm font-semibold text-black hover:underline"
                                            >
                                                {' '}
                                                Forgot password?{' '}
                                            </Link>
                                        </div>

                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                name='password'
                                                id='password'
                                                type="password"
                                                value={credentials.password}
                                                onChange={(e) => {
                                                    setCredentials({ ...credentials, password: e.target.value })
                                                }}
                                                required
                                                autoComplete='current-password'
                                                minLength={6}
                                                placeholder="Password"
                                            ></input>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                        >
                                            Log In <ArrowRight className="ml-2" size={16} />
                                        </button>
                                    </div>
                                </div>
                            </form>

                            <div className="mt-3 space-y-3">
                                <button
                                    type="button"
                                    className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                                    onClick={loginWithGoogle}
                                >
                                    <FcGoogle className='text-2xl' />
                                    &nbsp;&nbsp;Login with Google
                                </button>

                                <button
                                    type="button"
                                    className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                                    onClick={loginWithFacebook}
                                >
                                    <BsFacebook className='text-blue-600 text-2xl' />
                                    &nbsp;&nbsp;Login with Facebook
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="h-full w-full">
                        <img
                            className="mx-auto h-full w-full rounded-md object-cover hidden lg:block"
                            src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                            alt=""
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login