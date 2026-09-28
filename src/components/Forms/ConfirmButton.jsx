export function ConfirmButton({label, type = 'submit', disabled = false, classes='', title, onClick=()=>{}, children }) {

    return (
        <button type={type} disabled={disabled} onClick={onClick} data-title={title} data-title-position='bottom'
                className={`bg-indigo-500 py-2.5 px-1 mx-1 rounded-1 fs-5 disabled:brightness-70 disabled:cursor-default 
                text-white flex items-center justify-center transition-all hover:brightness-90 ${classes}`}>
                {label}
                {children}
        </button>
    )
}