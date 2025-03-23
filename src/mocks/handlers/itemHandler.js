import {http, HttpResponse} from 'msw'
import {mockItems} from '../fixtures/mockItems.js';
import {mockCategory} from "../fixtures/mockCategory";
import {mockItemHistory} from "../fixtures/mockItemHistory";

export const itemHandler = [
    http.get('/api/items', ({request}) => {
        const url = new URL(request.url);
        const categoryId = url.searchParams.get('categoryId')

        if (categoryId && categoryId !== "0") {
            const result = mockItems.filter((item) => item.category === mockCategory[categoryId].label);

            return HttpResponse.json(result);
        }

        return HttpResponse.json(mockItems);
    }),

    http.get(`/api/item/:itemId`, (request) => {
        const {itemId} = request.params;

        return HttpResponse.json(mockItems[itemId]);
    }),

    http.patch(`/api/item/:itemId`, async ({request, params}) => {
        const {itemId} = params;
        const item = await request.json();

        return new HttpResponse(null, {status: 204});
    }),

    http.delete(`/api/item/:itemId`, (request) => {
        const {itemId} = request.params;

        return new HttpResponse(null, {status: 200});
    }),

    http.get(`/api/item/:itemId/applicant`, (request) => {
        const {itemId} = request.params;
        const result = mockItemHistory.filter((history) => history.itemId === itemId);

        return HttpResponse.json(result);
    }),
]