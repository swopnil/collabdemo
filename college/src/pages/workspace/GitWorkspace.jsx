import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GitBranch,
  GitCommit,
  GitPullRequest,
  Files,
  Folder,
  FileCode,
  Plus,
  Search,
  RefreshCw,
  GitMerge,
  AlertCircle,
  Check,
  History,
  ArrowUpRight,
  MessageSquare
} from 'lucide-react';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Progress } from "../../components/ui/progress";

const GitWorkspace = () => {
  const [selectedBranch, setSelectedBranch] = useState('main');
  const [activeFile, setActiveFile] = useState(null);

  const projectData = {
    branches: [
      { name: 'main', lastCommit: 'Update README.md', author: 'Alex Kim', timestamp: '2h ago' },
      { name: 'feature/auth', lastCommit: 'Add OAuth integration', author: 'Sarah Chen', timestamp: '5h ago' },
      { name: 'bugfix/login', lastCommit: 'Fix session handling', author: 'Mike Ross', timestamp: '1d ago' }
    ],
    files: [
      {
        type: 'folder',
        name: 'src',
        items: [
          { type: 'file', name: 'App.tsx', language: 'typescript', modified: true },
          { type: 'file', name: 'index.tsx', language: 'typescript' },
        ]
      },
      {
        type: 'folder',
        name: 'components',
        items: [
          { type: 'file', name: 'Button.tsx', language: 'typescript' },
          { type: 'file', name: 'Card.tsx', language: 'typescript', modified: true }
        ]
      }
    ],
    pullRequests: [
      {
        id: 1,
        title: 'Add authentication flow',
        author: { name: 'Sarah Chen', avatar: '/api/placeholder/41/41' },
        branch: 'feature/auth',
        status: 'open',
        reviews: 2,
        comments: 5,
        commits: 8
      },
      {
        id: 2,
        title: 'Fix login page issues',
        author: { name: 'Mike Ross', avatar: '/api/placeholder/42/42' },
        branch: 'bugfix/login',
        status: 'review',
        reviews: 1,
        comments: 3,
        commits: 3
      }
    ],
    recentCommits: [
      {
        hash: 'a1b2c3d',
        message: 'Update authentication middleware',
        author: { name: 'Sarah Chen', avatar: '/api/placeholder/41/41' },
        timestamp: '2h ago',
        files: ['src/middleware/auth.ts', 'src/utils/session.ts']
      },
      {
        hash: 'e4f5g6h',
        message: 'Add unit tests for login flow',
        author: { name: 'Mike Ross', avatar: '/api/placeholder/42/42' },
        timestamp: '4h ago',
        files: ['tests/auth.test.ts']
      }
    ]
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Project Repository</h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <GitBranch className="h-3 w-3" />
                {selectedBranch}
              </Badge>
              <Button variant="ghost" size="sm">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input placeholder="Search files..." className="pl-8" />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Branch
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full p-6 gap-6 grid grid-cols-12">
        {/* File Explorer */}
        <div className="col-span-3 space-y-6">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Files</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="p-2">
                  {projectData.files.map((item) => (
                    <div key={item.name}>
                      <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                        <Folder className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      {item.items.map((file) => (
                        <div
                          key={file.name}
                          className="flex items-center justify-between p-2 pl-8 hover:bg-gray-100 rounded-lg cursor-pointer"
                          onClick={() => setActiveFile(file)}
                        >
                          <div className="flex items-center gap-2">
                            <FileCode className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{file.name}</span>
                          </div>
                          {file.modified && (
                            <Badge variant="outline" className="text-yellow-600 bg-yellow-50">
                              Modified
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span>Branches</span>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[300px]">
                <div className="p-2 space-y-1">
                  {projectData.branches.map((branch) => (
                    <div
                      key={branch.name}
                      className={`p-2 rounded-lg cursor-pointer ${
                        selectedBranch === branch.name ? 'bg-blue-50' : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedBranch(branch.name)}
                    >
                      <div className="flex items-center gap-2">
                        <GitBranch className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">{branch.name}</span>
                      </div>
                      <div className="mt-1 pl-6 text-xs text-gray-500">
                        {branch.lastCommit} • {branch.timestamp}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="col-span-6 space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectData.recentCommits.map((commit) => (
                  <div key={commit.hash} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={commit.author.avatar} />
                      <AvatarFallback>{commit.author.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{commit.author.name}</span>
                        <span className="text-sm text-gray-500">committed {commit.timestamp}</span>
                      </div>
                      <p className="text-sm mt-1">{commit.message}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {commit.files.map((file, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {file}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pull Requests */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Pull Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectData.pullRequests.map((pr) => (
                  <div key={pr.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={pr.author.avatar} />
                          <AvatarFallback>{pr.author.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{pr.title}</h3>
                          <p className="text-sm text-gray-500">
                            #{pr.id} opened by {pr.author.name}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          pr.status === 'open'
                            ? 'text-green-600 bg-green-50'
                            : 'text-yellow-600 bg-yellow-50'
                        }
                      >
                        {pr.status}
                      </Badge>
                    </div>

                    <div className="mt-4 flex items-center gap-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <GitBranch className="h-4 w-4" />
                        {pr.branch}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <GitCommit className="h-4 w-4" />
                        {pr.commits} commits
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MessageSquare className="h-4 w-4" />
                        {pr.comments} comments
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {[...Array(pr.reviews)].map((_, i) => (
                          <Avatar key={i} className="border-2 border-white h-8 w-8">
                            <AvatarImage src={`/api/placeholder/${45 + i}/45`} />
                            <AvatarFallback>R{i}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <Button variant="outline" size="sm">
                        View PR
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-3 space-y-6">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Repository Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Code Coverage</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Build Status</span>
                    <Badge variant="outline" className="text-green-600 bg-green-50">
                      Passing
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <div className="text-2xl font-semibold">24</div>
                    <div className="text-xs text-gray-500">Open Issues</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <div className="text-2xl font-semibold">156</div>
                    <div className="text-xs text-gray-500">Total Commits</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Contributors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Alex Kim', commits: 45, avatar: '/api/placeholder/40/40' },
                  { name: 'Sarah Chen', commits: 32, avatar: '/api/placeholder/41/41' },
                  { name: 'Mike Ross', commits: 28, avatar: '/api/placeholder/42/42' }
                ].map((contributor) => (
                  <div
                    key={contributor.name}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                      <AvatarImage src={contributor.avatar} />
                        <AvatarFallback>{contributor.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{contributor.name}</div>
                        <div className="text-xs text-gray-500">{contributor.commits} commits</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// File Editor Component
const FileEditor = ({ file }) => {
  const [content, setContent] = useState(`import React from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const CustomButton: React.FC<Props> = ({
  variant = 'default',
  size = 'md',
  children
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      className="rounded-lg font-medium"
    >
      {children}
    </Button>
  );
};`);

  const [changes] = useState([
    { line: 5, type: 'added', content: '  size?: \'sm\' | \'md\' | \'lg\';' },
    { line: 12, type: 'modified', content: '  size = \'md\',' },
    { line: 15, type: 'removed', content: '      className="rounded-md"' }
  ]);

  const getLineClass = (lineNumber) => {
    const change = changes.find(c => c.line === lineNumber);
    if (!change) return '';
    
    switch (change.type) {
      case 'added':
        return 'bg-green-50 border-l-2 border-green-500';
      case 'removed':
        return 'bg-red-50 border-l-2 border-red-500';
      case 'modified':
        return 'bg-yellow-50 border-l-2 border-yellow-500';
      default:
        return '';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* File Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FileCode className="h-5 w-5 text-blue-500" />
          <div>
            <h3 className="font-medium">{file.name}</h3>
            <p className="text-sm text-gray-500">Last modified 2 hours ago</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <History className="h-4 w-4 mr-2" />
            History
          </Button>
          <Button size="sm">
            <GitCommit className="h-4 w-4 mr-2" />
            Commit Changes
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex">
          {/* Line Numbers */}
          <div className="bg-gray-50 text-gray-400 text-right p-4 select-none">
            {content.split('\n').map((_, i) => (
              <div key={i} className="text-xs leading-6">{i + 1}</div>
            ))}
          </div>

          {/* Code Content */}
          <div className="flex-1 p-4 font-mono text-sm overflow-auto">
            {content.split('\n').map((line, i) => (
              <div key={i} className={`leading-6 ${getLineClass(i + 1)}`}>
                <pre className="pl-2">{line}</pre>
              </div>
            ))}
          </div>

          {/* Change Indicators */}
          <div className="w-16 bg-gray-50 border-l">
            {changes.map((change) => (
              <div
                key={change.line}
                className="px-4 py-1 text-xs"
                style={{ marginTop: `${(change.line - 1) * 24}px` }}
              >
                {change.type === 'added' && (
                  <span className="text-green-600">+</span>
                )}
                {change.type === 'removed' && (
                  <span className="text-red-600">-</span>
                )}
                {change.type === 'modified' && (
                  <span className="text-yellow-600">~</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-blue-600 bg-blue-50">
              TypeScript
            </Badge>
            <Badge variant="outline" className="text-purple-600 bg-purple-50">
              React
            </Badge>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {content.split('\n').length} lines • {content.length} characters
        </div>
      </div>
    </div>
  );
};

export default GitWorkspace;



