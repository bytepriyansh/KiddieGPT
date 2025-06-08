import DashboardHeader from "./_components/dashboard-header"
import UserStoryList from "./_components/user-story-list"

const Dashboard = () => {
  return (
    <div className="min-h-screen mt-16 bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 px-4 py-6 md:px-16 lg:px-32">
      <DashboardHeader />
      <div className="mt-10 text-center text-gray-700 text-lg">
        <UserStoryList />
      </div>
    </div>
  )
}

export default Dashboard
