"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useSettings } from "@/hooks/use-settings";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProModal } from "@/hooks/use-pro-modal";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/clerk-react";

const formSchema = z.object({
  aiProvider: z.string().min(2, {
    message: "AI Provider must be at least 2 characters.",
  }),
  apiKey: z.string().min(2, {
    message: "API Key must be at least 2 characters.",
  }),
  apiUrl: z.string().optional(),
  modelName: z.string().optional(),
  embeddingProvider: z.string().optional(),
  embeddingKey: z.string().optional(),
  embeddingUrl: z.string().optional(),
  embeddingModelName: z.string().optional(),
  isAzure: z.boolean().default(false).optional(),
});

export const AIModelsTab = () => {
  const settings = useSettings();
  const proModal = useProModal();
  const { user } = useUser();

  const [isApiKeyValid, setIsApiKeyValid] = useState(true);
  const [isEmbeddingKeyValid, setIsEmbeddingKeyValid] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedEmbeddingProvider, setSelectedEmbeddingProvider] =
    useState("");
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const aiProviders = useQuery(api.ai_providers.getAIProviders);
  const embeddingProviders = useQuery(api.ai_providers.getEmbeddingProviders);

  const initialData = useQuery(api.ai_providers.getSettings, {
    orgId: settings?.orgId || "",
  });

  const updateSettings = useMutation(api.ai_providers.updateSettings);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aiProvider: initialData?.aiProvider || "",
      apiKey: initialData?.apiKey || "",
      apiUrl: initialData?.apiUrl || "",
      modelName: initialData?.modelName || "",
      embeddingProvider: initialData?.embeddingProvider || "",
      embeddingKey: initialData?.embeddingKey || "",
      embeddingUrl: initialData?.embeddingUrl || "",
      embeddingModelName: initialData?.embeddingModelName || "",
      isAzure: initialData?.isAzure || false,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
      setSelectedProvider(initialData.aiProvider);
      setSelectedEmbeddingProvider(initialData.embeddingProvider);
    }
  }, [initialData, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!settings?.orgId) {
      return toast({
        title: "Missing organization ID",
        description: "Please create an organization to continue.",
      });
    }

    if (!user?.id) {
      return toast({
        title: "Missing user ID",
        description: "Please sign in to continue.",
      });
    }

    try {
      await updateSettings.mutate({
        orgId: settings.orgId,
        userId: user.id,
        aiProvider: values.aiProvider,
        apiKey: values.apiKey,
        apiUrl: values.apiUrl,
        modelName: values.modelName,
        embeddingProvider: values.embeddingProvider,
        embeddingKey: values.embeddingKey,
        embeddingUrl: values.embeddingUrl,
        embeddingModelName: values.embeddingModelName,
        isAzure: values.isAzure,
      });
      toast({
        title: "Success!",
        description: "Settings updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings.",
      });
    }
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue("apiKey", e.target.value);
    setIsApiKeyValid(true);
  };

  const handleEmbeddingKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue("embeddingKey", e.target.value);
    setIsEmbeddingKeyValid(true);
  };

  const isPro = settings?.plan === "pro";

  return (
    <ScrollArea>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">AI Models</h3>
          <p className="text-sm text-muted-foreground">
            Configure the AI models for your organization.
          </p>
        </div>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="aiProvider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AI Provider</FormLabel>
                  <Select
                    disabled={!isPro}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedProvider(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select an AI provider"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {aiProviders === undefined ? (
                        <Skeleton className="h-10 w-40" />
                      ) : aiProviders === null ? (
                        <SelectItem value="none">
                          No AI Providers Available
                        </SelectItem>
                      ) : (
                        aiProviders.map((provider) => (
                          <SelectItem
                            key={provider.id}
                            value={provider.name}
                          >
                            {provider.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the AI provider you want to use.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    <Input
                      disabled={!isPro}
                      type="password"
                      onChange={handleApiKeyChange}
                      placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your API key for the selected AI provider.
                  </FormDescription>
                  {!isApiKeyValid && (
                    <p className="text-xs text-red-500 mt-2">
                      Please enter a valid API key.
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedProvider === "Azure" && (
              <FormField
                control={form.control}
                name="isAzure"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Is Azure?</FormLabel>
                      <FormDescription>
                        Enable this if you are using Azure OpenAI.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="embeddingProvider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Embedding Provider</FormLabel>
                  <Select
                    disabled={!isPro}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedEmbeddingProvider(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select an embedding provider"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {embeddingProviders === undefined ? (
                        <Skeleton className="h-10 w-40" />
                      ) : embeddingProviders === null ? (
                        <SelectItem value="none">
                          No Embedding Providers Available
                        </SelectItem>
                      ) : (
                        embeddingProviders.map((provider) => (
                          <SelectItem
                            key={provider.id}
                            value={provider.name}
                          >
                            {provider.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the embedding provider you want to use.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="embeddingKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Embedding API Key</FormLabel>
                  <FormControl>
                    <Input
                      disabled={!isPro}
                      type="password"
                      onChange={handleEmbeddingKeyChange}
                      placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your API key for the selected embedding provider.
                  </FormDescription>
                  {!isEmbeddingKeyValid && (
                    <p className="text-xs text-red-500 mt-2">
                      Please enter a valid API key.
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Accordion type="single" collapsible>
              <AccordionItem value="advanced">
                <AccordionTrigger onClick={() => setShowAdvancedOptions((prev) => !prev)}>
                  Advanced Options
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="apiUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API URL</FormLabel>
                          <FormControl>
                            <Input
                              disabled={!isPro}
                              placeholder="https://api.openai.com/v1"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter the API URL for the selected AI provider.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="modelName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Model Name</FormLabel>
                          <FormControl>
                            <Input
                              disabled={!isPro}
                              placeholder="gpt-3.5-turbo"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter the model name for the selected AI provider.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="embeddingUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Embedding API URL</FormLabel>
                          <FormControl>
                            <Input
                              disabled={!isPro}
                              placeholder="https://api.openai.com/v1"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter the API URL for the selected embedding
                            provider.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="embeddingModelName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Embedding Model Name</FormLabel>
                          <FormControl>
                            <Input
                              disabled={!isPro}
                              placeholder="text-embedding-ada-002"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Enter the model name for the selected embedding
                            provider.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {!isPro && (
              <p className="text-muted-foreground">
                Upgrade to the Pro plan to configure AI Models.{" "}
                <Button onClick={() => proModal.onOpen()}>Upgrade</Button>
              </p>
            )}
            <div className="flex justify-end">
              <Button
                disabled={!isPro || form.formState.isSubmitting}
                type="submit"
              >
                Save changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ScrollArea>
  );
};
