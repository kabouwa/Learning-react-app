export default function ConfirmButton({label, type = 'submit', disabled = false, onClick=()=>{} }) {

    return (
        <button type={type} disabled={disabled} onClick={onClick}
                className="bg-indigo-500 py-2.5 px-1 rounded-1 fs-5 disabled:brightness-70 disabled:cursor-wait">
                {label}
        </button>
    )
}