import {http, HttpResponse} from 'msw'

export const historyHandler = [
    http.delete(`/api/history/:itemId`, (request) => {
        const {itemId} = request.params;
        console.log("itemId: ", itemId);
        return new HttpResponse(null, {status: 200});
    }),
]