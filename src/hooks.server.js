export async function handle({
    event,
    resolve
}) {
    return resolve(event, {
        transformPageChunk: ({
            html
        }) => html.replace('%lang%', event.params.lang),
    })
}