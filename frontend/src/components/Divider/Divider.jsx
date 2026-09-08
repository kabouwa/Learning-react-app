export default function Divider({label = ''}) {
    return (
        <div className="flex items-center my-2.5    ">
            <div className="flex-1 border-t-2 border-gray-500"></div>
            { 
                label
                ?   (<p className="px-2 m-0">{label}</p>)
                : null
            }
            
            <div className="flex-1 border-t-2 border-gray-500"></div>
        </div>
    )
}