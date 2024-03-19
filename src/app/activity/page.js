import UserCard from "../dashboard/usercard"
import Link from "next/link"

export default function ActivityPage() {
    return (
        <div>
            <p>This is Activity Page</p>
            <UserCard />
            <div>
                <Link href="/activity" scroll={false}> Activity</Link>
                <Link href="/workgroups" scroll={false}> Workgroup</Link>
            </div>
        </div>

    )
}