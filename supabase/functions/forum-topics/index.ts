
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

// Default topics to use when MongoDB is unavailable
const defaultTopics = [
  { _id: "1", name: "Anxiety", count: 324 },
  { _id: "2", name: "Depression", count: 218 },
  { _id: "3", name: "Stress", count: 176 },
  { _id: "4", name: "Loneliness", count: 129 },
  { _id: "5", name: "Motivation", count: 98 },
  { _id: "6", name: "Relationships", count: 87 },
  { _id: "7", name: "Self-Care", count: 64 },
  { _id: "8", name: "Work/Life Balance", count: 52 },
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const client = new MongoClient();
    
    try {
      // Try to connect with a timeout
      const connectPromise = client.connect(MONGODB_URI);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Connection timeout")), 5000)
      );
      
      await Promise.race([connectPromise, timeoutPromise]);
      console.log("Connected to MongoDB");
      
      const db = client.database("mindhealer");
      const topicsCollection = db.collection("forumTopics");
      
      if (req.method === 'GET') {
        const topics = await topicsCollection.find({}).toArray();
        await client.close();
        
        return new Response(JSON.stringify({ topics }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } catch (dbError) {
      console.error("MongoDB connection error:", dbError);
      console.log("Falling back to default topics");
      
      // If MongoDB connection fails, use default topics
      return new Response(JSON.stringify({ topics: defaultTopics }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } finally {
      try {
        await client.close();
      } catch (e) {
        // Ignore close errors
      }
    }
    
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error:", error);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      fallback: true,
      topics: defaultTopics 
    }), {
      status: 200, // Return 200 with fallback data
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
