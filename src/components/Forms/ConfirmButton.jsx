export default function ConfirmButton({label, type = 'submit', disabled = false, classes='', onClick=()=>{} }) {

    return (
        <button type={type} disabled={disabled} onClick={onClick}
                className={`bg-indigo-500 py-2.5 px-1 mx-1 rounded-1 fs-5 disabled:brightness-70 disabled:cursor-wait 
                text-white flex items-center justify-center transition-all hover:brightness-90 ${classes}`}>
                {label}
        </button>
    )
}