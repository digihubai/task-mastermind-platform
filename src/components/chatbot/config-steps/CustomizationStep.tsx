
import React from "react";
import { HexColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CustomizationStepProps {
  chatbotInfo: {
    title: string;
    bubbleMessage: string;
    welcomeMessage: string;
    instructions: string;
    language: string;
    showLogo: boolean;
    showDateTime: boolean;
    transparentTrigger: boolean;
    triggerSize: number;
    position: "left" | "right";
    color: string;
    avatar: string;
    footerLink: string;
  };
  setNewChatbotInfo: (info: any) => void;
}

export const CustomizationStep: React.FC<CustomizationStepProps> = ({
  chatbotInfo,
  setNewChatbotInfo,
}) => {
  const handleColorChange = (color: string) => {
    setNewChatbotInfo({
      ...chatbotInfo,
      color,
    });
  };

  const handlePositionChange = (position: "left" | "right") => {
    setNewChatbotInfo({
      ...chatbotInfo,
      position,
    });
  };

  const handleSwitchChange = (key: string, value: boolean) => {
    setNewChatbotInfo({
      ...chatbotInfo,
      [key]: value,
    });
  };

  const handleSliderChange = (value: number[]) => {
    setNewChatbotInfo({
      ...chatbotInfo,
      triggerSize: value[0],
    });
  };

  const handleAvatarChange = (avatar: string) => {
    setNewChatbotInfo({
      ...chatbotInfo,
      avatar,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Customize Your Chatbot</h2>
      <p className="text-muted-foreground">
        Personalize the appearance and behavior of your chatbot.
      </p>

      <Tabs defaultValue="appearance" className="mt-6">
        <TabsList className="mb-4 grid w-full grid-cols-3">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="bubble">Chat Bubble</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance" className="space-y-4">
          <div>
            <Label>Accent Color</Label>
            <div className="flex items-center gap-4 mt-1.5">
              <Popover>
                <PopoverTrigger>
                  <div
                    className="w-8 h-8 rounded-full border cursor-pointer"
                    style={{ backgroundColor: chatbotInfo.color }}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <HexColorPicker
                    color={chatbotInfo.color}
                    onChange={handleColorChange}
                  />
                </PopoverContent>
              </Popover>
              <Input
                value={chatbotInfo.color}
                onChange={(e) =>
                  handleColorChange(e.target.value)
                }
                className="w-32"
              />
            </div>
          </div>

          <div>
            <Label>Avatar Style</Label>
            <div className="grid grid-cols-5 gap-3 mt-1.5">
              {['avatar1', 'avatar2', 'avatar3', 'avatar4', 'avatar5'].map((avatar) => (
                <div
                  key={avatar}
                  className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                    chatbotInfo.avatar === avatar
                      ? 'ring-2 ring-offset-2 ring-primary'
                      : 'hover:scale-110'
                  }`}
                  style={{
                    backgroundColor:
                      avatar === 'avatar1'
                        ? '#2196F3'
                        : avatar === 'avatar2'
                        ? '#9C27B0'
                        : avatar === 'avatar3'
                        ? '#4CAF50'
                        : avatar === 'avatar4'
                        ? '#FF9800'
                        : '#00BCD4',
                  }}
                  onClick={() => handleAvatarChange(avatar)}
                >
                  <span className="text-white text-xs">{avatar.slice(-1)}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Show Branding</Label>
            <div className="flex items-center gap-2 mt-1.5">
              <Switch
                checked={chatbotInfo.showLogo}
                onCheckedChange={(checked) =>
                  handleSwitchChange('showLogo', checked)
                }
              />
              <span className="text-sm">
                Show "Powered by DigiHub AI" in the chat
              </span>
            </div>
          </div>

          <div>
            <Label>Show Date & Time</Label>
            <div className="flex items-center gap-2 mt-1.5">
              <Switch
                checked={chatbotInfo.showDateTime}
                onCheckedChange={(checked) =>
                  handleSwitchChange('showDateTime', checked)
                }
              />
              <span className="text-sm">Display timestamps on messages</span>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="bubble" className="space-y-4">
          <div>
            <Label>Position</Label>
            <div className="grid grid-cols-2 gap-3 mt-1.5">
              <div
                className={`border rounded-md p-3 flex items-center justify-center cursor-pointer ${
                  chatbotInfo.position === 'left'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
                onClick={() => handlePositionChange('left')}
              >
                <span>Left</span>
              </div>
              <div
                className={`border rounded-md p-3 flex items-center justify-center cursor-pointer ${
                  chatbotInfo.position === 'right'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
                onClick={() => handlePositionChange('right')}
              >
                <span>Right</span>
              </div>
            </div>
          </div>

          <div>
            <Label>Bubble Size: {chatbotInfo.triggerSize}px</Label>
            <div className="mt-1.5">
              <Slider
                value={[chatbotInfo.triggerSize]}
                min={40}
                max={80}
                step={4}
                onValueChange={handleSliderChange}
              />
            </div>
          </div>

          <div>
            <Label>Transparent Background</Label>
            <div className="flex items-center gap-2 mt-1.5">
              <Switch
                checked={chatbotInfo.transparentTrigger}
                onCheckedChange={(checked) =>
                  handleSwitchChange('transparentTrigger', checked)
                }
              />
              <span className="text-sm">
                Use transparent background for chat bubble
              </span>
            </div>
          </div>

          <div>
            <Label>Bubble Message</Label>
            <Input
              className="mt-1.5"
              value={chatbotInfo.bubbleMessage}
              onChange={(e) =>
                setNewChatbotInfo({
                  ...chatbotInfo,
                  bubbleMessage: e.target.value,
                })
              }
              placeholder="Hey there, how can I help you?"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="behavior" className="space-y-4">
          <div>
            <Label>Welcome Message</Label>
            <Input
              className="mt-1.5"
              value={chatbotInfo.welcomeMessage}
              onChange={(e) =>
                setNewChatbotInfo({
                  ...chatbotInfo,
                  welcomeMessage: e.target.value,
                })
              }
              placeholder="Hi, how can I help you?"
            />
          </div>

          <div>
            <Label>Language</Label>
            <select
              className="w-full p-2 border rounded-md mt-1.5"
              value={chatbotInfo.language}
              onChange={(e) =>
                setNewChatbotInfo({
                  ...chatbotInfo,
                  language: e.target.value,
                })
              }
            >
              <option value="auto">Auto-detect</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
              <option value="pt">Portuguese</option>
              <option value="ru">Russian</option>
              <option value="zh">Chinese</option>
              <option value="ja">Japanese</option>
              <option value="ko">Korean</option>
            </select>
          </div>

          <div>
            <Label>Footer Link</Label>
            <Input
              className="mt-1.5"
              value={chatbotInfo.footerLink}
              onChange={(e) =>
                setNewChatbotInfo({
                  ...chatbotInfo,
                  footerLink: e.target.value,
                })
              }
              placeholder="https://yourdomain.com"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
