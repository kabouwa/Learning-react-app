import { useUser } from "../../context/UserContext";
import countries from "../../data/countries.json";
import Divider from "../Utilities/Divider";
import ConfirmButton from "../Forms/ConfirmButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function InfoLine({ label , value, topBorder = false, bottomBorder = true}) {
    return (
        <div className={"border-gray-300 py-3 my-1 px-2 text-sm md:text-md" + (topBorder ? ' border-t-1' : '') + (bottomBorder ? ' border-b-1' : '')}>
            <strong className="mr-2">{label} :</strong>
            <span>{value}</span>
        </div>
    )
}

export default function AccountDetails() {
    const { user, shop } = useUser();
    const [country, setCountry] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setCountry(
            countries.find((c) => c.code === shop?.country)?.name
        );
    }, [shop]);

    /**
     * How to loop an object
     * Object.entries(user).map( ([key, value]) => <InfoLine key={key} label={key} value={value} /> ) 
     */   

    return (
        <>
        {
            Object.values(user ?? {}).length
            ?(
                <div className="relative p-4 rounded-xl bg-white/90 dark:bg-gray-800">
                    <p className="font-bold text-xl md:text-3xl">Informations</p>
                
                    <ConfirmButton label='Edit' classes="absolute top-7 md:top-5 right-5 fs-6 md:text-lg w-20 md:w-30 h-6 md:h-8" onClick={() => {navigate('/dashboard/account/edit')}} />

                    
                    <InfoLine key="id" label="Account ID" value={ 'COFFEE-SHOP-NO-' + user?.id} />
                    <InfoLine key="name" label="Name" value={user?.name} />
                    <InfoLine key="email" label="Email" value={user?.email} />
                    <InfoLine key="created_at" label="Member from" value={user?.created_at} bottomBorder={false} />

                    <Divider label="Shop informations" />

                    <InfoLine key="shop_name" label="Shop name" value={shop?.shop_name} />
                    <InfoLine key="address" label="Address" value={shop?.address} />
                    <InfoLine key="zipcode" label="Postal / Zip code" value={shop?.zipcode} />
                    <InfoLine key="city" label="City" value={shop?.city} />
                    <InfoLine key="country" label="Country" value={country} bottomBorder={false} />
                </div>
            ) : (<p className="my-8 text-center text-gray-500/90">Loading ...</p>)
        }
        </>
    )
}