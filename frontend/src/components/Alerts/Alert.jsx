import { useEffect, useState } from "react"
import { useAlerts } from "../../Context/AlertsContext";

export default function Alert({children, index, type, accent, autoRemove = true, removeButton = true}) {
    const alertWillBeRemoved =  typeof autoRemove == "boolean" ? autoRemove : true
    const showRemoveButton =  typeof removeButton == "boolean" ? removeButton : true
    const [animateOut, setAnimateOut] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);
    const { removeAlert } = useAlerts();

    const hideAlert = (after = 0) => {
        if(!after) {
            setAnimateOut(true);
            setDeleteAlert(true);
            return
        }

        const displayTimeout = setTimeout(() => {
            setAnimateOut(true);

            setTimeout(() => {
                setDeleteAlert(true);
                removeAlert(index)
            }, 500)

        }, after);
        
        return () => {
            clearTimeout(displayTimeout)
        }
    }

    useEffect(() => {
        if(alertWillBeRemoved) hideAlert(5000);
    },[]);

    const tailwind = {
        info    : {class: 'ring ring-indigo-500 bg-indigo-500/20 text-blue-900',   icon: 'fa-circle-info'},
        success : {class: 'ring ring-green-400 bg-green-500/20 text-green-900',    icon: 'fa-check'},
        error   : {class: 'ring ring-red-400 bg-red-500/20 text-red-900',          icon: 'fa-circle-exclamation'},
        warning : {class: 'ring ring-yellow-400 bg-yellow-500/20 text-yellow-900', icon: 'fa-triangle-exclamation'}
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
                                onClick={hideAlert}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button> 
                        )
                    }

                    <div className="inline-block m-0 w-[94%]">
                        <i className={"fa-solid mr-2 " + iconClass}></i>
                        {accent && (<strong>{accent} : </strong>)}  {children}
                    </div>

                </div>
            )   
        }
        </>
    )
}