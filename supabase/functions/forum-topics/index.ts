
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

const MONGODB_URI = Deno.env.get("MONGODB_URI");
if (!MONGODB_URI) {
  console.error("MONGODB_URI environment variable not set");
  throw new Error("MONGODB_URI environment variable not set");
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const client = new MongoClient();
    await client.connect(MONGODB_URI);
    
    console.log("Connected to MongoDB");
    
    const db = client.database("mindhealer");
    const topicsCollection = db.collection("forumTopics");
    
    if (req.method === 'GET') {
      const topics = await topicsCollection.find({}).toArray();
      
      return new Response(JSON.stringify({ topics }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    await client.close();
    
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error:", error);
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
