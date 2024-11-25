// src/pages/opportunities/OpportunitiesPage.jsx
import React, { useState } from 'react';
import { 
  BookOpen, 
  Briefcase, 
  Code, 
  Trophy, 
  Laptop,
  Calendar,
  Users,
  Building,
  Clock,
  ChevronRight,
  Search,
  Filter,
  SlidersHorizontal
} from 'lucide-react';

const OpportunityCard = ({ opportunity }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{opportunity.title}</h3>
            <p className="text-gray-600">{opportunity.organization}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium
            ${opportunity.matchScore >= 90 ? 'bg-green-100 text-green-800' : 
              opportunity.matchScore >= 80 ? 'bg-blue-100 text-blue-800' : 
              'bg-yellow-100 text-yellow-800'}`}>
            {opportunity.matchScore}% Match
          </span>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Building className="h-4 w-4" />
            <span>{opportunity.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{opportunity.type}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="h-4 w-4" />
            <span>{opportunity.applicants} applicants</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {opportunity.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Apply Now
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const OpportunitiesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Opportunities', icon: Briefcase },
    { id: 'academic', name: 'Academic', icon: BookOpen },
    { id: 'freelancing', name: 'Freelancing', icon: Laptop },
    { id: 'sports', name: 'Sports', icon: Trophy },
    { id: 'internships', name: 'Internships', icon: Code },
    { id: 'jobs', name: 'Jobs', icon: Building }
  ];

  const opportunities = [
    {
      id: 1,
      title: "Research Assistant - AI Lab",
      category: "academic",
      organization: "Stanford University",
      location: "California, USA",
      type: "Part-time",
      deadline: "2024-04-15",
      compensation: "$25/hour",
      applicants: 45,
      description: "Join our AI research team working on cutting-edge machine learning projects.",
      requirements: ["Python", "Machine Learning", "Research Experience"],
      tags: ["AI", "Research", "Computer Science"],
      matchScore: 95
    },
    {
      id: 2,
      title: "Frontend Developer",
      category: "freelancing",
      organization: "Tech Startup",
      location: "Remote",
      type: "Contract",
      deadline: "2024-04-20",
      compensation: "$50/hour",
      applicants: 28,
      description: "Build modern web applications using React and Next.js.",
      requirements: ["React", "TypeScript", "UI/UX"],
      tags: ["Web Development", "Frontend", "Remote"],
      matchScore: 88
    }
  ];

  const filteredOpportunities = opportunities.filter(opp => 
    (activeCategory === 'all' || opp.category === activeCategory) &&
    (opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     opp.organization.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Discover Opportunities
          </h1>
          <p className="text-gray-600 mt-2">
            Find and apply to opportunities that match your interests and skills
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search opportunities..."
              className="w-full h-12 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-50">
            <Filter className="h-5 w-5" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-50">
            <SlidersHorizontal className="h-5 w-5" />
            Sort
          </button>
        </div>

        <div className="flex overflow-x-auto pb-2 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <category.icon className="h-5 w-5" />
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesPage;