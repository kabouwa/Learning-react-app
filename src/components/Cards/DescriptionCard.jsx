import { memo } from "react";

function DescriptionCard({ data }) {
    const {title, description, icon} = data;

    return(
        <div className="bg-gray-500/30 backdrop-blur-2xl ring ring-indigo-500 rounded-xl p-3 transition-all duration-300 hover:-translate-1 hover:bg-gray-300/30">
            <h3 className='flex items-center gap-3'>
                <div className='border p-2 text-md rounded-2xl bg-white text-indigo-500'>
                    <i className={'fa-solid ' + icon  }></i>
                </div>
                <span>{ title }</span>
            </h3>
            <p>
                { description }
            </p>                                   
        </div>
    )
}

export default memo(DescriptionCard);