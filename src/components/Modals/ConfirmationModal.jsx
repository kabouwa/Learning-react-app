import { CircleAlert, Trash, X } from "lucide-react";
import { useConfirmationModal } from '../../context/ConfirmationModalContext';

export default function ConfirmationModal() {
    const { showModal, setShowModal, props } = useConfirmationModal();
    const { type = 'delete', primaryButton = 'Confirm', resourceName = 'product', action = () =>{} } = props;

    const handleClick = () => {
        action();
        setShowModal(false);
    }

    const capitalize = (text) => text.slice(0,1).toUpperCase() + text.slice(1).toLowerCase();

    const modalClasses = {
        delete: {title : `Delete ${capitalize(resourceName)}`, icon : <CircleAlert className="text-red-500" />, iconBg : 'bg-red-100/90', iconButton : <Trash />, bgButton : 'bg-red-500', description : `This action is irreversible. Are you sure you want to delete this ${resourceName} ?` }
    };

    const {  title, icon, iconBg, iconButton, bgButton, description } = modalClasses[type.toLowerCase()] || modalClasses.delete;

    return (
        <div id="confirm-modal" 
            className={`fixed top-0 left-0 z-90 w-screen h-screen bg-gray-900/40 dark:bg-gray-900/60 backdrop-blur-3xl
            flex justify-center items-center px-4 ${showModal ? 'animate-fade-in' : 'hidden'}`}>
            
            <div className="bg-white w-full md:w-1/2 max-w-lg min-h-50 rounded-2xl p-4 animate-fade-in-to-top">
                <header className="flex items-center gap-3">
                    <span className={"inline-block rounded-full p-2.5 " + iconBg}>
                        {icon}
                    </span>
                    <p className="text-2xl md:text-4xl">
                        {title}
                    </p>
                </header>

                <main className="my-4 md:my-8 text-gray-500 px-2">
                    <p>
                        {description}
                    </p>
                </main>

                <footer className="flex items-center justify-end gap-2.5">
                    <button type="button" onClick={() => {setShowModal(false)}}
                        className="py-2 px-1.5 md:px-4.5 rounded-2 text-gray-600 flex-1 md:flex-0 flex justify-center items-center gap-2 transition-all ring ring-gray-300 hover:shadow-md shadow-gray-400 "
                    ><X /> Cancel
                    </button>
                    
                    <button type="button" onClick={handleClick}
                        className={"py-2 px-1.5 md:px-4.5 rounded-2 text-white flex-1 md:flex-0 flex justify-center items-center gap-2 hover:brightness-90 transition-all shadow-md shadow-red-300 text-nowrap " + bgButton}
                    >{iconButton}
                    {primaryButton}
                    </button>

                </footer>

            </div>

        </div>
    )
}