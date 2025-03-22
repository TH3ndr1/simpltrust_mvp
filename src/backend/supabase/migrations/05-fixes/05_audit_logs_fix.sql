-- Add action column to audit_logs table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'audit_logs' 
    AND column_name = 'action'
  ) THEN
    ALTER TABLE public.audit_logs 
    ADD COLUMN action TEXT NOT NULL DEFAULT 'UNKNOWN';
    
    -- Add comment explaining the purpose of the action column
    COMMENT ON COLUMN public.audit_logs.action IS 'Type of operation (INSERT, UPDATE, DELETE)';
  END IF;
END
$$; 