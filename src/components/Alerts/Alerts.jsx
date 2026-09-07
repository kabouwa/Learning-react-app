import { useEffect } from "react";
import Alert from "./Alert";

export default function Alerts({alerts}) {
    return (
        <>
            {
                alerts.length ?  (
                    <section className="alerts my-6">
                        {[...alerts].reverse().map(
                            (alert,index) => (
                                <Alert key={index} type={alert.type} accent={alert.accent} autoRemove={alert?.autoRemove}> 
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