import React, { useState } from 'react';
import { 
  Brain,
  Stars,
  Zap,
  ChevronRight,
  Award,
  BookOpen,
  Code,
  Briefcase,
  TrendingUp
} from 'lucide-react';

const AIMatching = () => {
  const [matchedOpportunities] = useState([
    {
      id: 1,
      title: "ML Research Assistant",
      type: "Research",
      department: "Computer Science",
      university: "Stanford",
      matchScore: 95,
      skills: ["Python", "TensorFlow", "Data Analysis"],
      requirements: ["ML Knowledge", "Research Experience"],
      strengthMatch: ["Strong Python skills", "ML Project Experience"],
      growthAreas: ["Research Publication Experience"]
    },
    {
      id: 2,
      title: "Sustainable Tech Hackathon",
      type: "Hackathon",
      department: "Engineering",
      university: "MIT",
      matchScore: 88,
      skills: ["React", "Node.js", "API Development"],
      requirements: ["Full-stack Development", "Innovation"],
      strengthMatch: ["Web Development", "Project Leadership"],
      growthAreas: ["Sustainability Domain Knowledge"]
    }
  ]);

  const userSkills = {
    technical: [
      { name: "Python", level: 90 },
      { name: "Machine Learning", level: 85 },
      { name: "React", level: 80 },
      { name: "Node.js", level: 75 }
    ],
    soft: [
      { name: "Team Leadership", level: 85 },
      { name: "Problem Solving", level: 90 },
      { name: "Communication", level: 80 }
    ]
  };

  const getMatchColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    return 'text-yellow-600';
  };

  // Skill Progress Bar Component
  const SkillProgressBar = ({ skill, level }) => (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">{skill}</span>
        <span className="text-sm text-gray-500">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );

  // Opportunity Card Component
  const OpportunityCard = ({ opportunity }) => (
    <div className="p-4 rounded-lg border hover:shadow-md transition-all duration-300 bg-white">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{opportunity.title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            {opportunity.type === 'Research' ? (
              <BookOpen className="h-4 w-4" />
            ) : (
              <Code className="h-4 w-4" />
            )}
            <span>{opportunity.type}</span>
            <span>•</span>
            <span>{opportunity.department}</span>
            <span>•</span>
            <span>{opportunity.university}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className={`text-2xl font-bold ${getMatchColor(opportunity.matchScore)}`}>
              {opportunity.matchScore}%
            </div>
            <div className="text-xs text-gray-500">Match Score</div>
          </div>
          <TrendingUp className={`h-5 w-5 ${getMatchColor(opportunity.matchScore)}`} />
        </div>
      </div>

      {/* Skills and Requirements */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Required Skills</h4>
          <div className="flex flex-wrap gap-2">
            {opportunity.skills.map((skill) => (
              <span 
                key={skill} 
                className="px-2 py-1 bg-gray-100 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Requirements</h4>
          <div className="flex flex-wrap gap-2">
            {opportunity.requirements.map((req) => (
              <span 
                key={req} 
                className="px-2 py-1 border rounded-full text-sm"
              >
                {req}
              </span>
            ))}
          </div>
        </div>
      </div>

{/* Strengths and Growth Areas */}
<div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
        <div>
          <h4 className="text-sm font-medium text-green-600 flex items-center gap-1 mb-2">
            <Zap className="h-4 w-4" />
            Your Strengths
          </h4>
          <ul className="text-sm space-y-1">
            {opportunity.strengthMatch.map((strength) => (
              <li key={strength} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                {strength}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium text-blue-600 flex items-center gap-1 mb-2">
            <Award className="h-4 w-4" />
            Growth Areas
          </h4>
          <ul className="text-sm space-y-1">
            {opportunity.growthAreas.map((area) => (
              <li key={area} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-end items-center gap-4 mt-4">
        <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
          Save for Later
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2">
          Apply Now
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text mb-2">
            AI-Powered Matching
          </h1>
          <p className="text-gray-600">
            Find opportunities that perfectly match your skills and interests
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Skills Profile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <Brain className="h-5 w-5 text-violet-500" />
                <h2 className="text-lg font-semibold">Your Skills Profile</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Technical Skills</h3>
                  <div className="space-y-3">
                    {userSkills.technical.map((skill) => (
                      <SkillProgressBar key={skill.name} {...skill} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Soft Skills</h3>
                  <div className="space-y-3">
                    {userSkills.soft.map((skill) => (
                      <SkillProgressBar key={skill.name} {...skill} />
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Suggested Skills to Develop</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Cloud Computing', 'Data Visualization', 'Research Methods'].map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-violet-50 text-violet-600 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Matched Opportunities */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Stars className="h-5 w-5 text-violet-500" />
                  <h2 className="text-lg font-semibold">Top Matches</h2>
                </div>
                <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
                  View All Matches
                </button>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4">
                {matchedOpportunities.map((opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: Brain,
                  title: "AI Recommendations",
                  desc: "Get personalized opportunity suggestions",
                  gradient: "from-violet-500 to-indigo-500"
                },
                {
                  icon: Briefcase,
                  title: "Skill Assessment",
                  desc: "Update your skills profile",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  icon: Award,
                  title: "Learning Paths",
                  desc: "Discover skill development paths",
                  gradient: "from-purple-500 to-pink-500"
                }
              ].map((action, index) => (
                <div 
                  key={index}
                  className={`bg-gradient-to-br ${action.gradient} text-white rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow`}
                >
                  <action.icon className="h-6 w-6 mb-2" />
                  <h3 className="font-semibold mb-1">{action.title}</h3>
                  <p className="text-sm opacity-90">{action.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMatching;