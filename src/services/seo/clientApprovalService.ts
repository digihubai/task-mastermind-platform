
import { ContentApproval, ContentComment } from './types';

/**
 * Creates a new content piece for client approval
 */
export const createContentForApproval = async (
  title: string,
  contentType: "blog" | "page" | "product" | "seo",
  content: string,
  clientId: string
): Promise<ContentApproval> => {
  // This would save to database in production
  const approval: ContentApproval = {
    id: `content_${Date.now()}`,
    title,
    contentType,
    status: "draft",
    content,
    clientId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    comments: []
  };
  
  return approval;
};

/**
 * Update content status in the approval workflow
 */
export const updateContentStatus = async (
  contentId: string,
  status: "draft" | "pending_approval" | "approved" | "rejected" | "published"
): Promise<ContentApproval> => {
  // This would update database in production
  console.log(`Updating content ${contentId} to status ${status}`);
  
  // Mock content approval object
  const approval: ContentApproval = {
    id: contentId,
    title: "Sample Content",
    contentType: "blog",
    status: status,
    content: "This is sample content...",
    clientId: "client123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    comments: []
  };
  
  return approval;
};

/**
 * Add a comment to content in approval workflow
 */
export const addContentComment = async (
  contentId: string,
  userId: string,
  userName: string,
  userRole: "admin" | "client" | "editor",
  comment: string
): Promise<ContentComment> => {
  const newComment: ContentComment = {
    id: `comment_${Date.now()}`,
    contentId,
    userId,
    userName,
    userRole,
    comment,
    timestamp: new Date().toISOString()
  };
  
  // This would save to database in production
  
  return newComment;
};

/**
 * Get all content pieces for a specific client
 */
export const getClientContent = async (clientId: string): Promise<ContentApproval[]> => {
  // This would fetch from database in production
  
  // Return mock data
  return [
    {
      id: "content_123",
      title: "How to Improve Your SEO in 2023",
      contentType: "blog",
      status: "pending_approval",
      content: "This is a comprehensive guide on improving SEO...",
      clientId,
      createdAt: "2023-11-15T10:30:00Z",
      updatedAt: "2023-11-15T14:45:00Z",
      comments: [
        {
          id: "comment_1",
          contentId: "content_123",
          userId: "user_admin",
          userName: "Admin User",
          userRole: "admin",
          comment: "Please review this draft and provide feedback",
          timestamp: "2023-11-15T14:45:00Z"
        }
      ]
    },
    {
      id: "content_124",
      title: "Content Marketing Strategy for E-commerce",
      contentType: "seo",
      status: "approved",
      content: "This content marketing strategy focuses on...",
      clientId,
      createdAt: "2023-11-10T09:20:00Z",
      updatedAt: "2023-11-14T16:30:00Z",
      comments: [
        {
          id: "comment_2",
          contentId: "content_124",
          userId: "client_user",
          userName: "Client User",
          userRole: "client",
          comment: "Looks good! Ready for publishing.",
          timestamp: "2023-11-14T16:30:00Z"
        }
      ]
    }
  ];
};

/**
 * Get content revision history
 */
export const getContentRevisions = async (contentId: string): Promise<any[]> => {
  // This would fetch revision history from database in production
  return [
    {
      revisionId: "rev_1",
      contentId,
      timestamp: "2023-11-10T09:20:00Z",
      editor: "Admin User",
      changes: "Initial draft"
    },
    {
      revisionId: "rev_2",
      contentId,
      timestamp: "2023-11-12T14:30:00Z",
      editor: "Editor User",
      changes: "Added keyword optimization"
    },
    {
      revisionId: "rev_3",
      contentId,
      timestamp: "2023-11-14T11:15:00Z",
      editor: "Admin User",
      changes: "Applied client feedback"
    }
  ];
};
