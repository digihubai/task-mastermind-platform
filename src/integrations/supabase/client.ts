// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tlvpxtwkwesbivkiejxy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsdnB4dHdrd2VzYml2a2llanh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NDY2MzgsImV4cCI6MjA1ODUyMjYzOH0.o06EAv3QCqj87EcFE3YWczUdHEzrXW668P6Z0QYfR-4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);