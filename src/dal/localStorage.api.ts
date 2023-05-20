
export class LocalStorageApi {

    static setAccessToken(accessToken: string) {
        localStorage.setItem('accessToken', accessToken);
    }

    static readAccessToken() {
        return localStorage.getItem('accessToken');
    }

    static setRefreshToken(refreshToken: string) {
        localStorage.setItem('refreshToken', refreshToken);
    }

    static readRefreshToken() {
        return localStorage.getItem('refreshToken');
    }

    static getFavoritesVacancies() {
        return  JSON.parse(localStorage.getItem('favorites') || '[]') as Array<number>;
    }

    static addFavoriteVacancy(id: number) {
        let favoritesVacancies = JSON.parse(localStorage.getItem('favorites') || '[]') as Array<number>;
        favoritesVacancies.length < 500 && favoritesVacancies.unshift(id);
        localStorage.setItem('favorites', JSON.stringify(favoritesVacancies));
        return favoritesVacancies;
    }

    static removeFavoriteVacancy(id: number) {
        let favoritesVacancies = JSON.parse(localStorage.getItem('favorites') || '[]') as Array<number>;
        favoritesVacancies = favoritesVacancies.filter(favoriteId => favoriteId !== id);
        localStorage.setItem('favorites', JSON.stringify(favoritesVacancies));
        return favoritesVacancies;
    }

}