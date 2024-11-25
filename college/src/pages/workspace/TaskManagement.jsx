import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain,
  PlusCircle,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
  Users,
  Filter,
  SortAsc,
  ListTodo,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Progress } from "../../components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Implement User Authentication",
      status: "In Progress",
      priority: "High",
      dueDate: "2024-12-01",
      assignee: {
        name: "Alex Kim",
        avatar: "/api/placeholder/40/40"
      },
      progress: 60,
      subtasks: [
        { id: 1, title: "Setup Auth Provider", completed: true },
        { id: 2, title: "Implement Login Flow", completed: true },
        { id: 3, title: "Add Password Reset", completed: false }
      ]
    },
    {
      id: 2,
      title: "Design System Implementation",
      status: "Todo",
      priority: "Medium",
      dueDate: "2024-12-05",
      assignee: {
        name: "Sarah Chen",
        avatar: "/api/placeholder/41/41"
      },
      progress: 30,
      subtasks: [
        { id: 1, title: "Create Component Library", completed: true },
        { id: 2, title: "Document Usage Guidelines", completed: false },
        { id: 3, title: "Add Theme Support", completed: false }
      ]
    }
  ]);

  const [showAIAnalysis, setShowAIAnalysis] = useState(false);

  const generateAISubtasks = (taskDescription) => {
    // Simulated AI task breakdown
    return [
      "Research authentication providers",
      "Setup basic authentication flow",
      "Implement user session management",
      "Add password reset functionality",
      "Create email verification system"
    ];
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500';
      case 'in progress':
        return 'bg-blue-500';
      case 'todo':
        return 'bg-gray-500';
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Task Management
            </h1>
            <p className="text-gray-600 mt-2">
              Track and manage project tasks with AI assistance
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="gap-2">
              <SortAsc className="h-4 w-4" />
              Sort
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <PlusCircle className="h-4 w-4" />
                  New Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                  <DialogDescription>
                    Describe your task and let AI help break it down
                  </DialogDescription>
                </DialogHeader>
                {/* Add task creation form */}
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Task Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Tasks', value: '12', icon: ListTodo, color: 'bg-blue-500' },
            { label: 'In Progress', value: '5', icon: Clock, color: 'bg-yellow-500' },
            { label: 'Completed', value: '4', icon: CheckCircle2, color: 'bg-green-500' },
            { label: 'Past Due', value: '3', icon: AlertCircle, color: 'bg-red-500' }
          ].map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg bg-opacity-10`}>
                  <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Task Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {['Todo', 'In Progress', 'Completed'].map((status) => (
            <div key={status} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{status}</h3>
                <span className="text-sm text-gray-500">
                  {tasks.filter(t => t.status === status).length} tasks
                </span>
              </div>

              <div className="space-y-4">
                {tasks
                  .filter(task => task.status === status)
                  .map((task) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-lg shadow-sm border p-4"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold">{task.title}</h4>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              task.priority === 'High' 
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {task.priority}
                            </span>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Task</DropdownMenuItem>
                            <DropdownMenuItem>Move to...</DropdownMenuItem>
                            <DropdownMenuItem>Generate Subtasks</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="space-y-3 mb-4">
                        {task.subtasks.map((subtask) => (
                          <div 
                            key={subtask.id}
                            className="flex items-center gap-2 text-sm"
                          >
                            <CheckCircle2 
                              className={`h-4 w-4 ${
                                subtask.completed 
                                  ? 'text-green-500'
                                  : 'text-gray-300'
                              }`}
                            />
                            <span className={subtask.completed ? 'line-through text-gray-500' : ''}>
                              {subtask.title}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={task.assignee.avatar} />
                            <AvatarFallback>{task.assignee.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-500">{task.assignee.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">{task.progress}%</span>
                          <Progress value={task.progress} className="w-20 h-2" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* AI Task Analysis Dialog */}
        <Dialog open={showAIAnalysis} onOpenChange={setShowAIAnalysis}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" />
                AI Task Analysis
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Task Breakdown Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {generateAISubtasks("Implement User Authentication").map((subtask, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <Sparkles className="h-5 w-5 text-purple-500" />
                        <span>{subtask}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Time Estimation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Estimated completion time:</span>
                      <span className="font-semibold">3-4 days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Recommended team size:</span>
                      <span className="font-semibold">2 developers</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Resource Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Recommended team members based on skills:</p>
                    <div className="flex -space-x-2">
                      <Avatar className="border-2 border-white">
                        <AvatarImage src="/api/placeholder/40/40" />
                        <AvatarFallback>AK</AvatarFallback>
                      </Avatar>
                      <Avatar className="border-2 border-white">
                        <AvatarImage src="/api/placeholder/41/41" />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAIAnalysis(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  // Apply AI suggestions
                  setShowAIAnalysis(false);
                }}>
                  Apply Suggestions
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Create Task Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg">
              <PlusCircle className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Enter task details or let AI help you break down a complex task
              </DialogDescription>
            </DialogHeader>
            {/* Add task creation form */}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TaskManagement;