export default function InputField({label, reference}) {

    return (
        <div className="form-group relative flex flex-col items-stretch">
            <input type="text" ref={reference}
                className="bg-gray-200 rounded-md pt-4 pb-2 px-2 text-black text-xl transition-all
                focus:outline-none border-2 hover:border-indigo-500 focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500
                " />
            <div className="text-gray-900/75 absolute top-1.5 left-2 pointer-events-none">{label}</div>
        </div>
    )
}