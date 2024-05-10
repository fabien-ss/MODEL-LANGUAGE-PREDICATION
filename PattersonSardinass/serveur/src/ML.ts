

export async function ask_python(code: string){
    const url = `http://127.0.0.1:1121/${code}`
    console.log("url ", url)
    return await (await fetch(url)).json()
}