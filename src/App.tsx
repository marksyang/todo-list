import { TaskInput } from './components/TaskInput'
import { TaskList } from './components/TaskList'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-16">
      <div className="w-full max-w-2xl px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          待辦事項
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <TaskInput />
          <TaskList />
        </div>
      </div>
    </div>
  )
}

export default App
