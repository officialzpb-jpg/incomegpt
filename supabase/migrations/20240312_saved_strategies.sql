-- Create saved_strategies table
CREATE TABLE IF NOT EXISTS saved_strategies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  strategy_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, strategy_id)
);

-- Enable RLS
ALTER TABLE saved_strategies ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own saved strategies"
  ON saved_strategies FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved strategies"
  ON saved_strategies FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved strategies"
  ON saved_strategies FOR DELETE
  USING (auth.uid() = user_id);

-- Index
CREATE INDEX idx_saved_strategies_user_id ON saved_strategies(user_id);