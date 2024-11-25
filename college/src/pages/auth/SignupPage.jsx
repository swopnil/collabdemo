import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Github, Linkedin, Upload, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from  '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from  '../../components/ui/input';
import { Label } from  '../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from  '../../components/ui/select';;

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    university: '',
    major: '',
    gradYear: '',
    interests: [],
    githubUsername: '',
    linkedinUrl: '',
    resume: null
  });

  const backgroundColors = [
    'bg-gradient-to-tr from-pink-500 via-purple-500 to-blue-500',
    'bg-gradient-to-tr from-green-400 via-teal-500 to-blue-500',
    'bg-gradient-to-tr from-orange-400 via-pink-500 to-purple-500'
  ];

  const stepVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const renderStep1 = () => (
    <motion.div
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="username" className="text-lg font-medium">
          Choose your username
        </Label>
        <Input
          id="username"
          type="text"
          placeholder="coolhacker123"
          className="h-12 text-lg"
          value={formData.username}
          onChange={(e) => setFormData(prev => ({...prev, username: e.target.value}))}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-lg font-medium">
          Student Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@university.edu"
          className="h-12 text-lg"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-lg font-medium">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          className="h-12 text-lg"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
        />
      </div>

      <Button 
        className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
        onClick={() => setStep(2)}
      >
        Next Step
      </Button>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="university" className="text-lg font-medium">
          University
        </Label>
        <Select 
          onValueChange={(value) => setFormData(prev => ({...prev, university: value}))}
        >
          <SelectTrigger className="h-12 text-lg">
            <SelectValue placeholder="Select your university" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mit">MIT</SelectItem>
            <SelectItem value="stanford">Stanford</SelectItem>
            <SelectItem value="harvard">Harvard</SelectItem>
            {/* Add more universities */}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="major" className="text-lg font-medium">
          Major
        </Label>
        <Select
          onValueChange={(value) => setFormData(prev => ({...prev, major: value}))}
        >
          <SelectTrigger className="h-12 text-lg">
            <SelectValue placeholder="Select your major" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cs">Computer Science</SelectItem>
            <SelectItem value="ee">Electrical Engineering</SelectItem>
            <SelectItem value="me">Mechanical Engineering</SelectItem>
            {/* Add more majors */}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4">
        <Button 
          variant="outline"
          className="w-1/2 h-12 text-lg"
          onClick={() => setStep(1)}
        >
          Back
        </Button>
        <Button 
          className="w-1/2 h-12 text-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          onClick={() => setStep(3)}
        >
          Next
        </Button>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-4"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="w-full h-12 text-lg flex items-center gap-2"
            onClick={() => {/* Handle GitHub connection */}}
          >
            <Github className="w-6 h-6" />
            Connect GitHub
          </Button>
          <Button
            variant="outline"
            className="w-full h-12 text-lg flex items-center gap-2"
            onClick={() => {/* Handle LinkedIn connection */}}
          >
            <Linkedin className="w-6 h-6" />
            Connect LinkedIn
          </Button>
        </div>

        <div className="p-6 border-2 border-dashed rounded-lg text-center">
          <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p className="text-lg font-medium">Drop your resume here</p>
          <p className="text-sm text-gray-500">or click to upload</p>
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                setFormData(prev => ({...prev, resume: e.target.files[0]}));
              }
            }}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button 
          variant="outline"
          className="w-1/2 h-12 text-lg"
          onClick={() => setStep(2)}
        >
          Back
        </Button>
        <Button 
          className="w-1/2 h-12 text-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          onClick={() => {
            // Handle form submission
            navigate('/dashboard');
          }}
        >
          Complete Profile
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${backgroundColors[step - 1]}`}>
      <Card className="w-full max-w-md backdrop-blur-lg bg-white/90">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-500" />
            <CardTitle className="text-2xl font-bold">
              {step === 1 && "Join the Community"}
              {step === 2 && "Tell Us About Yourself"}
              {step === 3 && "Connect & Upload"}
            </CardTitle>
          </div>
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full flex-1 ${
                  i <= step ? 'bg-purple-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;