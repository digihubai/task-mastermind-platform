
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";

// Import refactored components
import ConversationList from "@/components/vision/ConversationList";
import VisionUploader from "@/components/vision/VisionUploader";
import VisionChatHeader from "@/components/vision/VisionChatHeader";
import QuickPrompts from "@/components/vision/QuickPrompts";
import MessageInput from "@/components/vision/MessageInput";
import VisionBackButton from "@/components/vision/VisionBackButton";
import VisionTabs from "@/components/vision/VisionTabs";

const AIVisionPage = () => {
  const { toast } = useToast();
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [conversations, setConversations] = useState([
    { id: "1", name: "VisionAI Chat", timestamp: "1 week ago" }
  ]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [selectedTab, setSelectedTab] = useState("vision");

  const handleImageUpload = (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    toast({
      title: "Image uploaded",
      description: "Your image has been uploaded successfully."
    });
  };

  const handleNewConversation = () => {
    const newConversation = {
      id: Date.now().toString(),
      name: "New Conversation",
      timestamp: "Just now",
    };
    setConversations([newConversation, ...conversations]);
    setActiveConversation(newConversation.id);
    setSelectedImage(null);
    setImagePreview(null);
    setMessage("");
  };

  const handleSendMessage = () => {
    if (message.trim() || selectedImage) {
      toast({
        title: "Processing...",
        description: "Your request is being processed.",
      });
      setMessage("");
    }
  };

  const handleShare = () => {
    toast({
      title: "Shared!",
      description: "Your analysis has been shared successfully.",
    });
  };

  const handleSettings = () => {
    toast({
      title: "Settings",
      description: "Vision AI settings panel will open soon.",
    });
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <AppLayout>
      <div className="space-y-6 pb-8">
        <div className="flex justify-between items-center">
          <VisionBackButton />
          <Button className="gap-2 rounded-full" onClick={handleNewConversation}>
            <Plus size={16} />
            <span>New</span>
          </Button>
        </div>

        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Vision AI</h1>
          <p className="text-muted-foreground mt-1">
            Seamlessly upload any image you want to explore and get insightful conversations.
          </p>
        </div>

        <VisionTabs selectedTab={selectedTab} onTabChange={setSelectedTab}>
          <TabsContent value="vision" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-280px)]">
              <Card className="p-4 col-span-1 h-full overflow-y-auto">
                <ConversationList 
                  conversations={conversations}
                  activeConversation={activeConversation}
                  onSelectConversation={setActiveConversation}
                  onNewConversation={handleNewConversation}
                />
              </Card>

              <Card className="p-4 col-span-3 h-full flex flex-col overflow-hidden">
                <VisionChatHeader 
                  onShare={handleShare}
                  onSettings={handleSettings}
                />

                <div className="flex-1 overflow-y-auto mb-4 flex flex-col">
                  <div className="flex-1 flex flex-col justify-center items-center">
                    <QuickPrompts onSelectPrompt={setMessage} />
                    <VisionUploader 
                      imagePreview={imagePreview}
                      onImageUpload={handleImageUpload}
                      onRemoveImage={handleRemoveImage}
                    />
                  </div>
                </div>

                <MessageInput 
                  message={message}
                  onMessageChange={setMessage}
                  onSendMessage={handleSendMessage}
                  disabled={!message.trim() && !selectedImage}
                />
              </Card>
            </div>
          </TabsContent>
        </VisionTabs>
      </div>
    </AppLayout>
  );
};

export default AIVisionPage;
