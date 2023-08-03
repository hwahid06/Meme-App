const apiURL = 'https://api.imgflip.com/get_memes'

const fetchMemes = () => {
    return fetch(apiURL)
    .then ((response) => response.json())
    .then ((data) => data.data.memes)
    .catch ((error) => {
        console.log('Error fetching memes');
        return [];
        
    })
}

export default fetchMemes