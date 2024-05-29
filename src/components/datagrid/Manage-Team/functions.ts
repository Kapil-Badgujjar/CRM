export const getTeam = async (managerId:string)=> {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_URL + "/api/sales-team/fetch-my-team", { method: 'POST', body: JSON.stringify({managerId})});
    const body = await response.json();
    console.log(body);
    return body.data;
}