import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload,
  FileText,
  CheckCircle2,
  Loader2,
  Brain,
  Sparkles,
  BadgeCheck,
  GraduationCap,
  Briefcase,
  Award,
  Code
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ResumeParser = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [parsedData, setParsedData] = useState(null);

  const simulateResumeUpload = async (file) => {
    setIsUploading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsUploading(false);
    setIsParsing(true);
    
    // Simulate AI parsing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setParsedData({
      education: [
        {
          degree: "Master of Science in Computer Science",
          school: "Stanford University",
          year: "2022-2024"
        },
        {
          degree: "Bachelor of Engineering",
          school: "MIT",
          year: "2018-2022"
        }
      ],
      experience: [
        {
          role: "Software Engineer Intern",
          company: "Google",
          duration: "Summer 2023",
          highlights: [
            "Developed machine learning models",
            "Improved system performance by 40%",
            "Led team of 3 engineers"
          ]
        },
        {
          role: "Research Assistant",
          company: "University Lab",
          duration: "2022-2023",
          highlights: [
            "Published 2 papers in top conferences",
            "Implemented deep learning algorithms"
          ]
        }
      ],
      skills: {
        technical: [
          { name: "Python", level: 95 },
          { name: "Machine Learning", level: 90 },
          { name: "React", level: 85 },
          { name: "Node.js", level: 80 }
        ],
        soft: [
          "Leadership",
          "Problem Solving",
          "Communication",
          "Team Collaboration"
        ]
      },
      projects: [
        {
          name: "AI-Powered Chat Application",
          technologies: ["Python", "TensorFlow", "React"],
          description: "Built real-time chat app with AI features"
        },
        {
          name: "Autonomous Drone System",
          technologies: ["C++", "ROS", "Computer Vision"],
          description: "Developed control systems for autonomous drones"
        }
      ],
      recommendations: [
        "Consider applying for AI Research positions",
        "Strong match for Full-stack Development roles",
        "Well-suited for Technical Leadership positions"
      ]
    });
    
    setIsParsing(false);
  };

  return (
    <div className="space-y-6">
      {!parsedData && (
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                simulateResumeUpload(e.target.files[0]);
              }
            }}
            accept=".pdf,.doc,.docx"
          />
          
          {isUploading ? (
            <div className="space-y-4">
              <Loader2 className="h-10 w-10 mx-auto animate-spin text-purple-500" />
              <p className="text-lg font-medium">Uploading Resume...</p>
              <Progress value={66} className="w-64 mx-auto" />
            </div>
          ) : isParsing ? (
            <div className="space-y-4">
              <Brain className="h-10 w-10 mx-auto text-purple-500 animate-pulse" />
              <p className="text-lg font-medium">Analyzing Resume...</p>
              <Progress value={80} className="w-64 mx-auto" />
            </div>
          ) : (
            <>
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-lg font-medium">Drop your resume here</p>
              <p className="text-sm text-gray-500 mt-2">
                Support for PDF, DOC, DOCX files
              </p>
              <Button className="mt-4">
                <FileText className="h-4 w-4 mr-2" />
                Select File
              </Button>
            </>
          )}
        </div>
      )}

      {parsedData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
            <div>
              <h3 className="font-medium">Resume Successfully Parsed</h3>
              <p className="text-sm text-gray-600">AI has analyzed your resume and extracted key information</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Education Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-500" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {parsedData.education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-l-2 border-blue-500 pl-4"
                    >
                      <h4 className="font-medium">{edu.degree}</h4>
                      <p className="text-sm text-gray-600">{edu.school}</p>
                      <p className="text-sm text-gray-500">{edu.year}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-purple-500" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {parsedData.experience.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-l-2 border-purple-500 pl-4"
                    >
                      <h4 className="font-medium">{exp.role}</h4>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.duration}</p>
                      <ul className="mt-2 space-y-1">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-green-500" />
                  Skills Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-4">Technical Skills</h4>
                    <div className="space-y-4">
                      {parsedData.skills.technical.map((skill, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "100%" }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-sm text-gray-500">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <motion.div
                              className="bg-green-500 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">Soft Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {parsedData.skills.soft.map((skill, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Projects Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                  Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {parsedData.projects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gray-50 rounded-lg"
                    >
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech, i) => (
                          <Badge key={i} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-indigo-500" />
                  AI Career Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {parsedData.recommendations.map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg"
                    >
                      <BadgeCheck className="h-5 w-5 text-indigo-500 mt-0.5" />
                      <p className="text-sm">{rec}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">
              Edit Parsed Data
            </Button>
            <Button>
              Save Profile
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ResumeParser;