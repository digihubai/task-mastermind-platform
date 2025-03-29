import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Check, X } from 'lucide-react';
import { validateAPIKey } from '@/services/ai/contentGenerationAI';

const VisionAIIntegrations = () => {
  const [googleVisionKey, setGoogleVisionKey] = useState('');
  const [azureVisionKey, setAzureVisionKey] = useState('');
  const [awsRekognitionKey, setAwsRekognitionKey] = useState('');
  const [awsRekognitionSecret, setAwsRekognitionSecret] = useState('');
  const [isValidatingGoogle, setIsValidatingGoogle] = useState(false);
  const [isValidatingAzure, setIsValidatingAzure] = useState(false);
  const [isValidatingAws, setIsValidatingAws] = useState(false);
  const [googleValid, setGoogleValid] = useState(false);
  const [azureValid, setAzureValid] = useState(false);
  const [awsValid, setAwsValid] = useState(false);

  const handleSaveGoogleKey = async () => {
    if (!googleVisionKey.trim()) {
      toast.error("Please enter a Google Vision API key");
      return;
    }
    
    setIsValidatingGoogle(true);
    try {
      // Mock validation - in a real app, you'd validate against Google's API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGoogleValid(true);
      toast.success("Google Vision API key saved successfully");
    } catch (error) {
      toast.error("Failed to validate Google Vision API key");
    } finally {
      setIsValidatingGoogle(false);
    }
  };

  const handleSaveAzureKey = async () => {
    if (!azureVisionKey.trim()) {
      toast.error("Please enter an Azure Vision API key");
      return;
    }
    
    setIsValidatingAzure(true);
    try {
      // Mock validation - in a real app, you'd validate against Azure's API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAzureValid(true);
      toast.success("Azure Vision API key saved successfully");
    } catch (error) {
      toast.error("Failed to validate Azure Vision API key");
    } finally {
      setIsValidatingAzure(false);
    }
  };

  const handleSaveAwsKeys = async () => {
    if (!awsRekognitionKey.trim() || !awsRekognitionSecret.trim()) {
      toast.error("Please enter both AWS Access Key and Secret Key");
      return;
    }
    
    setIsValidatingAws(true);
    try {
      // Mock validation - in a real app, you'd validate against AWS's API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAwsValid(true);
      toast.success("AWS Rekognition keys saved successfully");
    } catch (error) {
      toast.error("Failed to validate AWS Rekognition keys");
    } finally {
      setIsValidatingAws(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Vision AI Integrations</CardTitle>
          <CardDescription>
            Configure API keys for image recognition and analysis services
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Google Vision AI */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="google-vision-key">Google Vision AI</Label>
              {googleValid && (
                <div className="flex items-center text-green-500 text-sm">
                  <Check className="h-4 w-4 mr-1" />
                  <span>Validated</span>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Input
                id="google-vision-key"
                type="password"
                value={googleVisionKey}
                onChange={(e) => setGoogleVisionKey(e.target.value)}
                placeholder="Enter Google Vision API key"
                className="flex-1"
              />
              <Button 
                onClick={handleSaveGoogleKey}
                disabled={isValidatingGoogle}
              >
                {isValidatingGoogle ? "Validating..." : "Save"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Used for image recognition, OCR, and content analysis
            </p>
          </div>

          {/* Azure Computer Vision */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="azure-vision-key">Azure Computer Vision</Label>
              {azureValid && (
                <div className="flex items-center text-green-500 text-sm">
                  <Check className="h-4 w-4 mr-1" />
                  <span>Validated</span>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Input
                id="azure-vision-key"
                type="password"
                value={azureVisionKey}
                onChange={(e) => setAzureVisionKey(e.target.value)}
                placeholder="Enter Azure Vision API key"
                className="flex-1"
              />
              <Button 
                onClick={handleSaveAzureKey}
                disabled={isValidatingAzure}
              >
                {isValidatingAzure ? "Validating..." : "Save"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Used for image analysis, face detection, and spatial analysis
            </p>
          </div>

          {/* AWS Rekognition */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="aws-rekognition-key">AWS Rekognition</Label>
              {awsValid && (
                <div className="flex items-center text-green-500 text-sm">
                  <Check className="h-4 w-4 mr-1" />
                  <span>Validated</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
              <Input
                id="aws-rekognition-key"
                type="password"
                value={awsRekognitionKey}
                onChange={(e) => setAwsRekognitionKey(e.target.value)}
                placeholder="AWS Access Key ID"
              />
              <Input
                id="aws-rekognition-secret"
                type="password"
                value={awsRekognitionSecret}
                onChange={(e) => setAwsRekognitionSecret(e.target.value)}
                placeholder="AWS Secret Access Key"
              />
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={handleSaveAwsKeys}
                disabled={isValidatingAws}
              >
                {isValidatingAws ? "Validating..." : "Save"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Used for facial analysis, object and scene detection
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisionAIIntegrations;
