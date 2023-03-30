export const GET = async({
    request,
    url
}) => {
    const sales = {
        "lu2": 3,
        "wulong1": 1,
        "manontas44": 1,
        "puer2": 2
    }

    return new Response(JSON.stringify(sales), {
        status: 200
    })
}