import request from '../utils/request';



export const fetchData = query => {
    return request({
        url: '/rest/user/find',
        method: 'get',
        params: query
    });
};

export const goodsData = query => {
    return request({
        url: '/rest/goods/findList',
        method: 'get',
        params: query
    });
};

export const flag = userId => {
    return request({
        url: '/rest/user/Flag',
        method: 'get',
        params: { userId: userId }
    });
};

export const inflag = userId => {
    return request({
        url: '/rest/user/inFlag',
        method: 'get',
        params: { userId: userId }
    });
};




export const inture = user_id => {
    return request({
        url: '/rest/user/inture',
        method: 'get',
        params: { user_id: user_id }
    });
};

export const infalse = user_id => {
    return request({
        url: '/rest/user/infalse',
        method: 'get',
        params: { user_id: user_id }
    });

};

export const on = driver_id => {
    return request({
        url: '/rest/tdriver/inture',
        method: 'get',
        params: { driver_id: driver_id }
    });

};

export const down = driver_id => {
    return request({
        url: '/rest/tdriver/infalse',
        method: 'get',
        params: { driver_id: driver_id }
    });

};

export const ordertrue = order_id => {
    return request({
        url: '/rest/torder/inture',
        method: 'get',
        params: { order_id: order_id }
    });

};


export const orderfalse = order_id => {
    return request({
        url: '/rest/torder/infalse',
        method: 'get',
        params: { order_id: order_id }
    });

};

