import request from '@/util/request.js';

export function getMonthlyVisitorsService() {
    return request.get('/monthlyVisitors')
}

export function addMonthlyVisitorsService() {
    return request.post('/monthlyVisitors')
}