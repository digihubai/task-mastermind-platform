
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("signin");
  const navigate = useNavigate();
  
  const handleAuthSuccess = () => {
    navigate("/analytics/dashboard");
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/40">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">DigiHub</h1>
          <p className="text-muted-foreground mt-2">AI-powered business platform</p>
        </div>
        
        <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <SignInForm 
              onSuccess={handleAuthSuccess} 
              onSignUpClick={() => setActiveTab("signup")} 
            />
          </TabsContent>
          
          <TabsContent value="signup">
            <SignUpForm 
              onSuccess={handleAuthSuccess} 
              onSignInClick={() => setActiveTab("signin")} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;
