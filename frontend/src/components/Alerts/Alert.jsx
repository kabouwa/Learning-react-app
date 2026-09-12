import { useEffect, useState } from "react"

export default function Alert({children, type, accent, autoRemove = true, removeButton = true}) {
    const alertWillBeRemoved =  typeof autoRemove == "boolean" ? autoRemove : true
    const showRemoveButton =  typeof removeButton == "boolean" ? removeButton : true
    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        if(!alertWillBeRemoved) return;
        const displayIimeout = setTimeout(() => {
            setShowAlert(false)
        },6000)
        
        return () => {
            clearTimeout(displayIimeout)
        }
    },[])

    // const tailwind = {
    //     info    : 'border-blue-400 bg-blue-300/75 text-blue-900',
    //     success : 'border-green-400 bg-green-300/75 text-green-900',
    //     error   : 'border-red-400 bg-red-300/75 text-red-900',
    //     warning : 'border-yellow-400 bg-yellow-300/75 text-yellow-900'
    // }

    const bootstrap = {
        info    : {class:'info', icon: 'fa-circle-info'},
        success : {class:'success', icon: 'fa-check'},
        error   : {class:'danger', icon: 'fa-circle-exclamation'},
        warning : {class:'warning', icon: 'fa-triangle-exclamation'},
    }

    const alertType = bootstrap[type?.toLowerCase()]?.class ?? bootstrap.info.class
    const iconClass = bootstrap[type?.toLowerCase()]?.icon ?? bootstrap.info.icon

    return (
        <>
        {
            showAlert && (
                <div className={`alert relative py-2 fade show alert-${alertType}`}>

                    {
                        showRemoveButton  && (
                           <button type="button" 
                                className="absolute top-2 right-3" 
                                onClick={() => {setShowAlert(false)}}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button> 
                        )
                    }

                    <i className={"fa-solid mr-2 " + iconClass}></i>

                    {accent && (<strong>{accent} : </strong>)} 

                    {children}

                </div>
            )
        }
        </>
    )
}