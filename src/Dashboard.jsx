import Notes from "./Notes";

function Dashboard({ token })
{
    return (
        <div>
            <h3>Dashboard</h3>
            
            <Notes token={token}/>
        </div>
    )
}

export default Dashboard;