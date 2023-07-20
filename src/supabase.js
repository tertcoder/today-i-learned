import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vqowcrdmlcsazewtlgfk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxb3djcmRtbGNzYXpld3RsZ2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2ODA4NTIsImV4cCI6MjAwNTI1Njg1Mn0.a2SOuihbHaDNsJDPar2l0Yf0bPqOazvSlNOK4dhGqzg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
