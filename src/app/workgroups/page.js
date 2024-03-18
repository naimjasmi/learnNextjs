async function getData() {
    const res = await fetch('http://172.16.1.189:8000/workgroups/')
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export default async function WorkgroupsPage() {
    const data = await getData()
    console.log(data)

    return (
        <>
            {data.map(wg => {
                return (
                    <div>

                        <p>{wg.name}</p>
                        <p>{wg.wgid}</p>

                    </div>
                )
            })}
        </>
    )
}