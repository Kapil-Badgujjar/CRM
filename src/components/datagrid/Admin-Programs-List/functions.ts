export const getPrograms = async ()=> {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_URL + "/api/programs/fetch-programs", { method: 'GET'});
    const body = await response.json();
    console.log(body);
    return body.data;
}

export const getSalesLeaders = async ()=> {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_URL + "/api/sales-team/fetch-sales-leaders", { method: 'GET'});
    const body = await response.json();
    console.log(body);
    return body.data;
}

