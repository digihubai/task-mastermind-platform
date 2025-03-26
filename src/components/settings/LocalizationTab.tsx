
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, TrashIcon, Pencil, Globe, DollarSign, Percent } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LocalizationTab: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("languages");
  
  // State for Languages
  const [languages, setLanguages] = useState([
    { id: "en", name: "English", code: "en", default: true, enabled: true },
    { id: "es", name: "Spanish", code: "es", default: false, enabled: true },
    { id: "fr", name: "French", code: "fr", default: false, enabled: true },
    { id: "de", name: "German", code: "de", default: false, enabled: false },
    { id: "it", name: "Italian", code: "it", default: false, enabled: false },
    { id: "pt", name: "Portuguese", code: "pt", default: false, enabled: false },
    { id: "ja", name: "Japanese", code: "ja", default: false, enabled: false },
    { id: "zh", name: "Chinese (Simplified)", code: "zh", default: false, enabled: false }
  ]);
  
  // State for Currencies
  const [currencies, setCurrencies] = useState([
    { id: "usd", name: "US Dollar", code: "USD", symbol: "$", default: true, enabled: true },
    { id: "eur", name: "Euro", code: "EUR", symbol: "€", default: false, enabled: true },
    { id: "gbp", name: "British Pound", code: "GBP", symbol: "£", default: false, enabled: true },
    { id: "jpy", name: "Japanese Yen", code: "JPY", symbol: "¥", default: false, enabled: false },
    { id: "cad", name: "Canadian Dollar", code: "CAD", symbol: "CA$", default: false, enabled: false },
    { id: "aud", name: "Australian Dollar", code: "AUD", symbol: "A$", default: false, enabled: false }
  ]);
  
  // State for Tax Rates
  const [taxRates, setTaxRates] = useState([
    { id: "us", country: "United States", rate: 0, type: "Federal", enabled: true },
    { id: "ca", country: "Canada", rate: 5, type: "GST", enabled: true },
    { id: "uk", country: "United Kingdom", rate: 20, type: "VAT", enabled: true },
    { id: "eu", country: "European Union", rate: 21, type: "VAT", enabled: true },
    { id: "au", country: "Australia", rate: 10, type: "GST", enabled: true }
  ]);
  
  const [newLanguage, setNewLanguage] = useState({ name: "", code: "" });
  const [newCurrency, setNewCurrency] = useState({ name: "", code: "", symbol: "" });
  const [newTaxRate, setNewTaxRate] = useState({ country: "", rate: 0, type: "" });
  
  const handleToggleLanguage = (id: string) => {
    setLanguages(prev => 
      prev.map(lang => 
        lang.id === id ? { ...lang, enabled: !lang.enabled } : lang
      )
    );
    
    const lang = languages.find(l => l.id === id);
    toast({
      title: `${lang?.enabled ? "Disabled" : "Enabled"} ${lang?.name}`,
      description: `Language has been ${lang?.enabled ? "disabled" : "enabled"}.`,
    });
  };
  
  const handleSetDefaultLanguage = (id: string) => {
    setLanguages(prev => 
      prev.map(lang => 
        ({ ...lang, default: lang.id === id })
      )
    );
    
    const lang = languages.find(l => l.id === id);
    toast({
      title: `Default Language Updated`,
      description: `${lang?.name} is now the default language.`,
    });
  };
  
  const handleToggleCurrency = (id: string) => {
    setCurrencies(prev => 
      prev.map(curr => 
        curr.id === id ? { ...curr, enabled: !curr.enabled } : curr
      )
    );
    
    const curr = currencies.find(c => c.id === id);
    toast({
      title: `${curr?.enabled ? "Disabled" : "Enabled"} ${curr?.name}`,
      description: `Currency has been ${curr?.enabled ? "disabled" : "enabled"}.`,
    });
  };
  
  const handleSetDefaultCurrency = (id: string) => {
    setCurrencies(prev => 
      prev.map(curr => 
        ({ ...curr, default: curr.id === id })
      )
    );
    
    const curr = currencies.find(c => c.id === id);
    toast({
      title: `Default Currency Updated`,
      description: `${curr?.name} is now the default currency.`,
    });
  };
  
  const handleToggleTaxRate = (id: string) => {
    setTaxRates(prev => 
      prev.map(tax => 
        tax.id === id ? { ...tax, enabled: !tax.enabled } : tax
      )
    );
    
    const tax = taxRates.find(t => t.id === id);
    toast({
      title: `${tax?.enabled ? "Disabled" : "Enabled"} ${tax?.country} Tax`,
      description: `Tax rate has been ${tax?.enabled ? "disabled" : "enabled"}.`,
    });
  };
  
  const addNewLanguage = () => {
    if (!newLanguage.name || !newLanguage.code) return;
    
    const id = newLanguage.code.toLowerCase();
    if (languages.some(l => l.id === id)) {
      toast({
        title: "Language Already Exists",
        description: "A language with this code already exists.",
        variant: "destructive"
      });
      return;
    }
    
    setLanguages(prev => [
      ...prev,
      { 
        id, 
        name: newLanguage.name, 
        code: newLanguage.code, 
        default: false, 
        enabled: true 
      }
    ]);
    
    setNewLanguage({ name: "", code: "" });
    
    toast({
      title: "Language Added",
      description: `${newLanguage.name} has been added to available languages.`
    });
  };
  
  const addNewCurrency = () => {
    if (!newCurrency.name || !newCurrency.code || !newCurrency.symbol) return;
    
    const id = newCurrency.code.toLowerCase();
    if (currencies.some(c => c.id === id)) {
      toast({
        title: "Currency Already Exists",
        description: "A currency with this code already exists.",
        variant: "destructive"
      });
      return;
    }
    
    setCurrencies(prev => [
      ...prev,
      { 
        id, 
        name: newCurrency.name, 
        code: newCurrency.code.toUpperCase(), 
        symbol: newCurrency.symbol,
        default: false, 
        enabled: true 
      }
    ]);
    
    setNewCurrency({ name: "", code: "", symbol: "" });
    
    toast({
      title: "Currency Added",
      description: `${newCurrency.name} has been added to available currencies.`
    });
  };
  
  const addNewTaxRate = () => {
    if (!newTaxRate.country || !newTaxRate.type) return;
    
    const id = newTaxRate.country.toLowerCase().replace(/\s+/g, '');
    if (taxRates.some(t => t.id === id)) {
      toast({
        title: "Tax Rate Already Exists",
        description: "A tax rate for this country already exists.",
        variant: "destructive"
      });
      return;
    }
    
    setTaxRates(prev => [
      ...prev,
      { 
        id, 
        country: newTaxRate.country, 
        rate: newTaxRate.rate, 
        type: newTaxRate.type, 
        enabled: true 
      }
    ]);
    
    setNewTaxRate({ country: "", rate: 0, type: "" });
    
    toast({
      title: "Tax Rate Added",
      description: `Tax rate for ${newTaxRate.country} has been added.`
    });
  };
  
  return (
    <Card className="border border-border/40 relative">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Localization Settings</h2>
        <p className="text-muted-foreground mb-6">
          Configure languages, currencies, and tax rates for your platform.
        </p>
        
        <Tabs defaultValue="languages" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="languages" className="flex items-center gap-1">
              <Globe size={16} />
              <span>Languages</span>
            </TabsTrigger>
            <TabsTrigger value="currencies" className="flex items-center gap-1">
              <DollarSign size={16} />
              <span>Currencies</span>
            </TabsTrigger>
            <TabsTrigger value="tax" className="flex items-center gap-1">
              <Percent size={16} />
              <span>Tax Rates</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="languages" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <Label htmlFor="newLanguageName">Language Name</Label>
                <Input 
                  id="newLanguageName" 
                  placeholder="e.g. French" 
                  value={newLanguage.name}
                  onChange={e => setNewLanguage(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="newLanguageCode">Language Code</Label>
                <Input 
                  id="newLanguageCode" 
                  placeholder="e.g. fr" 
                  value={newLanguage.code}
                  onChange={e => setNewLanguage(prev => ({ ...prev, code: e.target.value }))}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={addNewLanguage} className="w-full">
                  <Plus size={16} className="mr-2" />
                  Add Language
                </Button>
              </div>
            </div>
            
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {languages.map(language => (
                  <div 
                    key={language.id}
                    className={`p-4 rounded-lg border flex items-center justify-between ${
                      language.default ? 'bg-primary/5 border-primary/20' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg font-medium">{language.code.toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="font-medium">{language.name}</p>
                        <p className="text-xs text-muted-foreground">Code: {language.code}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {!language.default && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSetDefaultLanguage(language.id)}
                        >
                          Set Default
                        </Button>
                      )}
                      {language.default && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Default</span>
                      )}
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`language-${language.id}`} className="text-sm">
                          {language.enabled ? 'Enabled' : 'Disabled'}
                        </Label>
                        <Switch 
                          id={`language-${language.id}`}
                          checked={language.enabled}
                          onCheckedChange={() => handleToggleLanguage(language.id)}
                          disabled={language.default}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="currencies" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <Label htmlFor="newCurrencyName">Currency Name</Label>
                <Input 
                  id="newCurrencyName" 
                  placeholder="e.g. Euro" 
                  value={newCurrency.name}
                  onChange={e => setNewCurrency(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="newCurrencyCode">Currency Code</Label>
                <Input 
                  id="newCurrencyCode" 
                  placeholder="e.g. EUR" 
                  value={newCurrency.code}
                  onChange={e => setNewCurrency(prev => ({ ...prev, code: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="newCurrencySymbol">Currency Symbol</Label>
                <Input 
                  id="newCurrencySymbol" 
                  placeholder="e.g. €" 
                  value={newCurrency.symbol}
                  onChange={e => setNewCurrency(prev => ({ ...prev, symbol: e.target.value }))}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={addNewCurrency} className="w-full">
                  <Plus size={16} className="mr-2" />
                  Add Currency
                </Button>
              </div>
            </div>
            
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {currencies.map(currency => (
                  <div 
                    key={currency.id}
                    className={`p-4 rounded-lg border flex items-center justify-between ${
                      currency.default ? 'bg-primary/5 border-primary/20' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg font-medium">{currency.symbol}</span>
                      </div>
                      <div>
                        <p className="font-medium">{currency.name}</p>
                        <p className="text-xs text-muted-foreground">Code: {currency.code}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {!currency.default && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSetDefaultCurrency(currency.id)}
                        >
                          Set Default
                        </Button>
                      )}
                      {currency.default && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Default</span>
                      )}
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`currency-${currency.id}`} className="text-sm">
                          {currency.enabled ? 'Enabled' : 'Disabled'}
                        </Label>
                        <Switch 
                          id={`currency-${currency.id}`}
                          checked={currency.enabled}
                          onCheckedChange={() => handleToggleCurrency(currency.id)}
                          disabled={currency.default}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="tax" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <Label htmlFor="newTaxCountry">Country</Label>
                <Input 
                  id="newTaxCountry" 
                  placeholder="e.g. Germany" 
                  value={newTaxRate.country}
                  onChange={e => setNewTaxRate(prev => ({ ...prev, country: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="newTaxRate">Tax Rate (%)</Label>
                <Input 
                  id="newTaxRate" 
                  type="number"
                  placeholder="e.g. 19" 
                  value={newTaxRate.rate}
                  onChange={e => setNewTaxRate(prev => ({ ...prev, rate: Number(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="newTaxType">Tax Type</Label>
                <Input 
                  id="newTaxType" 
                  placeholder="e.g. VAT" 
                  value={newTaxRate.type}
                  onChange={e => setNewTaxRate(prev => ({ ...prev, type: e.target.value }))}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={addNewTaxRate} className="w-full">
                  <Plus size={16} className="mr-2" />
                  Add Tax Rate
                </Button>
              </div>
            </div>
            
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {taxRates.map(tax => (
                  <div 
                    key={tax.id}
                    className="p-4 rounded-lg border flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg font-medium">{tax.rate}%</span>
                      </div>
                      <div>
                        <p className="font-medium">{tax.country}</p>
                        <p className="text-xs text-muted-foreground">Type: {tax.type}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`tax-${tax.id}`} className="text-sm">
                        {tax.enabled ? 'Enabled' : 'Disabled'}
                      </Label>
                      <Switch 
                        id={`tax-${tax.id}`}
                        checked={tax.enabled}
                        onCheckedChange={() => handleToggleTaxRate(tax.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default LocalizationTab;
