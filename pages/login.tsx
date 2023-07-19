
import { useRouter } from 'next/router';
import {useState} from 'react'
import {postData} from '../services/axios.services';
import { useDispatch } from 'react-redux';
import {setGlobalAuth} from '../slice/sliceAuth';

const login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();

    const router = useRouter();

    async function handleSubmit(e : any) {
       e.preventDefault();
       try{
            const data = {email, password};
            const resp = await postData('login', data); // for login
           // const resp = await postData('register', data); //for register no dispatch is used in register
            console.log(resp.data);
            /* out put
            {status: true, message: 'User logged in successfully', data: {…}}
                data: 
                {id: '64a6f58b8c7022874c806b98'}
                message: "User logged in successfully"
                status:true
                [[Prototype]]
                :  
                Object
            */
            if(resp.data.status){
                setErrorMessage("");
                dispatch(setGlobalAuth(resp.data.data.id));
                router.push('/');
            }
       } catch (error: any) {
            setErrorMessage(error.response.data.message);
       }
    }
    return(
 
           <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 shadow-xl">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input 
                                    id="email" 
                                    name="email" 
                                    type="email" 
                                    // autocomplete="email"  
                                    required 
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                    onChange = {(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <input 
                                    id="password" 
                                    name="password" 
                                    type="password" 
                                    // autocomplete="current-password" 
                                    required 
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                    onChange = {(e) => setPassword(e.target.value)}                               
                                />
                            </div>
                        </div>

                        <div>
                            <button 
                                type="submit" 
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick = {(e) => handleSubmit(e)}
                            >
                            Sign in</button>
                            <br />
                            <span className='text-red-700 text-center'>{errorMessage}</span>
                        </div>
                    </form>
                </div>
            </div> 

    )
};
export default login;