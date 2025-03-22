-- Insert sample organizations
INSERT INTO organizations (id, name, created_at, updated_at)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'Fabricon Manufacturing', NOW(), NOW()),
    ('22222222-2222-2222-2222-222222222222', 'Acme Industries', NOW(), NOW()),
    ('33333333-3333-3333-3333-333333333333', 'TechCorp Solutions', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Note: For organization_users, we will need real user IDs after users are created
-- This can be done through the application or manually added later
-- Example (commented out until real user IDs are available):
/*
INSERT INTO organization_users (organization_id, user_id, role, created_at, updated_at)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'actual-user-id-here', 'admin', NOW(), NOW()),
    ('22222222-2222-2222-2222-222222222222', 'actual-user-id-here', 'user', NOW(), NOW()),
    ('33333333-3333-3333-3333-333333333333', 'actual-user-id-here', 'admin', NOW(), NOW())
ON CONFLICT (organization_id, user_id) DO NOTHING;
*/ 