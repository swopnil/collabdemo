import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GitBranch,
  GitFork,
  GitCommit,
  Save,
  RotateCcw,
  Copy,
  Download,
  Share2
} from 'lucide-react';
import { Button } from "../../components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "../../components/ui/select";
import { ScrollArea } from "../../components/ui/scroll-area";

const FileEditor = ({ file }) => {
  const [currentBranch, setCurrentBranch] = useState('main');
  const [content, setContent] = useState(`import numpy as np
import pandas as pd

def preprocess_data(data):
    """
    Preprocess the input data for model training
    """
    # Your preprocessing logic here
    return processed_data
`);

  const [gitInfo] = useState({
    branches: ['main', 'feature/model-training', 'bugfix/data-processing'],
    lastCommit: {
      hash: 'a1b2c3d',
      message: 'Update preprocessing function',
      author: 'Alex Kim',
      time: '2 hours ago'
    }
  });

  return (
    <div className="h-full bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Editor Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold">preprocessing.py</h2>
            <span className="text-sm text-gray-500">Python</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Undo
            </Button>
            <Button variant="outline" size="sm">
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Select value={currentBranch} onValueChange={setCurrentBranch}>
              <SelectTrigger className="w-[200px]">
                <GitBranch className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {gitInfo.branches.map(branch => (
                  <SelectItem key={branch} value={branch}>
                    {branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center text-sm text-gray-500">
              <GitCommit className="h-4 w-4 mr-1" />
              <span>Last commit: {gitInfo.lastCommit.message}</span>
              <span className="mx-1">•</span>
              <span>{gitInfo.lastCommit.time}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <GitFork className="h-4 w-4 mr-2" />
              Create PR
            </Button>
            <Button size="sm">
              <Save className="h-4 w-4 mr-2" />
              Commit Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <ScrollArea className="h-[calc(100vh-250px)]">
        <div className="p-4 font-mono text-sm">
          <pre className="p-4 bg-gray-50 rounded-lg">
            {content}
          </pre>
        </div>
      </ScrollArea>
    </div>
  );
};

export default FileEditor;