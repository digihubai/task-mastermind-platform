
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Globe, Search, AlertCircle, Info, Copy, Download, Upload, FileText, Languages, Settings2, Euro, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LocalizationTab: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("languages");
  const [searchQuery, setSearchQuery] = useState("");
  const [baseLanguage, setBaseLanguage] = useState("en-US");
  
  // Mock data for languages
  const [languages, setLanguages] = useState([
    { code: "en-US", name: "English (US)", enabled: true, translated: 100, isBase: true },
    { code: "es-ES", name: "Spanish (Spain)", enabled: true, translated: 95 },
    { code: "fr-FR", name: "French (France)", enabled: true, translated: 92 },
    { code: "de-DE", name: "German", enabled: true, translated: 88 },
    { code: "it-IT", name: "Italian", enabled: true, translated: 85 },
    { code: "pt-BR", name: "Portuguese (Brazil)", enabled: true, translated: 83 },
    { code: "ja-JP", name: "Japanese", enabled: false, translated: 62 },
    { code: "zh-CN", name: "Chinese (Simplified)", enabled: false, translated: 58 },
    { code: "ru-RU", name: "Russian", enabled: false, translated: 54 },
    { code: "ar-SA", name: "Arabic", enabled: false, translated: 48 },
    { code: "hi-IN", name: "Hindi", enabled: false, translated: 42 },
    { code: "nl-NL", name: "Dutch", enabled: false, translated: 78 },
    { code: "sv-SE", name: "Swedish", enabled: false, translated: 72 },
    { code: "pl-PL", name: "Polish", enabled: false, translated: 68 },
    { code: "tr-TR", name: "Turkish", enabled: false, translated: 65 },
    { code: "ko-KR", name: "Korean", enabled: false, translated: 52 },
  ]);
  
  // Tax systems mock data
  const [taxSystems, setTaxSystems] = useState([
    {
      country: "United States",
      code: "US",
      enabled: true,
      taxName: "Sales Tax",
      rate: 0,
      hasRegionalRates: true,
      hasDigitalServicesTax: false,
      needsEIN: true,
      isCurrencyDefault: true
    },
    {
      country: "European Union",
      code: "EU",
      enabled: true,
      taxName: "VAT",
      rate: 0,
      hasRegionalRates: true,
      hasDigitalServicesTax: true,
      needsVAT: true,
      isOSS: true,
      isCurrencyDefault: false
    },
    {
      country: "United Kingdom",
      code: "GB",
      enabled: true,
      taxName: "VAT",
      rate: 20,
      hasRegionalRates: false,
      hasDigitalServicesTax: true,
      needsVAT: true,
      isCurrencyDefault: false
    },
    {
      country: "Canada",
      code: "CA",
      enabled: true,
      taxName: "GST/HST",
      rate: 5,
      hasRegionalRates: true,
      hasDigitalServicesTax: false,
      needsBusinessNumber: true,
      isCurrencyDefault: false
    },
    {
      country: "Australia",
      code: "AU",
      enabled: true,
      taxName: "GST",
      rate: 10,
      hasRegionalRates: false,
      hasDigitalServicesTax: false,
      needsABN: true,
      isCurrencyDefault: false
    },
    {
      country: "Spain",
      code: "ES",
      enabled: true,
      taxName: "IVA",
      rate: 21,
      hasRegionalRates: false,
      hasDigitalServicesTax: true,
      needsNIF: true,
      requiresInvoice: true,
      isCurrencyDefault: false
    },
    {
      country: "Japan",
      code: "JP",
      enabled: false,
      taxName: "Consumption Tax",
      rate: 10,
      hasRegionalRates: false,
      hasDigitalServicesTax: false,
      isCurrencyDefault: false
    },
    {
      country: "Mexico",
      code: "MX",
      enabled: false,
      taxName: "IVA",
      rate: 16,
      hasRegionalRates: false,
      hasDigitalServicesTax: false,
      requiresInvoice: true,
      needsRFC: true,
      isCurrencyDefault: false
    },
    {
      country: "Brazil",
      code: "BR",
      enabled: false,
      taxName: "ICMS",
      rate: 17,
      hasRegionalRates: true,
      hasDigitalServicesTax: false,
      needsCNPJ: true,
      isCurrencyDefault: false
    },
    {
      country: "India",
      code: "IN",
      enabled: false,
      taxName: "GST",
      rate: 18,
      hasRegionalRates: true,
      hasDigitalServicesTax: true,
      needsGSTIN: true,
      isCurrencyDefault: false
    },
  ]);
  
  // Currencies mock data
  const [currencies, setCurrencies] = useState([
    { code: "USD", name: "US Dollar", symbol: "$", enabled: true, isDefault: true },
    { code: "EUR", name: "Euro", symbol: "€", enabled: true },
    { code: "GBP", name: "British Pound", symbol: "£", enabled: true },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$", enabled: true },
    { code: "AUD", name: "Australian Dollar", symbol: "A$", enabled: true },
    { code: "JPY", name: "Japanese Yen", symbol: "¥", enabled: false },
    { code: "INR", name: "Indian Rupee", symbol: "₹", enabled: false },
    { code: "BRL", name: "Brazilian Real", symbol: "R$", enabled: false },
    { code: "MXN", name: "Mexican Peso", symbol: "Mex$", enabled: false },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥", enabled: false },
  ]);

  const handleToggleLanguage = (languageCode: string) => {
    setLanguages(prev => 
      prev.map(language => 
        language.code === languageCode 
          ? { ...language, enabled: !language.enabled } 
          : language
      )
    );
    
    const language = languages.find(lang => lang.code === languageCode);
    toast({
      title: language?.enabled ? "Language Disabled" : "Language Enabled",
      description: `${language?.name} has been ${language?.enabled ? "disabled" : "enabled"} for your platform.`,
    });
  };

  const handleSetBaseLanguage = (languageCode: string) => {
    setBaseLanguage(languageCode);
    setLanguages(prev =>
      prev.map(language => ({
        ...language,
        isBase: language.code === languageCode
      }))
    );
    
    const language = languages.find(lang => lang.code === languageCode);
    toast({
      title: "Base Language Changed",
      description: `${language?.name} is now the base language for all translations.`,
    });
  };

  const handleToggleTaxSystem = (countryCode: string) => {
    setTaxSystems(prev => 
      prev.map(system => 
        system.code === countryCode 
          ? { ...system, enabled: !system.enabled } 
          : system
      )
    );
    
    const system = taxSystems.find(tax => tax.code === countryCode);
    toast({
      title: system?.enabled ? "Tax System Disabled" : "Tax System Enabled",
      description: `${system?.country} tax system has been ${system?.enabled ? "disabled" : "enabled"}.`,
    });
  };

  const handleToggleCurrency = (currencyCode: string) => {
    setCurrencies(prev => 
      prev.map(currency => 
        currency.code === currencyCode 
          ? { ...currency, enabled: !currency.enabled } 
          : currency
      )
    );
    
    const currency = currencies.find(curr => curr.code === currencyCode);
    toast({
      title: currency?.enabled ? "Currency Disabled" : "Currency Enabled",
      description: `${currency?.name} has been ${currency?.enabled ? "disabled" : "enabled"} for your platform.`,
    });
  };

  const handleSetDefaultCurrency = (currencyCode: string) => {
    setCurrencies(prev =>
      prev.map(currency => ({
        ...currency,
        isDefault: currency.code === currencyCode
      }))
    );
    
    const currency = currencies.find(curr => curr.code === currencyCode);
    toast({
      title: "Default Currency Changed",
      description: `${currency?.name} is now the default currency for your platform.`,
    });
  };

  const handleExportLanguage = (languageCode: string) => {
    toast({
      title: "Translations Exported",
      description: `Translation file for ${languages.find(lang => lang.code === languageCode)?.name} has been exported.`,
    });
  };

  const handleImportLanguage = (languageCode: string) => {
    toast({
      title: "Translations Imported",
      description: `Translation file for ${languages.find(lang => lang.code === languageCode)?.name} has been imported.`,
    });
  };

  const filteredLanguages = languages.filter(language =>
    language.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    language.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTaxSystems = taxSystems.filter(system =>
    system.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    system.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    system.taxName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCurrencies = currencies.filter(currency =>
    currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currency.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="border border-border/40">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold">Localization & Internationalization</h2>
            <p className="text-muted-foreground mt-1">
              Manage languages, currencies, and tax systems for your platform
            </p>
          </div>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Search..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="languages" className="flex items-center gap-2">
              <Languages size={16} />
              <span>Languages</span>
            </TabsTrigger>
            <TabsTrigger value="taxes" className="flex items-center gap-2">
              <FileText size={16} />
              <span>Tax Systems</span>
            </TabsTrigger>
            <TabsTrigger value="currencies" className="flex items-center gap-2">
              <DollarSign size={16} />
              <span>Currencies</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="languages" className="mt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe size={18} />
                  <h3 className="font-medium">Available Languages</h3>
                </div>
                
                <Button size="sm">
                  Add New Language
                </Button>
              </div>
              
              <div className="bg-muted/40 p-3 rounded-lg mb-3">
                <div className="flex items-center gap-1 text-sm">
                  <Info size={14} className="text-blue-500" />
                  <span>
                    Base language serves as the reference for all translations. Ensure it's completely translated before setting it as base.
                  </span>
                </div>
              </div>
              
              <ScrollArea className="h-[450px]">
                <div className="space-y-3">
                  {filteredLanguages.map((language) => (
                    <div 
                      key={language.code} 
                      className={`p-4 border rounded-lg ${
                        language.isBase ? 'bg-primary/5 border-primary/20' : ''
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{language.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {language.code}
                            </Badge>
                            {language.isBase && (
                              <Badge className="text-xs bg-primary">
                                Base Language
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 mt-1">
                            <div className="h-2 bg-muted w-32 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${
                                  language.translated > 90 ? 'bg-green-500' :
                                  language.translated > 70 ? 'bg-yellow-500' :
                                  'bg-amber-500'
                                }`}
                                style={{ width: `${language.translated}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {language.translated}% translated
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1.5"
                            onClick={() => handleExportLanguage(language.code)}
                          >
                            <Download size={14} />
                            <span>Export</span>
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1.5"
                            onClick={() => handleImportLanguage(language.code)}
                          >
                            <Upload size={14} />
                            <span>Import</span>
                          </Button>
                          
                          {!language.isBase && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1.5"
                              onClick={() => handleSetBaseLanguage(language.code)}
                            >
                              <Check size={14} />
                              <span>Set as Base</span>
                            </Button>
                          )}
                          
                          <div className="flex items-center gap-2 pl-2">
                            <Label htmlFor={`lang-${language.code}`} className="text-sm">
                              {language.enabled ? 'Enabled' : 'Disabled'}
                            </Label>
                            <Switch
                              id={`lang-${language.code}`}
                              checked={language.enabled}
                              onCheckedChange={() => handleToggleLanguage(language.code)}
                              disabled={language.isBase}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
          
          <TabsContent value="taxes" className="mt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText size={18} />
                  <h3 className="font-medium">Tax Systems</h3>
                </div>
                
                <Button size="sm">
                  Configure Custom Tax
                </Button>
              </div>
              
              <div className="bg-muted/40 p-3 rounded-lg mb-3">
                <div className="flex items-center gap-1 text-sm">
                  <AlertCircle size={14} className="text-yellow-500" />
                  <span>
                    Enabling a tax system will apply its rules to customers from that region. Make sure your tax settings comply with local regulations.
                  </span>
                </div>
              </div>
              
              <ScrollArea className="h-[450px]">
                <div className="space-y-3">
                  {filteredTaxSystems.map((system) => (
                    <div key={system.code} className="p-4 border rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{system.country}</span>
                            <Badge variant="outline" className="text-xs">
                              {system.code}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-muted-foreground">
                            <span>{system.taxName}: {system.rate > 0 ? `${system.rate}%` : 'Variable Rates'}</span>
                            
                            {system.hasRegionalRates && (
                              <span className="flex items-center gap-1">
                                <Settings2 size={12} />
                                Regional rates apply
                              </span>
                            )}
                            
                            {system.hasDigitalServicesTax && (
                              <span className="flex items-center gap-1">
                                <Info size={12} />
                                Digital services tax
                              </span>
                            )}
                            
                            {system.requiresInvoice && (
                              <span className="flex items-center gap-1 text-amber-500">
                                <AlertCircle size={12} />
                                Requires specific invoice format
                              </span>
                            )}
                          </div>
                          
                          {(system.needsVAT || system.needsEIN || system.needsBusinessNumber || 
                            system.needsABN || system.needsNIF || system.needsRFC || 
                            system.needsCNPJ || system.needsGSTIN) && (
                            <div className="mt-1 flex items-center gap-1 text-xs text-blue-500">
                              <Info size={12} />
                              <span>
                                Required: {
                                  system.needsVAT ? 'VAT Number' :
                                  system.needsEIN ? 'EIN' :
                                  system.needsBusinessNumber ? 'Business Number' :
                                  system.needsABN ? 'ABN' :
                                  system.needsNIF ? 'NIF' :
                                  system.needsRFC ? 'RFC' :
                                  system.needsCNPJ ? 'CNPJ' :
                                  system.needsGSTIN ? 'GSTIN' : ''
                                }
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1.5"
                          >
                            <Settings2 size={14} />
                            <span>Configure</span>
                          </Button>
                          
                          <div className="flex items-center gap-2 pl-2">
                            <Label htmlFor={`tax-${system.code}`} className="text-sm">
                              {system.enabled ? 'Enabled' : 'Disabled'}
                            </Label>
                            <Switch
                              id={`tax-${system.code}`}
                              checked={system.enabled}
                              onCheckedChange={() => handleToggleTaxSystem(system.code)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
          
          <TabsContent value="currencies" className="mt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign size={18} />
                  <h3 className="font-medium">Currencies</h3>
                </div>
                
                <Button size="sm">
                  Add Currency
                </Button>
              </div>
              
              <div className="bg-muted/40 p-3 rounded-lg mb-3">
                <div className="flex items-center gap-1 text-sm">
                  <Info size={14} className="text-blue-500" />
                  <span>
                    Default currency is used for platform-wide calculations. Exchange rates are updated daily.
                  </span>
                </div>
              </div>
              
              <ScrollArea className="h-[450px]">
                <div className="space-y-3">
                  {filteredCurrencies.map((currency) => (
                    <div 
                      key={currency.code} 
                      className={`p-4 border rounded-lg ${
                        currency.isDefault ? 'bg-primary/5 border-primary/20' : ''
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-medium">
                              {currency.symbol}
                            </div>
                            <div>
                              <span className="font-medium">{currency.name}</span>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {currency.code}
                                </Badge>
                                {currency.isDefault && (
                                  <Badge className="text-xs bg-primary">
                                    Default
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {!currency.isDefault && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1.5"
                              onClick={() => handleSetDefaultCurrency(currency.code)}
                            >
                              <Check size={14} />
                              <span>Set as Default</span>
                            </Button>
                          )}
                          
                          <div className="flex items-center gap-2 pl-2">
                            <Label htmlFor={`curr-${currency.code}`} className="text-sm">
                              {currency.enabled ? 'Enabled' : 'Disabled'}
                            </Label>
                            <Switch
                              id={`curr-${currency.code}`}
                              checked={currency.enabled}
                              onCheckedChange={() => handleToggleCurrency(currency.code)}
                              disabled={currency.isDefault}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LocalizationTab;
