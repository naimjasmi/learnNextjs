import UserCard from "./usercard"
import Link from "next/link"
import Footer from "../components/footer"
export default function DashboardPage(){
    return(
        <div>
            <h1>Dashboard</h1>
            <p>this is dashboard</p>
            <UserCard/>
            <div>
                <Link href="/activity" scroll={false}> Activity</Link>
                <Link href="/workgroups" scroll={false}> Workgroup</Link>
            </div>

        </div>
        
    )
}