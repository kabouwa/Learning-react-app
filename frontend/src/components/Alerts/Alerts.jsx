import Alert from "./Alert";

export default function Alerts({alerts, classes='my-6'}) {
    return (
        <>
        {
            alerts.length ?  (
                <section className={"alerts " + classes}>
                    {[...alerts].reverse().map(
                        (alert,index) => (
                            <Alert key={index} type={alert.type} accent={alert.accent} autoRemove={alert?.autoRemove} removeButton={alert?.removeButton}> 
                                {alert.message} 
                            </Alert>
                        )
                    )}
                </section>
            ) : null
        }
        </>
    )
}