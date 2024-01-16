import '../styles/register.css'

export const Input = (
    { id, type, labelText, min, required, inputRef, callFuncion }:{
        id: string,
        type: string,
        labelText: string,
        required: boolean,
        callFuncion?:any,
        inputRef?: any,
        min?:number
    }) => {    
    return (
        <div className='input-group mb-3 d-flex justify-content-center flex-column'>
            <input
                type={type}
                className='input-user form-control m-1 border-0 border-bottom rounded-0 bg-transparent border-black'
                id={id}
                onChange={callFuncion}
                min={min}
                ref={inputRef}
                required={required}
            />
            <label className='input-label' htmlFor={id}>{labelText}</label>
        </div>
    );
};
