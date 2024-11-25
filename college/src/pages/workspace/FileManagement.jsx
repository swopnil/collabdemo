import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Files,
  Upload,
  Download,
  Share2,
  MoreVertical,
  Search,
  Filter,
  Grid,
  List,
  Plus,
  File,
  Image as ImageIcon,
  FileText,
  Coffee,
  Trash2,
  Star,
  Users,
  Cloud,
  Database
} from 'lucide-react';

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Progress } from "../../components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
const FileManagement = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const files = [
    {
      id: 1,
      name: 'Project Proposal.pdf',
      type: 'document',
      size: '2.4 MB',
      modified: '2 hours ago',
      shared: true,
      starred: true,
      author: { name: 'Alex Kim', avatar: '/api/placeholder/40/40' }
    },
    {
      id: 2,
      name: 'UI Design Assets',
      type: 'folder',
      items: 24,
      modified: '1 day ago',
      shared: true,
      author: { name: 'Sarah Chen', avatar: '/api/placeholder/41/41' }
    },
    {
      id: 3,
      name: 'Database Schema.sql',
      type: 'code',
      size: '156 KB',
      modified: '3 days ago',
      author: { name: 'Mike Ross', avatar: '/api/placeholder/42/42' }
    }
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'document':
        return FileText;
      case 'folder':
        return Files;
      case 'image':
        return ImageIcon;
      case 'code':
        return File;
      default:
        return File;
    }
  };

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {files.map((file) => (
        <motion.div
          key={file.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-4 rounded-lg border ${
            selectedFiles.includes(file.id)
              ? 'border-blue-500 bg-blue-50'
              : 'hover:border-gray-300 bg-white'
          }`}
          onClick={() => {
            if (selectedFiles.includes(file.id)) {
              setSelectedFiles(selectedFiles.filter(id => id !== file.id));
            } else {
              setSelectedFiles([...selectedFiles, file.id]);
            }
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {React.createElement(getFileIcon(file.type), {
                className: 'h-8 w-8 text-blue-500'
              })}
              <div>
                <h3 className="font-medium">{file.name}</h3>
                <p className="text-sm text-gray-500">
                  {file.type === 'folder' 
                    ? `${file.items} items`
                    : file.size}
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Star className="h-4 w-4 mr-2" />
                  Star
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={file.author.avatar} />
                <AvatarFallback>{file.author.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-500">{file.modified}</span>
            </div>
            {file.shared && (
              <Users className="h-4 w-4 text-gray-400" />
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="space-y-2">
      {files.map((file) => (
        <motion.div
          key={file.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`p-4 rounded-lg border ${
            selectedFiles.includes(file.id)
              ? 'border-blue-500 bg-blue-50'
              : 'hover:border-gray-300 bg-white'
          }`}
          onClick={() => {
            if (selectedFiles.includes(file.id)) {
              setSelectedFiles(selectedFiles.filter(id => id !== file.id));
            } else {
              setSelectedFiles([...selectedFiles, file.id]);
            }
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {React.createElement(getFileIcon(file.type), {
                className: 'h-5 w-5 text-blue-500'
              })}
              <div>
                <h3 className="font-medium">{file.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>
                    {file.type === 'folder' 
                      ? `${file.items} items`
                      : file.size}
                  </span>
                  <span>•</span>
                  <span>{file.modified}</span>
                  {file.shared && (
                    <>
                      <span>•</span>
                      <Users className="h-4 w-4" />
                      <span>Shared</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={file.author.avatar} />
                <AvatarFallback>{file.author.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Star className="h-4 w-4 mr-2" />
                    Star
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Project Files</h1>
            <p className="text-gray-500">Manage and collaborate on project files</p>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Folder
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search files and folders..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {selectedFiles.length > 0 && (
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {selectedFiles.length} selected
                </span>
                <Button variant="ghost" size="sm" onClick={() => setSelectedFiles([])}>
                  Clear selection
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Access */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Recent', icon: History, count: 12 },
              { label: 'Shared with me', icon: Users, count: 8 },
              { label: 'Starred', icon: Star, count: 5 },
              { label: 'Trash', icon: Trash2, count: 3 }
            ].map((item) => (
              <Button
                key={item.label}
                variant="outline"
                className="h-auto py-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-gray-500" />
                  <span>{item.label}</span>
                </div>
                <span className="text-gray-500">{item.count}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Storage Usage */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Storage Usage</h3>
            <Button variant="outline" size="sm">
              Upgrade Storage
            </Button>
          </div>
          
          <Progress value={75} className="h-2 mb-4" />
          
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: 'Used', value: '7.5 GB', icon: Coffee },
              { label: 'Available', value: '2.5 GB', icon: Cloud },
              { label: 'Total', value: '10 GB', icon: Database }
            ].map((stat) => (
              <div key={stat.label} className="p-4 bg-gray-50 rounded-lg">
                <stat.icon className="h-5 w-5 mx-auto mb-2 text-gray-500" />
                <div className="font-medium">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* File List */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Files</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <Select defaultValue="modified">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modified">Last modified</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="size">Size</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {viewMode === 'grid' ? <GridView /> : <ListView />}
        </div>

        {/* Upload Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg">
              <Upload className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Files</DialogTitle>
              <DialogDescription>
                Drag and drop files or click to browse
              </DialogDescription>
            </DialogHeader>
            <div className="h-64 border-2 border-dashed rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-500">
                  Drop your files here, or click to browse
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { name: 'document.pdf', progress: 100, size: '2.4 MB' },
                { name: 'image.png', progress: 45, size: '1.8 MB' }
              ].map((file) => (
                <div key={file.name} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">{file.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{file.size}</span>
                  </div>
                  <Progress value={file.progress} className="h-1" />
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Share Dialog */}
        <Dialog>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Files</DialogTitle>
              <DialogDescription>
                Invite people to collaborate on these files
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>People with access</Label>
                <div className="mt-2 space-y-2">
                  {[
                    { name: 'Alex Kim', email: 'alex@example.com', role: 'Editor' },
                    { name: 'Sarah Chen', email: 'sarah@example.com', role: 'Viewer' }
                  ].map((person) => (
                    <div key={person.email} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{person.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{person.name}</div>
                          <div className="text-sm text-gray-500">{person.email}</div>
                        </div>
                      </div>
                      <Select defaultValue={person.role.toLowerCase()}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label>Invite new people</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input placeholder="Email address" />
                  <Button>Invite</Button>
                </div>
              </div>
              <div>
                <Label>Share link</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input value="https://share.project.com/abc123" readOnly />
                  <Button variant="outline">Copy</Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FileManagement;