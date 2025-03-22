# Troubleshooting Guide

This document covers common issues you might encounter while using the SimpleTrust application and provides solutions to resolve them.

## Table of Contents
- [Authentication Issues](#authentication-issues)
  - [Sign-out Problems](#sign-out-problems)
  - [Invalid Login Credentials](#invalid-login-credentials)
- [Organization Management](#organization-management)
  - [Organization Creation Stuck](#organization-creation-stuck)
  - [Infinite Recursion Error](#infinite-recursion-error)
- [Database Migration Issues](#database-migration-issues)
  - [Migration Errors](#migration-errors)
  - [Duplicate Entry Errors](#duplicate-entry-errors)
- [Database Connection Issues](#database-connection-issues)
  - [Database Access Errors](#database-access-errors)
  - [Permission Errors When Managing Organizations](#permission-errors-when-managing-organizations)
  - [Invalid Dates in Organization Cards](#invalid-dates-in-organization-cards)

## Authentication Issues

### Sign-out Problems

If you encounter issues when trying to sign out of the application:

1. **Clear browser storage manually**:
   - Open Developer Tools (F12 or Right-click > Inspect)
   - Go to Application > Storage > Local Storage
   - Select your site and clear the Supabase-related entries

2. **Force refresh the page**:
   - Press Ctrl+F5 (Windows/Linux) or Cmd+Shift+R (Mac) to force a complete page reload

3. **Use the dedicated Sign Out button**:
   - The application now includes a dedicated Sign Out button designed to handle edge cases
   - This button includes fallback mechanisms if the primary sign-out method fails

### Invalid Login Credentials

If you receive an "Invalid login credentials" error:

1. **Check your email and password**:
   - Ensure you're using the correct email address and password
   - Password is case-sensitive

2. **Reset your password**:
   - Use the "Forgot password?" link on the sign-in page
   - Follow the instructions in the email to reset your password

3. **Check email confirmation**:
   - Ensure you've confirmed your email address after registration
   - Check your spam/junk folder for confirmation emails

## Organization Management

### Organization Creation Stuck

If the "Creating..." spinner gets stuck when creating a new organization:

1. **Check your browser console for errors**:
   - Open Developer Tools (F12 or Right-click > Inspect)
   - Look for any error messages in the Console tab

2. **Refresh the application**:
   - Sometimes a simple refresh can resolve UI state issues
   - You may need to sign in again after refreshing

3. **Verify database permissions**:
   - Ensure the database RLS policies are correctly set up
   - Run `npm run migrate:safe` in the backend directory to apply the latest policies

### Infinite Recursion Error

If you see "infinite recursion detected in policy for relation 'organization_users'" error:

1. **Use the dedicated RLS policy fix script**:
   - Run the specialized script to fix RLS policies specifically:
   ```bash
   cd src/backend
   npm run fix-rls
   ```
   - This targeted script only updates the RLS policies without running full migrations

2. **Apply full migration if necessary**:
   - If the fix script doesn't resolve the issue, try the full migration:
   ```bash
   cd src/backend
   npm run migrate:safe
   ```
   - This will apply optimized RLS policies and SECURITY DEFINER functions that handle organization creation correctly

3. **Technical explanation**:
   - This error occurs when RLS policies form circular dependencies between tables
   - We've implemented a SECURITY DEFINER database function that bypasses RLS during the critical operations
   - This approach prevents recursion by executing privileged operations atomically

4. **Check database state**:
   - If issues persist, you may need to reset the database in development
   - Run `npm run reset:dev` (CAUTION: this will delete all data)

5. **Verify PostgreSQL version**:
   - Some policy features require PostgreSQL 14 or newer
   - Check your PostgreSQL version with `psql --version`

## Database Migration Issues

### Migration Errors

If migrations fail to apply correctly:

1. **Run the safe migration command**:
   ```bash
   cd src/backend
   npm run migrate:safe
   ```

2. **Check migration files**:
   - Ensure all migration files are in the correct order
   - Migration files are located in `src/backend/supabase/migrations/`

3. **Verify environment variables**:
   - Check that your `.env` file contains the correct database connection details
   - Required variables include `DATABASE_URL`, `SUPABASE_URL`, and `SUPABASE_ANON_KEY`

### Duplicate Entry Errors

If you encounter errors about duplicate keys or entries:

1. **Run safe migration with reset option**:
   ```bash
   cd src/backend
   npm run reset:dev
   ```
   **WARNING**: This will delete all data in your development database!

2. **Check seed data**:
   - Examine the seed data files for any potential conflicts
   - Seed files are located in `src/backend/supabase/migrations/04-seed/`

3. **Clean state for development**:
   - Sometimes it's necessary to start with a clean slate in development
   - After resetting, recreate any necessary test accounts and organizations

## Database Connection Issues

### Database Access Errors

**Problem**: Commands like `npm run db`, `npm run fix-dates`, or `npm run migrate:safe` fail with connection errors.

**Solution**:

1. Make sure you have the correct database connection URL in your `.env` file:
   ```
   DATABASE_URL=postgresql://postgres:postgres@localhost:54322/postgres
   ```

2. If you're using Supabase locally, the default connection settings are:
   - Host: `localhost`
   - Port: `54322`
   - Database: `postgres`
   - User: `postgres`
   - Password: `postgres`

3. To directly access your database, use the provided database console script:
   ```bash
   cd src/backend
   npm run db
   ```
   This will launch an interactive SQL console where you can run queries.

### Permission Errors When Managing Organizations

**Problem**: Clicking on "Manage Organization" results in a permission error: "You do not have permission to view this organization".

**Solution**:

1. Run the permission fix script to update RLS policies:
   ```bash
   cd src/backend
   npm run fix-permissions
   ```

2. If the error persists, check if the organization exists and whether you're a member:
   ```sql
   SELECT * FROM organizations WHERE id = 'your-org-id';
   SELECT * FROM organization_users WHERE organization_id = 'your-org-id' AND user_id = 'your-user-id';
   ```

### Invalid Dates in Organization Cards

**Problem**: Organization cards display "Created Invalid Date" instead of the correct creation date.

**Solution**:

1. Run the fix-dates script to repair invalid timestamp values:
   ```bash
   cd src/backend
   npm run fix-dates
   ```

2. If the issue persists, manually check the database:
   ```sql
   SELECT id, name, created_at, updated_at FROM organizations;
   ```

3. And update any invalid dates directly:
   ```sql
   UPDATE organizations 
   SET created_at = NOW(), updated_at = NOW() 
   WHERE created_at IS NULL OR created_at < '2000-01-01';
   ```

## Additional Resources

- [Supabase Documentation](https://supabase.io/docs)
- [NextJS Documentation](https://nextjs.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

For issues not covered in this guide, please contact the development team or file an issue in the project repository. 