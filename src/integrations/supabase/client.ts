// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://totcayhpxaimdogvwbck.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvdGNheWhweGFpbWRvZ3Z3YmNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1MzA5MDcsImV4cCI6MjA2MDEwNjkwN30.Lz0dbQEpa_Mip0Tr8mkUgjceJp6KA1AAK1TfUqBenKw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);