
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

// Default posts to use when MongoDB is unavailable
const defaultPosts = [
  {
    _id: "1",
    title: "How do you cope with social anxiety at work?",
    preview: "I've been struggling with meetings and presentations...",
    author: "User_2489",
    topic: "Anxiety",
    replies: 8,
    likes: 12,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "2",
    title: "Finding motivation when you feel stuck",
    preview: "I've been in the same situation for months and can't seem to find the energy to make a change...",
    author: "User_7392",
    topic: "Motivation",
    replies: 15,
    likes: 27,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "3",
    title: "Techniques for managing panic attacks",
    preview: "I've found some breathing exercises that help, but I'm looking for more strategies...",
    author: "User_1056",
    topic: "Anxiety",
    replies: 23,
    likes: 31,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "4",
    title: "Feeling disconnected from friends and family",
    preview: "Ever since the pandemic, I've felt like there's a wall between me and my loved ones...",
    author: "User_4201",
    topic: "Loneliness",
    replies: 19,
    likes: 24,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "5",
    title: "How to practice self-compassion when you keep making mistakes",
    preview: "I'm my own worst critic and it's exhausting. How do you learn to be kind to yourself?",
    author: "User_8106",
    topic: "Self-Care",
    replies: 14,
    likes: 36,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const client = new MongoClient();
    let dbConnected = false;
    
    try {
      // Try to connect with a timeout
      const connectPromise = client.connect(MONGODB_URI);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Connection timeout")), 5000)
      );
      
      await Promise.race([connectPromise, timeoutPromise]);
      console.log("Connected to MongoDB");
      dbConnected = true;
      
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
        const requestData = await req.json();
        const { title, preview, author, topic } = requestData;
        
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
    } catch (dbError) {
      console.error("MongoDB connection error:", dbError);
      console.log("Falling back to default posts");
      
      // If MongoDB connection fails, use default posts for GET requests
      if (req.method === 'GET') {
        return new Response(JSON.stringify({ posts: defaultPosts }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      // For mutations, return a meaningful error
      return new Response(JSON.stringify({ 
        error: "Database temporarily unavailable",
        message: "Your request has been received but could not be processed at this time. Please try again later."
      }), {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } finally {
      if (dbConnected) {
        try {
          await client.close();
        } catch (e) {
          // Ignore close errors
        }
      }
    }
    
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error:", error);
    
    // For GET requests, return fallback data
    if (req.method === 'GET') {
      return new Response(JSON.stringify({ 
        error: error.message,
        fallback: true,
        posts: defaultPosts 
      }), {
        status: 200, // Return 200 with fallback data
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
