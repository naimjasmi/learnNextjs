"use client";
//guna pill badges untuk workgroup
//data dari api workgroup
//matchkan nama array.filter

export default function Worktype({ activitywt, worktype }) {

    function getWtName(a) {
        if (worktype.length != 0) {
            const selwt = worktype.filter(wt => wt.id == a)
            return selwt[0].worktypename
        }
    }
    return (
        <>
            {activitywt.map((a) => {
                return (
                    <span key={a} className="badge text-bg-danger mx-1">{getWtName(a)}</span>
                )
            })
            }
        </>
    )
}
