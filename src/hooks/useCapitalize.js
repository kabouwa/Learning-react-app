

export default function useCapitalize () {
    const capitalizeWord = word => word?.slice(0,1)?.toUpperCase() + word?.slice(1)?.toLowerCase();
    
    const capitalize = text => text?.trim()?.split(' ')?.map( word => capitalizeWord(word))?.join(' ');

    return { capitalize, capitalizeWord };
}