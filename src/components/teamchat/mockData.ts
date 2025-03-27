
import { TeamChannel, TeamGroup, TeamMessage } from "@/types/support";
import { TeamMember } from "./TeamChat";

// Mock Gifs data
export const mockGifs = [
  { id: "gif1", url: "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif", title: "Happy" },
  { id: "gif2", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnlya2VpamRjcHUyNDI2c2JzMHRtOTduemRmdWFvYWZ0ZTB6YmtpcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ju7l5y9osyymQ/giphy.gif", title: "Thinking" },
  { id: "gif3", url: "https://media.giphy.com/media/3oKIPf3C7HqqYBVcCk/giphy.gif", title: "Working" },
  { id: "gif4", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnZrYmJ3YTNram43dDZsZXk3MjY3ajg3dW1qZGx6cGxvYWwyb2YwdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohhwytHcusSCXXp96/giphy.gif", title: "Hello" },
];

// Mock Channels data
export const mockChannels: TeamChannel[] = [
  {
    id: "channel-1",
    name: "general",
    description: "General discussions",
    createdAt: "2023-04-01T10:00:00Z",
    createdBy: "user-1",
    isPrivate: false,
    members: ["user-1", "user-2", "user-3"],
    lastMessage: {
      id: "msg-1",
      channelId: "channel-1",
      content: "Has anyone seen the new product demo?",
      createdAt: "2023-04-15T14:30:00Z",
      senderId: "user-2"
    },
    unreadCount: 3,
    isPinned: true,
    topic: "Company-wide discussions",
    purpose: "For general company discussions and announcements"
  },
  {
    id: "channel-2",
    name: "support",
    description: "Customer support discussions",
    createdAt: "2023-05-15T10:30:00Z",
    createdBy: "user-1",
    isPrivate: false,
    members: ["user-1", "user-2"],
    unreadCount: 3,
    isPinned: true,
    topic: "Customer support issues",
    purpose: "For discussing customer support tickets and issues"
  },
  {
    id: "channel-3",
    name: "development",
    description: "Development team channel",
    createdAt: "2023-05-15T11:00:00Z",
    createdBy: "user-2",
    isPrivate: true,
    members: ["user-1", "user-2"],
    unreadCount: 0,
    isPinned: false,
    topic: "Code reviews and technical discussions",
    purpose: "For development team coordination and code discussions"
  }
];

// Mock Groups data
export const mockGroups: TeamGroup[] = [
  {
    id: "group-1",
    name: "Project Alpha Team",
    members: ["user-1", "user-2", "user-3"],
    createdAt: "2023-04-02T11:00:00Z",
    createdBy: "user-1",
    lastMessage: {
      id: "msg-7",
      groupId: "group-1",
      content: "Let's finalize the design by tomorrow",
      createdAt: "2023-04-15T16:45:00Z",
      senderId: "user-3"
    },
    unreadCount: 2
  },
  {
    id: "group-2",
    name: "Project X",
    members: ["user-1", "user-2", "user-3"],
    createdAt: "2023-05-15T13:00:00Z",
    createdBy: "user-2",
    unreadCount: 0,
    isPinned: false,
  }
];

// Mock Team Members data
export const mockTeamMembers: TeamMember[] = [
  {
    id: "user-1",
    name: "John Doe",
    avatar: "/avatar-1.png",
    status: "online"
  },
  {
    id: "user-2",
    name: "Jane Smith",
    status: "away"
  },
  {
    id: "user-3",
    name: "Michael Johnson",
    avatar: "/avatar-3.png",
    status: "offline"
  }
];

// Mock Messages data
export const mockMessages: TeamMessage[] = [
  {
    id: "msg-1",
    channelId: "channel-1",
    content: "Has anyone seen the new product demo?",
    createdAt: "2023-04-15T14:30:00Z",
    senderId: "user-2",
    isPinned: true
  },
  {
    id: "msg-2",
    channelId: "channel-1",
    content: "Thanks for setting this up! I think this will really improve our communication.",
    createdAt: "2023-05-15T14:05:00Z",
    senderId: "user-2",
    reactions: [
      { emoji: "👍", count: 1, users: ["user-1"] }
    ]
  },
  {
    id: "msg-3",
    channelId: "channel-1",
    content: "I've shared some documents for the upcoming meeting. Please take a look when you get a chance.",
    createdAt: "2023-05-15T14:10:00Z",
    senderId: "user-3",
    isPinned: true,
    attachments: [
      {
        id: "attach-1",
        name: "meeting-agenda.pdf",
        url: "/attachments/meeting-agenda.pdf",
        type: "application/pdf",
        size: 2500000,
        createdAt: "2023-05-15T14:10:00Z"
      }
    ]
  },
  {
    id: "msg-4",
    channelId: "channel-1",
    content: "Just a reminder that we have a team meeting tomorrow at 10 AM.",
    createdAt: "2023-05-15T16:00:00Z",
    senderId: "user-1",
    mentions: ["user-2", "user-3"]
  }
];
