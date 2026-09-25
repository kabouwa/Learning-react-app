export default function withCounter(OriginalComponent) {

    const NewComponent = (props) => {
        const logMessage = (message) => {
            console.log(message);
        }

        return ( <OriginalComponent {...props} hcoFunc={logMessage} /> )
    }

    return NewComponent;
}