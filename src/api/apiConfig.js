const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '07ded58c34360f4f86b51d9ebde3f40c',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;