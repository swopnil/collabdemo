import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  ScreenShare,
  MessageSquare,
  Users,
  Settings,
  PhoneOff,
  Maximize2,
  Share2,
  Layout,
  PanelLeftOpen
} from 'lucide-react';
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { ScrollArea } from "../../components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";

const VideoCall = () => {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [layout, setLayout] = useState('grid');
  const [showChat, setShowChat] = useState(false);

  const participants = [
    { id: 1, name: 'You', avatar: '/api/placeholder/40/40', isHost: true },
    { id: 2, name: 'Sarah Chen', avatar: '/api/placeholder/41/41', isPresenting: isScreenSharing },
    { id: 3, name: 'Mike Ross', avatar: '/api/placeholder/42/42' },
    { id: 4, name: 'Alex Kim', avatar: '/api/placeholder/43/43' }
  ];

  return (
    <div className="h-screen bg-gray-900 flex">
      {/* Main Call Area */}
      <div className="flex-1 flex flex-col">
        {/* Call Header */}
        <div className="bg-gray-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-white font-semibold">Team Standup Meeting</h2>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-gray-300 text-sm">Live</span>
              </span>
              <span className="text-gray-300 text-sm">• 00:45:23</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              <Maximize2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              <Layout className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Video Grid */}
        <div className="flex-1 p-4 grid grid-cols-2 gap-4">
          {participants.map((participant) => (
            <motion.div
              key={participant.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-lg bg-gray-800 overflow-hidden"
            >
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-gray-900/60 px-3 py-1.5 rounded-full">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={participant.avatar} />
                  <AvatarFallback>{participant.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="text-white text-sm">{participant.name}</span>
                {participant.isHost && (
                  <span className="text-xs bg-blue-500 px-2 py-0.5 rounded-full">Host</span>
                )}
              </div>

              {participant.isPresenting && (
                <div className="absolute top-4 right-4 bg-blue-500 px-3 py-1.5 rounded-full">
                  <span className="text-white text-sm">Presenting</span>
                </div>
              )}

              <img 
                src={participant.avatar} 
                alt={participant.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Call Controls */}
        <div className="bg-gray-800 p-4">
          <div className="flex items-center justify-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={audioEnabled ? 'outline' : 'destructive'}
                    size="lg"
                    onClick={() => setAudioEnabled(!audioEnabled)}
                    className="rounded-full h-12 w-12"
                  >
                    {audioEnabled ? (
                      <Mic className="h-5 w-5" />
                    ) : (
                      <MicOff className="h-5 w-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {audioEnabled ? 'Mute Audio' : 'Unmute Audio'}
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={videoEnabled ? 'outline' : 'destructive'}
                    size="lg"
                    onClick={() => setVideoEnabled(!videoEnabled)}
                    className="rounded-full h-12 w-12"
                  >
                    {videoEnabled ? (
                      <Video className="h-5 w-5" />
                    ) : (
                      <VideoOff className="h-5 w-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {videoEnabled ? 'Stop Video' : 'Start Video'}
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isScreenSharing ? 'secondary' : 'outline'}
                    size="lg"
                    onClick={() => setIsScreenSharing(!isScreenSharing)}
                    className="rounded-full h-12 w-12"
                  >
                    <ScreenShare className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="destructive"
                    size="lg"
                    className="rounded-full h-12 w-12"
                  >
                    <PhoneOff className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>End Call</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <div className="w-80 bg-gray-800 border-l border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold">Participants (4)</h3>
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              <PanelLeftOpen className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-64px)]">
          <div className="p-4 space-y-4">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback>{participant.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white">{participant.name}</p>
                    {participant.isHost && (
                      <span className="text-xs text-gray-400">Host</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!audioEnabled && (
                    <MicOff className="h-4 w-4 text-gray-400" />
                  )}
                  {!videoEnabled && (
                    <VideoOff className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default VideoCall;