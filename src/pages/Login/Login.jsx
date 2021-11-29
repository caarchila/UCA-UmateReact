import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import LOGIN from '../../assets/img/login.png';
import logo from "../../assets/img/logo.png"

import { useUserContext } from '../../contexts/UserContext';

export default function Login() {
    const { login, token} = useUserContext();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);

    const onChange = (e, save) => {
        save(e.target.value);
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const logged = await login(username, password);

        setError(!logged);
        setUsername("");
        setPassword("");
    }

    if (token) {
        return <Navigate replace to="/redirect" />
    }

    return (
        <div className="flex justify-center h-full items-center mt-40">
            <main className="md:w-3/5 lg:w-2/6 w-4/6 h-96 bg-gray-200 rounded p-8 md:p-10 shadow-sm">
                <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 items-center justify-center">
                    <img src={logo} alt="Logo" className="w-2/4"/>

                    {error && <p className="w-full rounded p-3 text-center text-white font-roboto bg-red-700 select-none">
                        Error...username o contraseña incorrecta.
                    </p>}

                    <input className="font-medium w-full text-gray-700 focus:outline-none focus:ring focus:border-gray-700 p-2 rounded"
                        type='text'
                        value={username}
                        placeholder='username'
                        onChange={(e) => onChange(e, setUsername)}
                    />

                    <input className="font-medium w-full text-gray-700 focus:outline-none focus:ring focus:border-gray-700 p-2 rounded"
                        type="password"
                        placeholder="password"
                        onChange={(e) => onChange(e, setPassword)}
                        value={password}
                    />

                    <button className="mt-6 w-full transition rounded border border-yellow-600 duration-300 ease-in-out text-xl text-extrabold uppercase bg-yellow-600 hover:bg-yellow-400 py-2 px-4 text-gray-100">Sign In </button>
                </form>
            </main>
        </div>
    );
}