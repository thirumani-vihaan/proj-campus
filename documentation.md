# Campus Task & Freelance Platform - Technical Documentation

## Overview
The Campus Task & Freelance Platform is designed to mitigate the risks and inefficiencies of campus freelancing. This platform restricts access to verified college students (using `.edu` email OTP) and provides a secure Escrow Wallet system to prevent ghosting or non-payment. 

## Technology Stack (Modern BaaS)
- **Frontend Framework**: React 19 (via Vite)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Routing**: React Router DOM (v7)
- **Backend/BaaS**: Supabase (PostgreSQL, Auth, Real-time)
- **Icons**: Lucide React

## Application Architecture

### 1. Database Schema
A robust Supabase setup is required. The `schema.sql` file located in `supabase/schema.sql` provides the exact Table definitions and Row Level Security (RLS) policies needed:
- `profiles`: Extends the default Supabase `auth.users` with college-specific fields, reliability score, and availability status.
- `tasks`: The core marketplace table storing job details, budget, and deadlines.
- `applications`: Manages the flow of freelancers applying to tasks with pitch messages.
- `wallets`: A 1-to-1 table with user profiles tracking generic balances and locked escrow funds.
- `messages`: Standard chat architecture table with realtime subscriptions enabled.

### 2. Global State & Authentication
The application uses a global React Context (`AuthContext.tsx`) built directly on `@supabase/supabase-js`. 
- **Session Tracking**: It automatically tracks user sign-ins/sign-outs and provides access to the Supabase session token across all components.

### 3. Core Pages / Components
- **Navbar & Layout (`src/components/layout`)**: Provides consistent navigation and routing shells.
- **Profile (`src/pages/Profile.tsx`)**: Where users fill out their bio, skills, and modify their dynamic **Availability Status System** (Free Now, Busy, etc.).
- **Task Marketplace (`src/pages/TaskFeed.tsx` & `CreateTask.tsx`)**: Real-time filtering and job posting. 
- **Task Details & Workflows (`src/pages/TaskDetails.tsx`)**: A dynamic split-view page displaying the assignment workflow. If the viewer is the client, they see applicants to assign. If the viewer is a freelancer, they see an application form.
- **Dashboards (`src/pages/Dashboard.tsx`)**: A tabbed interface displaying active jobs, completed history, and wallet summaries, split by "Freelancer View" and "Client View".
- **Real-time Chat (`src/pages/Chat.tsx`)**: Interface for assigned clients and freelancers to communicate securely.
- **Escrow Wallet (`src/pages/Wallet.tsx`)**: The financial center demonstrating Available vs. Locked balances and transaction history.

## Getting Started / Next Steps
1. Create a Supabase project at `database.new`.
2. Run the `supabase/schema.sql` code in your Supabase SQL Editor to map your backend exactly to the frontend.
3. Configure your Supabase URL and Anon Key in `.env` (Create `src/lib/supabase.ts`).
4. Replace the "Mock Data" arrays in components like `TaskFeed`, `TaskDetails`, `Chat`, and `Wallet` with real Supabase `select()` and `insert()` data fetching queries.
5. Setup an Edge function or background Cron job for the **Anti-Ghosting Rules** and **Availability Status Auto-Reset**.
