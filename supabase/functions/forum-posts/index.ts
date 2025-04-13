
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { MongoClient, ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

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
    const postsCollection = db.collection("forumPosts");
    
    const url = new URL(req.url);
    const path = url.pathname.split('/').pop();

    if (req.method === 'GET') {
      // Get query parameters
      const topic = url.searchParams.get('topic');
      const sort = url.searchParams.get('sort') || 'recent';
      
      // Build query
      const query: any = {};
      if (topic && topic !== 'all') {
        query.topic = topic;
      }
      
      // Build sort options
      let sortOptions: any = {};
      if (sort === 'recent') {
        sortOptions = { createdAt: -1 };
      } else if (sort === 'popular') {
        sortOptions = { likes: -1 };
      } else if (sort === 'unanswered') {
        query.replies = { $size: 0 };
      }
      
      // Get posts
      const posts = await postsCollection.find(query).sort(sortOptions).toArray();
      
      return new Response(JSON.stringify({ posts }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } 
    
    if (req.method === 'POST') {
      const { title, preview, author, topic } = await req.json();
      
      const newPost = {
        title,
        preview,
        author,
        topic,
        replies: [],
        likes: 0,
        createdAt: new Date(),
      };
      
      const result = await postsCollection.insertOne(newPost);
      
      return new Response(JSON.stringify({ 
        id: result.insertedId,
        ...newPost 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    if (req.method === 'PUT' && path === 'like') {
      const { postId } = await req.json();
      
      await postsCollection.updateOne(
        { _id: new ObjectId(postId) },
        { $inc: { likes: 1 } }
      );
      
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    if (req.method === 'PUT' && path === 'reply') {
      const { postId, reply } = await req.json();
      
      await postsCollection.updateOne(
        { _id: new ObjectId(postId) },
        { $push: { replies: { ...reply, createdAt: new Date() } } }
      );
      
      return new Response(JSON.stringify({ success: true }), {
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
