import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search,
  Filter,
  Briefcase,
  Laptop,
  BookOpen,
  Trophy,
  Building,
  GraduationCap,
  TagIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";

const CampusNetwork = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedUniversity, setSelectedUniversity] = useState('all');

  const opportunities = [
    {
      id: 1,
      title: "AI Research Assistant",
      type: "research",
      university: "MIT",
      department: "Computer Science",
      deadline: "2024-12-01",
      description: "Join our AI lab to work on cutting-edge machine learning projects.",
      requirements: ["Python", "Machine Learning", "TensorFlow"],
      matchScore: 95
    },
    {
      id: 2,
      title: "Sustainable Energy Hackathon",
      type: "hackathon",
      university: "Stanford",
      department: "Engineering",
      deadline: "2024-11-15",
      description: "48-hour hackathon focused on renewable energy solutions.",
      requirements: ["Innovation", "Teamwork", "Engineering"],
      matchScore: 88
    },
    // Add more opportunities
  ];

  const typeIcons = {
    research: BookOpen,
    project: Laptop,
    hackathon: Trophy,
    internship: Briefcase
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-2">
            Campus Network
          </h1>
          <p className="text-gray-600">
            Discover opportunities across top universities
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search opportunities..."
              className="pl-10 h-12"
            />
          </div>
          
          <div className="flex gap-4">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[160px] h-12">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="research">Research</SelectItem>
                <SelectItem value="project">Projects</SelectItem>
                <SelectItem value="hackathon">Hackathons</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
              <SelectTrigger className="w-[160px] h-12">
                <SelectValue placeholder="University" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Universities</SelectItem>
                <SelectItem value="mit">MIT</SelectItem>
                <SelectItem value="stanford">Stanford</SelectItem>
                <SelectItem value="harvard">Harvard</SelectItem>
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-12 px-4">
                  <Filter className="h-5 w-5 mr-2" />
                  More Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Opportunities</SheetTitle>
                </SheetHeader>
                {/* Add more filter options here */}
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opp) => (
            <motion.div
              key={opp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      {React.createElement(typeIcons[opp.type] || Briefcase, {
                        className: "h-6 w-6 text-blue-600"
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-purple-600">
                        {opp.matchScore}% Match
                      </span>
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <TagIcon className="h-4 w-4 text-purple-600" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{opp.title}</h3>
                  
                  <div className="flex items-center gap-2 text-gray-500 mb-4">
                    <Building className="h-4 w-4" />
                    <span className="text-sm">{opp.university}</span>
                    <span className="text-gray-300">•</span>
                    <GraduationCap className="h-4 w-4" />
                    <span className="text-sm">{opp.department}</span>
                  </div>

                  <p className="text-gray-600 mb-4">{opp.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {opp.requirements.map((req, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm"
                      >
                        {req}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Deadline: {new Date(opp.deadline).toLocaleDateString()}
                    </span>
                    <Button>Apply Now</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampusNetwork;