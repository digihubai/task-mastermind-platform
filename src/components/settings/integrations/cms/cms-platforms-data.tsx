
import React from 'react';
import { Globe, FileText, ShoppingCart } from "lucide-react";

export interface CMSPlatform {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  backgroundColor: string;
  textColor: string;
  type: 'cms' | 'ecommerce';
}

export const cmsPlatforms: CMSPlatform[] = [
  {
    id: "wordpress",
    name: "WordPress",
    description: "Connect with WordPress + Yoast/RankMath",
    icon: <Globe className="h-5 w-5 text-blue-600" />,
    backgroundColor: "bg-blue-100",
    textColor: "text-blue-600",
    type: 'cms'
  },
  {
    id: "shopify",
    name: "Shopify",
    description: "Connect your Shopify store",
    icon: <ShoppingCart className="h-5 w-5 text-green-600" />,
    backgroundColor: "bg-green-100",
    textColor: "text-green-600",
    type: 'ecommerce'
  },
  {
    id: "wix",
    name: "Wix",
    description: "Connect your Wix site",
    icon: <Globe className="h-5 w-5 text-purple-600" />,
    backgroundColor: "bg-purple-100",
    textColor: "text-purple-600",
    type: 'cms'
  },
  {
    id: "wixecommerce",
    name: "Wix eCommerce",
    description: "Connect your Wix eCommerce store",
    icon: <ShoppingCart className="h-5 w-5 text-purple-600" />,
    backgroundColor: "bg-purple-100",
    textColor: "text-purple-600",
    type: 'ecommerce'
  },
  {
    id: "squarespace",
    name: "Squarespace",
    description: "Connect your Squarespace site",
    icon: <FileText className="h-5 w-5 text-gray-600" />,
    backgroundColor: "bg-gray-100",
    textColor: "text-gray-600",
    type: 'cms'
  },
  {
    id: "joomla",
    name: "Joomla",
    description: "Connect your Joomla site",
    icon: <Globe className="h-5 w-5 text-orange-600" />,
    backgroundColor: "bg-orange-100",
    textColor: "text-orange-600",
    type: 'cms'
  },
  {
    id: "magento",
    name: "Magento",
    description: "Connect your Magento store",
    icon: <ShoppingCart className="h-5 w-5 text-red-600" />,
    backgroundColor: "bg-red-100",
    textColor: "text-red-600",
    type: 'ecommerce'
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    description: "Connect your WooCommerce store",
    icon: <ShoppingCart className="h-5 w-5 text-purple-600" />,
    backgroundColor: "bg-purple-100",
    textColor: "text-purple-600",
    type: 'ecommerce'
  },
  {
    id: "bigcommerce",
    name: "BigCommerce",
    description: "Connect your BigCommerce store",
    icon: <ShoppingCart className="h-5 w-5 text-blue-600" />,
    backgroundColor: "bg-blue-100",
    textColor: "text-blue-600",
    type: 'ecommerce'
  },
  {
    id: "webflow",
    name: "Webflow",
    description: "Connect your Webflow site",
    icon: <Globe className="h-5 w-5 text-teal-600" />,
    backgroundColor: "bg-teal-100",
    textColor: "text-teal-600",
    type: 'cms'
  },
  {
    id: "hubspot",
    name: "HubSpot CMS",
    description: "Connect your HubSpot CMS",
    icon: <FileText className="h-5 w-5 text-orange-600" />,
    backgroundColor: "bg-orange-100",
    textColor: "text-orange-600",
    type: 'cms'
  },
  {
    id: "prestashop",
    name: "PrestaShop",
    description: "Connect your PrestaShop store",
    icon: <ShoppingCart className="h-5 w-5 text-blue-600" />,
    backgroundColor: "bg-blue-100",
    textColor: "text-blue-600",
    type: 'ecommerce'
  },
  {
    id: "drupal",
    name: "Drupal",
    description: "Connect your Drupal site",
    icon: <Globe className="h-5 w-5 text-blue-700" />,
    backgroundColor: "bg-blue-100",
    textColor: "text-blue-700",
    type: 'cms'
  },
  {
    id: "ghost",
    name: "Ghost CMS",
    description: "Connect your Ghost blog",
    icon: <FileText className="h-5 w-5 text-gray-700" />,
    backgroundColor: "bg-gray-100",
    textColor: "text-gray-700",
    type: 'cms'
  },
  {
    id: "contentful",
    name: "Contentful",
    description: "Connect your Contentful workspace",
    icon: <FileText className="h-5 w-5 text-cyan-600" />,
    backgroundColor: "bg-cyan-100",
    textColor: "text-cyan-600",
    type: 'cms'
  }
];
