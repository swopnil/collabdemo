import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Paperclip, 
  Smile, 
  Image as ImageIcon, 
  Link2, 
  MoreVertical,
  Phone,
  Video,
  Search,
  Users,
  Pin,
  FileCode,
  MessageSquare
} from 'lucide-react';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { ScrollArea } from "../../components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";

const TeamChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: {
        name: 'Alex Kim',
        avatar: '/api/placeholder/40/40',
        initials: 'AK'
      },
      content: "I've just pushed the latest changes to the model training pipeline. Can someone review the PR?",
      timestamp: new Date(Date.now() - 3600000),
      reactions: ['👍', '🚀'],
      attachments: [
        {
          type: 'code',
          name: 'train.py',
          preview: 'def train_model(data):'
        }
      ]
    },
    {
      id: 2,
      sender: {
        name: 'Sarah Chen',
        avatar: '/api/placeholder/41/41',
        initials: 'SC'
      },
      content: "I'll take a look at it. Do you want to do a quick call to discuss the changes?",
      timestamp: new Date(Date.now() - 1800000),
      reactions: ['👀']
    }
  ]);
  
  const scrollRef = useRef(null);

  const sendMessage = () => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: {
        name: 'You',
        avatar: '/api/placeholder/42/42',
        initials: 'YO'
      },
      content: message,
      timestamp: new Date(),
      reactions: []
    }]);
    
    setMessage('');
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const formatTimestamp = (date) => {
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex h-full rounded-lg bg-white shadow-sm overflow-hidden">
      {/* Chat Sidebar */}
      <div className="w-64 border-r flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-semibold mb-2">Team Chat</h2>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search messages" className="pl-8" />
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {['General', 'Development', 'Design', 'Planning'].map((channel) => (
              <Button
                key={channel}
                variant={channel === 'Development' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                {channel}
              </Button>
            ))}
          </div>
          
          <div className="p-4 border-t">
            <h3 className="text-sm font-medium mb-2">Online Members</h3>
            <div className="space-y-2">
              {messages.map(msg => msg.sender).filter((v, i, a) => 
                a.findIndex(t => t.name === v.name) === i
              ).map((user) => (
                <div key={user.name} className="flex items-center gap-2">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
                  </div>
                  <span className="text-sm">{user.name}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="font-semibold">Development</h2>
            <div className="flex items-center gap-2 text-gray-500">
              <Users className="h-4 w-4" />
              <span className="text-sm">8 members</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Pin className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Pinned Messages</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Button variant="ghost" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-6">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4"
              >
                <Avatar>
                  <AvatarImage src={msg.sender.avatar} />
                  <AvatarFallback>{msg.sender.initials}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{msg.sender.name}</span>
                    <span className="text-sm text-gray-500">
                      {formatTimestamp(msg.timestamp)}
                    </span>
                  </div>
                  
                  <p className="mt-1">{msg.content}</p>
                  
                  {msg.attachments?.map((attachment, index) => (
                    <div 
                      key={index}
                      className="mt-2 p-3 bg-gray-50 rounded-lg flex items-center gap-2"
                    >
                      <FileCode className="h-4 w-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">{attachment.name}</p>
                        <p className="text-xs text-gray-500">{attachment.preview}</p>
                      </div>
                    </div>
                  ))}
                  
                  {msg.reactions?.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {msg.reactions.map((reaction, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                        >
                          {reaction}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Reply</DropdownMenuItem>
                    <DropdownMenuItem>React</DropdownMenuItem>
                    <DropdownMenuItem>Forward</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Link2 className="h-4 w-4" />
            </Button>
            
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1"
            />
            
            <Button variant="ghost" size="icon">
              <Smile className="h-4 w-4" />
            </Button>
            <Button onClick={sendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamChat;