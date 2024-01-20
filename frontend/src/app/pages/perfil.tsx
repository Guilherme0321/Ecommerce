import { ChangeEvent, useEffect, useRef, useState } from "react"
import { getInfoPerfil } from "../service/userService";
import { getCookie } from "../shared/components/utils/cookies";
import { NavBar } from "../shared/components/navBar";
import { User } from "../shared/types/user"

export const Perfil = () => {
    const [data, setData] = useState<User>({
        name: '',
        email: '',
        address: '',
        phone: '',
        username: '',
    });

    const token = getCookie('token');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
            setData(prevData => ({
            ...prevData,
            [name]: value,
            }));    
        }

        useEffect(() => {
            const getInfoUser = async () => {
                try {
                    if (token !== null) {
                        const res = await getInfoPerfil(token);         
                        const {orders, cart, ...response} = res[0];               
                        setData(response);
                    } else {
                        console.log('Token inválido!');
                    }
                } catch (error) {
                    console.error(error);
                }
            };
        
            getInfoUser();
        }, [token]);

    const hadleSUbmit = (e: FormDataEvent) => {
        e.preventDefault();

    }

    return (
        <>
            <NavBar />
            <section className="position-absolute top-50 start-50 translate-middle" id="bg" style={{width: '100%', height:'100%'}}>
                <div className="position-absolute top-50 start-50 translate-middle bg-white rounded-4" style={{width:'25%'}}>
                    <fieldset className="m-2 position-relative d-flex justify-content-center flex-column">
                        <form className="form-floating m-3 d-flex justify-content-center flex-column border border-black border-5 p-5 rounded-4">
                            <div className="mb-3">
                                <label htmlFor='name' className="form-label">Name</label>
                                <input type="text" id='name' onChange={handleChange} value={data.name} className="form-control" name="name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor='email' className="form-label">Email</label>
                                <input type="text" id='email' onChange={handleChange} value={data.email} className="form-control" name="email" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor='username' className="form-label">Username</label>
                                <input type="text" id='username' onChange={handleChange} value={data.username} className="form-control" name="username" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor='phone' className="form-label">Phone</label>
                                <input type="text" id='phone' onChange={handleChange} value={data.phone} className="form-control" name="phone" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor='address' className="form-label">Address</label>
                                <input type="text" id='address' onChange={handleChange} value={data.address} className="form-control" name="address" />
                            </div>
                            <button id="submit" className="btn btn-outline-dark" type="submit">Save</button>
                        </form>
                        <h2 className="position-absolute top-0 bg-black text-white rounded-5 p-1 px-3" style={{left:'5vh'}}>Perfil</h2>                
                    </fieldset>
                </div>
            </section>
        </>
    )
}