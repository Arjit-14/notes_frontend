const BASE = import.meta.env.VITE_API_URL;

const Api = async (
    url,
    method= "GET" ,
    body=null,
    token=null
) => {

    const headers = {};

    if(body)
    {
        headers["Content-Type"] = "application/json";
    }

    if(token)
    {
        headers["Authorization"] = "Bearer " + token;
    }

    const res = await fetch(BASE + url, {
        method,
        headers,
        body: body? JSON.stringify(body) : null,
    });

    const data = await res.json();

    return { ok: res.ok, data };
}

export default Api;