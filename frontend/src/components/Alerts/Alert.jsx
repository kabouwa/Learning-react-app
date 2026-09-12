import { useEffect, useState } from "react"

export default function Alert({children, type, accent, autoRemove = true, removeButton = true}) {
    const alertWillBeRemoved =  typeof autoRemove == "boolean" ? autoRemove : true
    const showRemoveButton =  typeof removeButton == "boolean" ? removeButton : true
    const [animateOut, setAnimateOut] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);

    const removeAlert = (after = 0) => {
        if(!after) {
            setAnimateOut(true);
            setDeleteAlert(true);
            return
        }

        const displayTimeout = setTimeout(() => {
            setAnimateOut(true);

            setTimeout(() => {
                setDeleteAlert(true);
            }, 500)

        }, after);
        
        return () => {
            clearTimeout(displayTimeout)
        }
    }

    useEffect(() => {
        if(alertWillBeRemoved) removeAlert(3500);
    },[])

    const tailwind = {
        info    : {class: 'ring ring-indigo-500 bg-indigo-500/20 text-blue-900',       icon: 'fa-circle-info'},
        success : {class: 'ring ring-green-400 bg-green-300/75 text-green-900',    icon: 'fa-check'},
        error   : {class: 'ring ring-red-400 bg-red-300/75 text-red-900',          icon: 'fa-circle-exclamation'},
        warning : {class: 'ring ring-yellow-400 bg-yellow-300/75 text-yellow-900', icon: 'fa-triangle-exclamation'}
    }

    const bootstrap = {
        info    : {class:'alert-info',    icon: 'fa-circle-info'},
        success : {class:'alert-success', icon: 'fa-check'},
        error   : {class:'alert-danger',  icon: 'fa-circle-exclamation'},
        warning : {class:'alert-warning', icon: 'fa-triangle-exclamation'},
    }

    const alertClass = tailwind[type?.toLowerCase()]?.class ?? tailwind.info.class
    const iconClass = tailwind[type?.toLowerCase()]?.icon ?? tailwind.info.icon


    

    return (
        <>
        {
            !deleteAlert
            && (
                <div className={`relative m-0 py-1 pe-6 animate-fade-in-to-left transition-all overflow-hidden rounded-2xl alert ${alertClass} ${animateOut ? 'animate-fade-out-to-right' : ''}`}>
                    {
                        showRemoveButton  && (
                        <button type="button" 
                                className="absolute top-1.5 right-3" 
                                onClick={removeAlert}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button> 
                        )
                    }

                    <div className="inline-block m-0 w-[95%]">
                        <i className={"fa-solid mr-2 " + iconClass}></i>
                        {accent && (<strong>{accent} : </strong>)}  {children}
                    </div>

                </div>
            )   
        }
        </>
    )
}