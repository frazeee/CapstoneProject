
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vemcrisinvdyuoutagqq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlbWNyaXNpbnZkeXVvdXRhZ3FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM4MzI3NDQsImV4cCI6MjAwOTQwODc0NH0.CFJV736VTLwqa2BCrBQs8C6qjDMfwwKNPck9IxZgWsM'
export const supabase = createClient(supabaseUrl, supabaseKey)