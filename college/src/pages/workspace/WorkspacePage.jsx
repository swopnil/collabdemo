import React, { useState } from 'react';
import { 
  GitBranch, 
  Files, 
  MessageSquare, 
  Video, 
  Plus,
  FileCode,
  Folder,
  ChevronRight,
  Users,
  Calendar,
  CheckCircle2,
  Github
} from 'lucide-react';

const WorkspacePage = () => {
  const [activeTab, setActiveTab] = useState('tasks');

  const projectData = {
    name: "AI Research Project",
    progress: 65,
    deadline: "2024-12-15",
    members: [
      { id: 1, name: "Alex Kim", role: "Lead", avatar: "/api/placeholder/40/40" },
      { id: 2, name: "Sarah Chen", role: "ML Engineer", avatar: "/api/placeholder/41/41" },
      { id: 3, name: "Mike Ross", role: "Data Scientist", avatar: "/api/placeholder/42/42" }
    ],
    gitInfo: {
      branch: "main",
      lastCommit: "Update model training pipeline",
      commits: 156
    }
  };

  const fileStructure = [
    {
      type: 'folder',
      name: 'src',
      items: [
        { type: 'file', name: 'main.py', icon: FileCode },
        { type: 'file', name: 'utils.py', icon: FileCode }
      ]
    },
    {
      type: 'folder',
      name: 'data',
      items: [
        { type: 'file', name: 'train.csv', icon: Files },
        { type: 'file', name: 'test.csv', icon: Files }
      ]
    }
  ];

  const tasks = [
    {
      id: 1,
      title: "Implement Feature Extraction",
      assignee: "Alex Kim",
      status: "In Progress",
      dueDate: "2024-11-30",
      priority: "High"
    },
    {
      id: 2,
      title: "Model Training Pipeline",
      assignee: "Sarah Chen",
      status: "Completed",
      dueDate: "2024-11-25",
      priority: "Medium"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Project Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                {projectData.name}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <span className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  Due {new Date(projectData.deadline).toLocaleDateString()}
                </span>
                <span className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  {projectData.members.length} Members
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Video className="h-4 w-4 mr-2" />
                Join Call
              </button>
              <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Progress */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-purple-600">{projectData.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full" 
                  style={{ width: `${projectData.progress}%` }}
                />
              </div>
            </div>

            {/* Git Info */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Github className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">{projectData.gitInfo.branch}</span>
                </div>
                <span className="text-sm text-gray-500">{projectData.gitInfo.commits} commits</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{projectData.gitInfo.lastCommit}</p>
            </div>

            {/* Team */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {projectData.members.map(member => (
                    <div 
                      key={member.id} 
                      className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-sm font-medium"
                    >
                      {member.name.slice(0, 2)}
                    </div>
                  ))}
                </div>
                <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50">
                  View Team
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - File Explorer & Chat */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Project Files</h2>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {fileStructure.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                        <Folder className="h-4 w-4 text-blue-500" />
                        <span>{item.name}</span>
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Team Chat</h2>
              </div>
              <div className="p-4 h-[300px] overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                      AK
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">Updated the model training pipeline. Check the latest commit.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow h-full">
              <div className="p-4 border-b">
                <div className="flex space-x-4">
                  {['Tasks', 'Files', 'Activity'].map((tab) => (
                    <button
                      key={tab}
                      className={`px-4 py-2 rounded-lg ${
                        activeTab === tab.toLowerCase()
                          ? 'bg-gray-100 font-medium'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveTab(tab.toLowerCase())}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {tasks.map(task => (
                    <div 
                      key={task.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <CheckCircle2 className={`h-5 w-5 ${
                          task.status === 'Completed' ? 'text-green-500' : 'text-gray-400'
                        }`} />
                        <div>
                          <h3 className="font-medium">{task.title}</h3>
                          <p className="text-sm text-gray-500">
                            Assigned to {task.assignee} • Due {new Date(task.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          task.priority === 'High' 
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {task.priority}
                        </span>
                        <button className="px-3 py-1.5 text-sm hover:bg-gray-200 rounded-lg">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage;