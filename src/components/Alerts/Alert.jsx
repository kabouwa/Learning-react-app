export default function Alert({children,type,accent}) {
    const types = {
        info    : 'border-blue-400 bg-blue-300/75 text-blue-900',
        success : 'border-green-400 bg-green-300/75 text-green-900',
        error   : 'border-red-400 bg-red-300/75 text-red-900',
        warning : 'border-yellow-400 bg-yellow-300/75 text-yellow-900'
    }

    return (
        <div className={`my-2 p-2 rounded border ${types[type.toLowerCase()] ?? types.info}`}>
            {accent && (<strong>{accent} : </strong>)} 
            {children}
        </div>
    )
}