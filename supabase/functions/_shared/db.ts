
export const connectToMongoDB = async (client: any, uri: string, timeoutMs = 5000) => {
  try {
    // Try to connect with a timeout
    const connectPromise = client.connect(uri);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Connection timeout")), timeoutMs)
    );
    
    await Promise.race([connectPromise, timeoutPromise]);
    console.log("Connected to MongoDB");
    return true;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return false;
  }
};

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
