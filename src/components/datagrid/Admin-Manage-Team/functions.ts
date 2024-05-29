export const getSalesTeam = async ()=> {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_URL + "/api/sales-team/fetch-sales-team", { method: 'GET'});
    const body = await response.json();
    console.log(body);
    return body.data;
}