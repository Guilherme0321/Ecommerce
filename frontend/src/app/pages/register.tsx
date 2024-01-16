import { useRef, useState } from "react";
import { Input } from "../shared/components/custumInput";
import { StatusUser, User } from "../shared/types/user";
import { userService } from "../service/userService";
import { validUsername } from "../service/usernameIsUnique";
import { authUser } from "../shared/components/utils/authUserInputs";
import { validUserEmail } from "../service/userEmailisUnique";
import { NavBar } from "../shared/components/navBar";
export const Register = () => {

    const formRef = useRef<HTMLFormElement>(null);

    const emailRef = useRef<HTMLFormElement>(null);
    const [labelEmail, setLabelEmail] = useState('Email');
    
    const nameRef = useRef<HTMLFormElement>(null);
    const [labelName, setLabelName] = useState('Name');
    
    const usernameRef = useRef<HTMLFormElement>(null);
    const [labelUsername, setLabelUsername] = useState('Username');
    
    const passwordRef = useRef<HTMLFormElement>(null);
    
    const cityRef = useRef<HTMLFormElement>(null);
    const [labelCity, setLabelCity] = useState('City');
    
    const numberRef = useRef<HTMLFormElement>(null);
    const [labelNumber, setLabelNumber] = useState('Number');
    
    const streetRef = useRef<HTMLFormElement>(null);
    const [labelStreet, setLabelStreet] = useState('Street');
    
    const tradeClassValidity = (element: React.RefObject<HTMLFormElement>, validity: boolean, setLabel: any, labelText: string) => {
        const classies: DOMTokenList | undefined = element.current?.classList;
        if(classies !== undefined) {
            if(validity){
                if(!classies.contains('is-valid')){
                    classies.add('is-valid');
                }
                if(classies.contains('is-invalid')){
                    classies.remove('is-invalid');
                }
            }else {
                if(!classies.contains('is-invalid')){
                    classies.add('is-invalid');
                }
                if(classies.contains('is-valid')){
                    classies.remove('is-valid');
                }
            }
            setLabel(labelText);
        }
    }
    
    const checkUsername = async (): Promise<boolean> => {
        const status = (await validUsername(usernameRef.current?.value)).ok;                
        if(!status) {
            tradeClassValidity(usernameRef, false, setLabelUsername, 'já está sendo utilizado');
        }else {
            tradeClassValidity(usernameRef, true, setLabelUsername, 'Username');
        }
        return status;
    }

    const checkUserEmail = async (): Promise<boolean> => {
        const status = (await validUserEmail(emailRef.current?.value)).ok;        
        if(!status) {
            tradeClassValidity(emailRef, false, setLabelEmail, 'já está sendo utilizado');
        }else {
            tradeClassValidity(emailRef, true, setLabelEmail, 'Email');
        }
        return status;
    }

    const containsFalse = (statusUser: StatusUser): boolean => {
        const arrayValue = Object.values(statusUser);
        for(const value of arrayValue) {
            if(!value){
                return false;
            }
        }
        return true;
    }

    const setErros = async (statusUser: StatusUser | undefined): Promise<boolean> => {
        if(statusUser !== undefined) {
            
            if(!statusUser.address?.city) tradeClassValidity(cityRef, false, setLabelCity, 'Invalido');
            else tradeClassValidity(cityRef, true, setLabelCity, 'City');
            
            if(!statusUser.address?.number) tradeClassValidity(numberRef, false, setLabelNumber, 'Invalido');
            else tradeClassValidity(numberRef, true, setLabelNumber, 'Number');
            
            if(!statusUser.address?.street) tradeClassValidity(streetRef, false, setLabelStreet, 'Invalido');
            else tradeClassValidity(streetRef, true, setLabelStreet, 'Street');
            
            if(!statusUser.username) tradeClassValidity(usernameRef, false, setLabelUsername, 'já está sendo utilizado');
            else if(!await checkUsername()) statusUser.username = false;
            
            if(!statusUser.name) tradeClassValidity(nameRef, false, setLabelName, 'Apenas letras!');
            else tradeClassValidity(nameRef, true, setLabelName, 'Name');
            
            if(!statusUser.email) tradeClassValidity(emailRef, false, setLabelEmail, 'já está sendo utilizado');
            else if(!await checkUserEmail()) statusUser.email = false;
 
            return containsFalse(statusUser);
        }else{
            return false;
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const user: User = {
            name: nameRef.current?.value,
            email: emailRef.current?.value,
            username: usernameRef.current?.value,
            password: passwordRef.current?.value,
            address: `${streetRef.current?.value},${numberRef.current?.value},${cityRef.current?.value}`
        }

        const statusUser: boolean = await setErros(authUser(user));

        if(statusUser){
            
            const res = await userService(user)
            console.log(res);
            if (res.ok && formRef.current) {
                formRef.current.submit();
            }else {
                console.error(res);
            }
            
        }
    }

    return (    
        <>
            <NavBar />
            <section className="position-absolute top-50 start-50 translate-middle" id="bg" style={{width: '100%', height:'100%'}}>
                <div className="position-absolute top-50 start-50 translate-middle bg-white rounded-4" style={{width:'25%'}}>
                    <fieldset className="m-2 position-relative d-flex justify-content-center flex-column">
                        <form ref={formRef} className="form-floating m-3 d-flex justify-content-center flex-column border border-black border-5 p-5 rounded-4" onSubmit={handleSubmit}>
                                <Input type='text' inputRef={nameRef} labelText={labelName} id='name' required={true} />
                                <Input type='text' inputRef={emailRef} labelText={labelEmail} id='email' required={true} />
                                <Input type='text' inputRef={usernameRef} labelText={labelUsername} id='username' required={true} />
                                <Input type='password' inputRef={passwordRef} labelText='Password' id='password' required={true} />
                                <Input type='text' inputRef={cityRef} labelText={labelCity} id='city' required={true} />
                                <Input type='text' inputRef={streetRef} labelText={labelStreet} id='street' required={true} />
                                <Input type='number' inputRef={numberRef} min={0} labelText={labelNumber} id='number' required={true} />
                                <button id="submit" className="btn btn-outline-dark" type="submit">Submit</button>
                        </form>
                        <h2 className="position-absolute top-0 bg-black text-white rounded-5 p-1 px-3" style={{left:'5vh'}}>Cadastro</h2>                
                    </fieldset>
                </div>
            </section>
        </>
    );
};