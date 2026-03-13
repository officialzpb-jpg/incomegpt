-- Add missing columns to profiles table

-- Add full_name column if it doesn't exist
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS full_name TEXT;

-- Add updated_at column if it doesn't exist
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create index on full_name for faster searches
CREATE INDEX IF NOT EXISTS idx_profiles_full_name ON profiles(full_name);

-- Update existing rows to have updated_at if null
UPDATE profiles SET updated_at = created_at WHERE updated_at IS NULL;
