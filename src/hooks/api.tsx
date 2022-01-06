import react, {useState, useEffect} from 'react';

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

const useFetch = ({keyword}) => {

    const [gifUrl, setGifUrl] = useState<any>();

    const fetchGifs = async () => {
        try {
            const responseData = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(' ').join('')}$limit=1`);
            const {data} = await responseData.json();
            setGifUrl(data[0]?.images?.downsized_medium?.url)
        } catch (error) {
            // Setting a random gif
            setGifUrl('https://media4.popsugar-assets.com/files/2013/11/07/832/n/1922398/eb7a69a76543358d_28.gif')
        }
    }

    useEffect(() => {
       if(keyword) fetchGifs();
    }, [keyword]);

    return gifUrl;
}

export default useFetch;