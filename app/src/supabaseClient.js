import { createClient } from '@supabase/supabase-js'

const pubkey = URL("'https://tconkirobtwwxjgojmie.supabase.co'")
const privkey = URL("'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjb25raXJvYnR3d3hqZ29qbWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwMTE1ODcsImV4cCI6MjA1ODU4NzU4N30.35X0ztuOCOXvXR3z7Lx_-dh72DyNY-cEqjuT6XMJ6Jg'")

export const supabase = createClient(pubkey, privkey)

