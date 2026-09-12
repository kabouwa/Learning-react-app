import Alert from "./Alert";

export default function Alerts({alerts, classes='my-6'}) {
    return (
        <>
        {
            alerts.length ?  (
                <div className={"alerts flex flex-col items-stretch justify-center gap-2 fixed bottom-6 right-0 py-0.5 pl-0.5 pr-5 z-80 min-w-80 w-80 overflow-hidden transition-all " + classes}>
                    {[...alerts].reverse().map(
                        (alert,index) => (
                            <Alert key={index} type={alert.type} accent={alert.accent} autoRemove={alert?.autoRemove} removeButton={alert?.removeButton}> 
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