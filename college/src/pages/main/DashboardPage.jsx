import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Rocket, 
  Users, 
  Calendar,
  BookOpen,
  Code,
  MessageSquare,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

const Dashboard = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const opportunities = [
    {
      title: "AI Research Assistant",
      department: "Computer Science",
      type: "Research",
      deadline: "2 days left",
      matchScore: 92
    },
    {
      title: "Hackathon: Build for Good",
      department: "Engineering",
      type: "Event",
      deadline: "5 days left",
      matchScore: 88
    },
    // Add more opportunities
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Welcome Section */}
        <motion.div variants={item} className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
              Welcome back, Alex!
            </h1>
            <p className="text-gray-600 mt-2">Ready to make an impact today?</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Your Match Score</p>
              <div className="text-2xl font-bold text-purple-600">
                95%
              </div>
            </div>
            <Avatar className="h-16 w-16">
              <AvatarImage src="/api/placeholder/150/150" />
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: Trophy, label: "Achievements", value: "12", color: "bg-yellow-500" },
            { icon: Users, label: "Network", value: "234", color: "bg-blue-500" },
            { icon: Rocket, label: "Projects", value: "5", color: "bg-purple-500" },
            { icon: MessageSquare, label: "Messages", value: "8", color: "bg-green-500" }
          ].map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-24 h-24 opacity-10 rounded-full -mr-6 -mt-6 ${stat.color}`} />
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 mb-4 text-gray-600" />
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Matched Opportunities */}
        <motion.div variants={item}>
          <Card className="border-t-4 border-t-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-purple-500" />
                Top Matches for You
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunities.map((opp, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                        {opp.type === "Research" ? (
                          <BookOpen className="h-6 w-6 text-purple-600" />
                        ) : (
                          <Code className="h-6 w-6 text-purple-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{opp.title}</h3>
                        <p className="text-sm text-gray-500">
                          {opp.department} • {opp.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-purple-600">
                          {opp.matchScore}% Match
                        </div>
                        <div className="text-sm text-gray-500">
                          {opp.deadline}
                        </div>
                      </div>
                      <Button variant="outline">View Details</Button>
</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Active Projects & Calendar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={item}>
            <Card className="border-t-4 border-t-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-6 w-6 text-blue-500" />
                  Active Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "AI Research Paper",
                      progress: 75,
                      deadline: "3 days left",
                      members: 4,
                      color: "bg-blue-500"
                    },
                    {
                      name: "Mobile App Dev",
                      progress: 40,
                      deadline: "1 week left",
                      members: 3,
                      color: "bg-purple-500"
                    }
                  ].map((project, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{project.name}</h3>
                        <span className="text-sm text-gray-500">{project.deadline}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className={`${project.color} h-2 rounded-full`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex -space-x-2">
                          {[...Array(project.members)].map((_, i) => (
                            <Avatar key={i} className="h-8 w-8 border-2 border-white">
                              <AvatarImage src={`/api/placeholder/${30+i}/30`} />
                              <AvatarFallback>U{i}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <Button variant="ghost" size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="border-t-4 border-t-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-green-500" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Team Meeting",
                      time: "2:00 PM Today",
                      type: "Virtual",
                      color: "bg-green-100 text-green-700"
                    },
                    {
                      title: "Project Deadline",
                      time: "Tomorrow",
                      type: "Milestone",
                      color: "bg-red-100 text-red-700"
                    },
                    {
                      title: "Hackathon Kickoff",
                      time: "Saturday 9:00 AM",
                      type: "Event",
                      color: "bg-purple-100 text-purple-700"
                    }
                  ].map((event, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-lg font-bold">
                          {event.time.split(' ')[0].slice(0, 2)}
                        </span>
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-gray-500">{event.time}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.color}`}>
                        {event.type}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;