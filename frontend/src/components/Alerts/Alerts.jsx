import { useAlerts } from "../../Context/AlertsContext";
import Alert from "./Alert";

export default function Alerts({classes='my-6'}) {
    const { alerts } = useAlerts();

    return (
        <>
        {
            alerts.length ?  (
                <div className={"alerts grid grid-cols-1 justify-center gap-2 fixed bottom-6 right-0 py-0.5 pl-0.5 pr-5 z-80 min-w-80 w-80 overflow-hidden transition-all " + classes}>
                    {alerts.map(
                        (alert,index) => (
                            <Alert key={index} index={index} type={alert.type} accent={alert.accent} autoRemove={alert?.autoRemove} removeButton={alert?.removeButton}> 
                                {alert.message} 
                            </Alert>
                        )
                    )}
                </div>
            ) : null
        }
        </>
    )
}