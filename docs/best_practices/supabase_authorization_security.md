# Supabase Authorization Security Best Practices

## 1. Always Enable Row-Level Security (RLS)
- Enforce strict, granular permissions at the database level.
- Only allow users to read/write rows they're explicitly authorized to access.

**Example RLS rule:**
```sql
-- Allow users to only view their own records
create policy "Users can select their own data"
  on profiles for select
  using (auth.uid() = user_id);
```

## 2. Use Auth Policies (RLS Policies) for All Tables
- Every table accessed from the client **should have RLS policies**.
- Do not rely solely on frontend checks—they can easily be bypassed.

## 3. Implement JWT Token Verification
- Supabase uses JWT tokens for authentication.
- Ensure tokens are securely stored (preferably in secure HttpOnly cookies).
- Always validate JWT tokens server-side or through Supabase’s built-in libraries.

## 4. Securely Store Authentication Tokens
- Never store tokens directly in localStorage or sessionStorage.
- Recommended methods:
  - **HttpOnly secure cookies** (best practice for web apps).
  - Browser memory (temporary, less secure but acceptable in certain controlled scenarios).

## 5. Enable Multi-Factor Authentication (MFA)
- Protect user accounts by requiring multiple forms of verification.
- Supabase supports MFA out-of-the-box.

## 6. Limit Roles & Permissions
- Follow the principle of **least privilege**.
- Only grant necessary roles and permissions to users.
- Regularly audit and adjust permissions.

## 7. Secure Backend API Routes
- Always verify the user's session on backend endpoints.

```typescript
// Example for Next.js (server-side verification)
const { data: { user } } = await supabase.auth.getUser();
if (!user) throw new Error('Unauthorized');
```

## 8. Use Auth Triggers and Hooks for Additional Checks
- Use Supabase triggers (e.g., Postgres functions) to handle advanced authorization logic or audit logs.

## 9. Regularly Rotate & Audit Security Keys
- Rotate your Supabase JWT secret periodically.
- Immediately regenerate keys if compromised.

## 10. Enforce Strong Password & Rate-Limiting
- Configure password complexity and rotation policies.
- Implement rate-limiting on login attempts to prevent brute-force attacks.

## 11. Secure Supabase Admin Access
- Limit access to your Supabase admin dashboard.
- Use strong authentication methods (e.g., SSO or MFA).

## Common Security Pitfalls (Avoid)
- **No RLS policies configured** (major vulnerability).
- **Relying only on client-side authorization checks**.
- **Storing tokens insecurely (e.g., localStorage)**.
- **Giving overly permissive roles** to your database users.

## Useful Supabase Resources
- [Row-Level Security in Supabase](https://supabase.com/docs/guides/auth/row-level-security)
- [Authentication Guide](https://supabase.com/docs/guides/auth)
- [Security at Supabase](https://supabase.com/security)

## Recommended Next Steps
- Implement Row-Level Security immediately.
- Verify JWT tokens on server-side routes.
- Use secure token storage and MFA where applicable.
- Audit and refine your authorization policies regularly.

