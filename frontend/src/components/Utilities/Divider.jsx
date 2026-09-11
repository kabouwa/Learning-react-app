export default function Divider({label = '', classes='', color='border-gray-500',  showLabel=true}) {
    return (
        <div className={"flex items-center my-2.5 w-full transition-all duration-500 " + classes}>
            <div className={"flex-1 border-t-2 " + color}></div>
            { 
                label
                ?   (<p className={"m-0 mx-1 transition-all duration-500" + (!showLabel &&  'hidden')}>{label}</p>)
                : null
            }
            
            <div className={"flex-1 border-t-2 transition-all duration-500 " + color}></div>
        </div>
    )
}