import { useRef, useState } from "react";
import { Input } from "../shared/components/custumInput";
import { User } from "../shared/types/user";
import { userService } from "../shared/service/userService";
export const Register = () => {

    const formRef = useRef<HTMLFormElement>(null);

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [city,setCity] = useState('');
    const [number,setNumber] = useState(0);
    const [street,setStreet] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const user: User = {
            name: name,
            email: email,
            username: username,
            password: password,
            address: `${street},${number},${city}`
        }
        const res = await userService(user)
        if(res.ok){
            formRef.current?.submit();
        }
        
    }

    return (    
        <div className="position-absolute top-50 start-50 translate-middle bg-white bg-opacity-75 rounded-4" style={{width:'20%'}}>
            <fieldset className="m-2 position-relative d-flex justify-content-center flex-column">
                <form ref={formRef} className="form-floating m-3 d-flex justify-content-center flex-column border border-black border-5 p-5 rounded-4" onSubmit={handleSubmit}>
                        <Input type='text'callFuncion={(e:React.ChangeEvent<HTMLInputElement>) => {setName(e.target.value)}} labelText='Name' id='name' required={true} />
                        <Input type='email'callFuncion={(e:React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)}} labelText='Email' id='email' required={true} />
                        <Input type='text'callFuncion={(e:React.ChangeEvent<HTMLInputElement>) => {setUsername(e.target.value)}} labelText='Username' id='username' required={true} />
                        <Input type='password'callFuncion={(e:React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}} labelText='Password' id='password' required={true} />
                        <Input type='text'callFuncion={(e:React.ChangeEvent<HTMLInputElement>) => {setCity(e.target.value)}} labelText='City' id='city' required={true} />
                        <Input type='text'callFuncion={(e:React.ChangeEvent<HTMLInputElement>) => {setStreet(e.target.value)}} labelText='Street' id='street' required={true} />
                        <Input type='number'callFuncion={(e:React.ChangeEvent<HTMLInputElement>) => {setNumber(parseInt(e.target.value))}} min={0} labelText='Number' id='number' required={true} />
                        <button id="submit" className="btn btn-outline-dark" type="submit">Submit</button>
                </form>
                <h2 className="position-absolute top-0 bg-black text-white rounded-5 p-1 px-3" style={{left:'5vh'}}>Cadastro</h2>                
            </fieldset>
        </div>
    );
};