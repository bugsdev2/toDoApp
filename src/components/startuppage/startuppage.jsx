import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useFormik, Formik, Form, ErrorMessage, Field } from 'formik';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Modal from '../modal/modal.jsx';
import * as Yup from 'yup';

import '../loader/loader.css';

export default function StartUpPage() {
    const [cookie, setCookie, deleteCookie] = useCookies('userName');
    const navigate = useNavigate();
    const [values, setValues] = useState({});
    const [errorMsg, setErrorMsg] = useState('');

    const [loader, setLoader] = useState('hidden');

    useEffect(() => {
        if (cookie.userName) {
            navigate('/dashboard');
        }
    }, [cookie.userName]);

    const login = (
        <div className="bg-white text-bg-purple justify-self-center rounded-3xl p-4">
            <div className="text-center font-bold text-lg">Login</div>
            <Formik
                initialValues={{
                    userName: 'test_user',
                    password: 'Password123',
                }}
                validationSchema={Yup.object({
                    userName: Yup.string()
                        .min(4, '*User Name should be at least 4 letters')
                        .required('*Please enter your User Name')
                        .matches(/^[a-z]\D+/, '*Please start with a lowercase letter'),
                    password: Yup.string()
                        .min(6, '*Password Should be at least 6 letters')
                        .matches(/(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])\w{6,20}/, '*Password should have at least one capital letter, one small letter and one number')
                        .required('*Please enter your Password'),
                })}
                onSubmit={(values) => {
                    setLoader('block');
                    const userName = values.userName;
                    const password = values.password;
                    axios.get(`https://todoapp-api-22b3.onrender.com/get-user/${userName}/${password}`).then((response) => {
                        if (response.data[0]) {
                            setLoader('hidden');
                            setCookie('userName', userName, { sameSite: 'none', maxAge: 3000000, secure: true });
                            navigate('/dashboard');
                        } else {
                            setLoader('hidden');
                            navigate('/signup');
                        }
                    });
                }}
            >
                <Form className="grid">
                    <label htmlFor="userName" className="mt-1">
                        User Name
                    </label>
                    <Field id="userName" name="userName" type="text" className="border border-bg-purple rounded-xl px-3" required />
                    <ErrorMessage name="userName" style={{ color: 'red', textAlign: 'center' }} component="small" />
                    <label htmlFor="password" className="mt-1">
                        Password
                    </label>
                    <Field id="password" name="password" type="password" className="border border-bg-purple rounded-xl px-3" required />
                    <ErrorMessage name="password" style={{ color: 'red', textAlign: 'center' }} component="small" />
                    <div className="flex justify-center mt-3">
                        <button type="submit" className="btn">
                            Log In
                        </button>
                    </div>
                    <div className="text-center text-sm mt-2">
                        <Link to="/signup">Sign Up for a New Account</Link>
                    </div>
                </Form>
            </Formik>
        </div>
    );

    const signup = (
        <div className="bg-white text-bg-purple justify-self-center rounded-3xl p-4">
            <div className="text-center font-bold text-lg">Sign Up</div>
            <Formik
                initialValues={{
                    userName: values.userName || '',
                    password: values.password || '',
                    firstName: '',
                    lastName: '',
                }}
                validationSchema={Yup.object({
                    userName: Yup.string()
                        .min(4, '*User Name should be at least 4 letters')
                        .required('*Please enter your User Name')
                        .matches(/^[a-z]\D+/, '*Please start with a lowercase letter'),
                    password: Yup.string()
                        .min(6, '*Password Should be at least 6 letters')
                        .matches(/(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])\w{6,20}/, '*Password should have at least one capital letter, one small letter and one number')
                        .required('*Please enter your Password'),
                    firstName: Yup.string().required('*Please enter your First Name'),
                    lastName: Yup.string().required('Please enter your Last Name'),
                })}
                onSubmit={(values) => {
                    setLoader('block');
                    axios.get(`https://todoapp-api-22b3.onrender.com/get-users`).then((response) => {
                        const usersArr = response.data;
                        if (usersArr.find((item) => item.userName === values.userName)) {
                            setLoader('hidden');
                            setErrorMsg(
                                <div className="text-center text-red-600 text-sm font-bold">
                                    <div>It seems great minds do think alike</div>
                                    <div>because this user name's been taken.</div>
                                </div>
                            );
                        } else {
                            setValues(values);
                            setCookie('userName', values.userName, { sameSite: 'none', maxAge: 3000000, secure: true });
                            axios.post('https://todoapp-api-22b3.onrender.com/add-user', values).then(() => {
                                navigate('/login');
                                setLoader('hidden');
                            });
                        }
                    });
                }}
            >
                <Form className="grid">
                    <label htmlFor="userName" className="mt-1">
                        User Name
                    </label>
                    <Field id="userName" name="userName" type="text" className="border border-bg-purple rounded-xl px-3" minLength="4" required />
                    {errorMsg}
                    <ErrorMessage name="userName" style={{ color: 'red', textAlign: 'center' }} component="small" />
                    <label htmlFor="passwordSignUp" className="mt-1">
                        Password
                    </label>
                    <Field id="password" name="password" type="password" className="border border-bg-purple rounded-xl px-3" minLength="6" required />
                    <ErrorMessage name="password" style={{ color: 'red', textAlign: 'center' }} component="small" />
                    <label htmlFor="firstName" className="mt-1">
                        First Name
                    </label>
                    <Field id="firstName" name="firstName" type="text" className="border border-bg-purple rounded-xl px-3" minLength="3" required />
                    <ErrorMessage name="firstName" style={{ color: 'red', textAlign: 'center' }} component="small" />
                    <label htmlFor="lastName" className="mt-1">
                        Last Name
                    </label>
                    <Field id="lastName" name="lastName" type="text" className="border border-bg-purple rounded-xl px-3" minLength="3" required />
                    <ErrorMessage name="lastName" style={{ color: 'red', textAlign: 'center' }} component="small" />
                    <div className="flex justify-center mt-3">
                        <button type="submit" className="btn">
                            Sign Up
                        </button>
                    </div>
                    <div className="text-center text-sm mt-2">
                        <Link to="/login">Already have an Account? Log In</Link>
                    </div>
                </Form>
            </Formik>
        </div>
    );

    return (
        <>
            <div className={`${loader} fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_0_1000px_black] opacity-90 bg-black`}>
                <div className="loader"></div>
            </div>
            <div className="grid md:flex h-[100vh] w-[100vw]">
                <header className="flex justify-center items-center py-20 text-white relative md:w-1/2 bg-rose-500">
                    <img className="absolute w-48" src="/images/stickyNote.png" />
                    <h1 className="text-7xl font-borel mt-20 z-20 text-white">Stickeez</h1>
                </header>
                <main className="grid items-center md:w-1/2 p-6">
                    <Routes>
                        <Route path="/login" element={login} />
                        <Route path="/signup" element={signup} />
                        <Route index element={login} />
                    </Routes>
                </main>
            </div>
        </>
    );
}
