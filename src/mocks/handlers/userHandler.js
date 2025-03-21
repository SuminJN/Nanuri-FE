import {http, HttpResponse} from 'msw'
import {mockUser} from "../fixtures/mockUser";

export const userHandler = [
    http.get('/api/user', () => {
        return HttpResponse.json(mockUser);
    }),

    http.patch('/api/user', () => {
        return new HttpResponse(null, {status: 204});
    }),
]