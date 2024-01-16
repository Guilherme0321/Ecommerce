import { useRef } from "react";
import { NavBar } from "../shared/components/navBar"
import { Input } from "../shared/components/custumInput";
import { authenticateUser } from "../service/userService";

export const Login = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const usernameRef = useRef<HTMLFormElement>(null);
    const passwordRef = useRef<HTMLFormElement>(null);

    const tradeClassValidity = (element: React.RefObject<HTMLFormElement>, validity: boolean) => {
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
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const username: string = usernameRef.current?.value;
        const password: string = passwordRef.current?.value;

        const response = await authenticateUser({username: username, password: password});
        
        if(response.ok === false) {
            tradeClassValidity(passwordRef, false);
        }else {
            window.location.reload();
        }
        
    }

    return (
        <>
            <NavBar />
            <section className="position-absolute top-50 start-50 translate-middle" id="bg" style={{width: '100%', height:'100%'}}>
                <div className="position-absolute top-50 start-50 translate-middle bg-white rounded-4" style={{width:'25%'}}>
                    <fieldset className="m-2 position-relative d-flex justify-content-center flex-column">
                        <form ref={formRef} className="form-floating m-3 d-flex justify-content-center flex-column border border-black border-5 p-5 rounded-4" onSubmit={handleSubmit}>
                                <Input type='text' inputRef={usernameRef} labelText="Username" id='username' required={true} />
                                <Input type='password' inputRef={passwordRef} labelText="Password" id='password' required={true} />
                                <button id="submit" className="btn btn-outline-dark" type="submit">Submit</button>
                        </form>
                        <h2 className="position-absolute top-0 bg-black text-white rounded-5 p-1 px-3" style={{left:'5vh'}}>Cadastro</h2>                
                    </fieldset>
                </div>
            </section>
        </>
    )
}