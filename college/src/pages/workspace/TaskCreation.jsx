import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Wand2,
  Calendar,
  Users,
  Clock,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Plus
} from 'lucide-react';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Progress } from "../../components/ui/progress";

const TaskCreationForm = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: '',
    dueDate: '',
    assignees: [],
    estimatedHours: '',
    subtasks: []
  });

  const [aiSuggestions, setAiSuggestions] = useState(null);

  const simulateAIAnalysis = async () => {
    setIsAnalyzing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setAiSuggestions({
      subtasks: [
        "Research and select authentication provider",
        "Set up basic user model and database schema",
        "Implement login/register UI components",
        "Add OAuth integration for social login",
        "Create email verification flow",
        "Set up password reset functionality"
      ],
      timeEstimate: "3-4 days",
      suggestedAssignees: [
        { id: 1, name: "Alex Kim", avatar: "/api/placeholder/40/40", matchScore: 95 },
        { id: 2, name: "Sarah Chen", avatar: "/api/placeholder/41/41", matchScore: 88 }
      ],
      recommendations: [
        "Consider using Auth0 for faster implementation",
        "Add rate limiting for security",
        "Implement JWT token refresh mechanism"
      ]
    });
    
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Task Title</label>
                <Input
                  placeholder="e.g., Implement User Authentication"
                  value={taskData.title}
                  onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Describe the task in detail..."
                  className="h-32"
                  value={taskData.description}
                  onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                />
              </div>

              <Button 
                className="w-full"
                onClick={() => {
                  simulateAIAnalysis();
                  setStep(2);
                }}
              >
                <Wand2 className="h-4 w-4 mr-2" />
                Analyze with AI
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {isAnalyzing ? (
              <div className="text-center py-8 space-y-4">
                <Brain className="h-12 w-12 mx-auto text-purple-500 animate-pulse" />
                <p className="text-lg font-medium">Analyzing Task...</p>
                <Progress value={66} className="w-64 mx-auto" />
              </div>
            ) : (
              <>
                <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    <h3 className="font-medium">AI Suggestions</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Recommended Subtasks</h4>
                      <div className="space-y-2">
                        {aiSuggestions?.subtasks.map((subtask, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-2 bg-white p-2 rounded border"
                          >
                            <CheckCircle2 className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{subtask}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Suggested Team Members</h4>
                      <div className="flex -space-x-2">
                        {aiSuggestions?.suggestedAssignees.map((member) => (
                          <div key={member.id} className="relative">
                            <Avatar className="border-2 border-white">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full px-1">
                              {member.matchScore}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Additional Recommendations</h4>
                      <div className="space-y-2">
                        {aiSuggestions?.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <AlertCircle className="h-4 w-4 text-blue-500" />
                            <span>{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Priority</label>
                      <Select
                        value={taskData.priority}
                        onValueChange={(value) => setTaskData({ ...taskData, priority: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Due Date</label>
                      <Input
                        type="date"
                        value={taskData.dueDate}
                        onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Assignees</label>
                    <div className="flex items-center gap-2 mt-2">
                      {taskData.assignees.map((assignee, index) => (
                        <Avatar key={index}>
                          <AvatarImage src={assignee.avatar} />
                          <AvatarFallback>{assignee.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                      ))}
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Time Estimate</label>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">
                        AI Suggestion: {aiSuggestions?.timeEstimate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={() => {
                    // Create task with AI suggestions
                    onClose();
                  }}>
                    Create Task
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskCreationForm;