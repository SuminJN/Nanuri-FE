import {http, HttpResponse} from 'msw'
import {mockItems} from '../fixtures/mockItems.js';

export const itemHandler = [
    http.get('/api/items', () => {
        return HttpResponse.json(mockItems);
    }),

    http.get(`/api/item/:itemId`, (request) => {
        const { itemId } = request.params;
        return HttpResponse.json(mockItems[itemId]);
    }),

    http.patch(`/api/item/:itemId`, async ({request, params}) => {
        const {itemId} = params;
        const item = await request.json();
        console.log("itemId: ", itemId);
        console.log("item: ", item);

        return new HttpResponse(null, {status: 204});
    }),

    http.delete(`/api/item/:itemId`, (request) => {
        const { itemId } = request.params;
        console.log("itemId: ", itemId);

        return new HttpResponse(null, {status: 200});
    }),
]