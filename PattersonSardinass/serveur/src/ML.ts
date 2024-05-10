export async function ask_python(code: string){
    const url = `http://localhost:1116/${code}`
    console.log("url ", url)
    return await fetch(url)
}