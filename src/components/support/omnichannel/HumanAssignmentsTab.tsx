
import React from 'react';
import { Conversation } from '@/types/omnichannel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserCog } from 'lucide-react';

interface HumanAssignmentsTabProps {
  conversations: Conversation[];
  onTakeOverConversation: (conversationId: string) => void;
}

const HumanAssignmentsTab: React.FC<HumanAssignmentsTabProps> = ({ 
  conversations, 
  onTakeOverConversation 
}) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <UserCog className="h-5 w-5 mr-2" />
          Human Agent Assignments
        </CardTitle>
      </CardHeader>
      <CardContent>
        {conversations.length > 0 ? (
          <div className="space-y-4">
            {conversations.map(conv => (
              <Card key={conv.id} className={`p-4 border-l-4 ${
                conv.assignmentStatus === 'assigned_to_human' 
                  ? 'border-l-green-500' 
                  : 'border-l-amber-500'
              }`}>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-medium flex items-center gap-2">
                        {conv.name}
                        <Badge variant="outline" className="text-xs">
                          {conv.channel}
                        </Badge>
                      </h3>
                      <p className="text-sm text-muted-foreground">{conv.message}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 items-center">
                      {conv.assignmentStatus === 'waiting_for_human' ? (
                        <Badge variant="outline" className="text-xs bg-amber-50 text-amber-800">
                          Waiting for human
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-800">
                          Assigned to {conv.assignedHumanAgent || 'human'}
                        </Badge>
                      )}
                      
                      {conv.assignedHumanAgent && (
                        <span className="text-xs bg-slate-100 px-2 py-1 rounded-md">
                          Agent: <span className="font-medium">{conv.assignedHumanAgent}</span>
                        </span>
                      )}
                      
                      {conv.assignedToHumanAt && (
                        <span className="text-xs text-slate-500">
                          Assigned {new Date(conv.assignedToHumanAt).toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Button 
                      size="sm" 
                      onClick={() => onTakeOverConversation(conv.id)}
                      disabled={conv.assignmentStatus === 'assigned_to_human' && conv.assignedHumanAgent === 'Current User'}
                    >
                      {conv.assignmentStatus === 'assigned_to_human' && conv.assignedHumanAgent === 'Current User'
                        ? 'Currently Handling'
                        : 'Take Over'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <UserCog className="h-10 w-10 mx-auto mb-3 opacity-20" />
            <p>No conversations currently assigned to human agents</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HumanAssignmentsTab;
