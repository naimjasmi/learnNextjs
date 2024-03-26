"use client";
//guna pill badges untuk workgroup
//amnil data dari api workgroup
//matchkan nama array.filter

export default function Workgroup({ activitywg, workgroups }) {

    function getWgName(a) {
        if (workgroups.length != 0) {
            const selwg = workgroups.filter(wg => wg.id == a)
            return selwg[0].name
        }
    }
    return (
        <>
            {activitywg.map((a) => {
                return (
                    <span key={a} className="badge text-bg-primary mx-1">{getWgName(a)}</span>
                )
            })
            }
        </>
    )
}
