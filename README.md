
# Tharwa Capital: Application Guide

Welcome to the Tharwa Capital application guide. This document provides a complete walkthrough of the features and functionalities of your Islamic investment platform.

## Table of Contents
1.  [Introduction & Onboarding](#1-introduction--onboarding)
2.  [The Dashboard](#2-the-dashboard)
3.  [The Marketplace](#3-the-marketplace)
4.  [Investment Details & AI Features](#4-investment-details--ai-features)
5.  [Community & Sharia Board](#5-community--sharia-board)
6.  [User Profile](#6-user-profile)
7.  [Submitting a New Project](#7-submitting-a-new-project)
8.  [Language Switching](#8-language-switching)

---

### 1. Introduction & Onboarding

When a new user opens the app for the first time, they are greeted with a multi-step onboarding experience.

-   **Purpose:** To introduce the core value propositions of Tharwa Capital in a simple, engaging way.
-   **Screens:**
    1.  **Simple Halal Investing:** Highlights the accessibility of Sharia-compliant investments.
    2.  **Community Wealth:** Emphasizes the goal of supporting local and community-focused projects.
    3.  **Scholar Verification:** Builds trust by showcasing that all investments are reviewed by the Sharia Advisory Board.
-   **Functionality:** Users can click "Next" to proceed through the steps or "Skip" to go directly to the main application. On the final step, "Get Started" takes them to the Dashboard.

### 2. The Dashboard

The Dashboard is the user's home base and the first screen they see after onboarding.

-   **File:** `src/app/(app)/dashboard/page.tsx`
-   **Features:**
    -   **Welcome Header:** Displays the user's avatar and a greeting.
    -   **Portfolio Snapshot:** A quick overview of the user's investment performance, including:
        -   Total Invested
        -   Total Returns
        -   Number of Active Projects
    -   **Sharia Board Link:** A prominent card that links directly to the `Community` page to learn about the scholars who verify the investments.
    -   **Featured Opportunities:** A curated list of top investment projects to draw user attention. Clicking "See All" navigates to the full Marketplace.
    -   **Navigation:** Contains the main navigation bar at the bottom for easy access to all sections of the app.

### 3. The Marketplace

The Marketplace is where users can browse, search, and filter all available investment opportunities.

-   **File:** `src/app/(app)/marketplace/page.tsx` (Server Component) and `src/components/marketplace-client.tsx` (Client Component).
-   **Features:**
    -   **Search Bar:** Allows users to search for specific investments by title.
    -   **Category Filters:** Users can filter the list by categories like "Real Estate", "Technology", "Agriculture", etc.
    -   **Sharia-Compliant Filter (AI-Powered):**
        -   This is a key feature. When the "Sharia-compliant only" switch is toggled, an AI flow is triggered.
        -   **AI Flow:** `filterInvestmentsByShariaCompliance` in `src/ai/flows/filter-investments-by-sharia-compliance.ts`.
        -   This flow takes the full list of investments and intelligently filters out any that are not marked as compliant. For projects with detailed reports, it can use a tool to analyze the report's content to determine compliance.
    -   **Investment Cards:** Each investment is displayed as a card with key information: image, category, funding progress, expected return, and number of investors.

### 4. Investment Details & AI Features

Clicking on any investment card in the Marketplace leads to its detailed view.

-   **File:** `src/app/(app)/marketplace/[id]/page.tsx`
-   **Features:**
    -   **Hero Section:** A large image of the project with its title and category.
    -   **Funding Progress:** A visual progress bar showing how much has been invested versus the goal.
    -   **Key Metrics:** Cards displaying important data like Expected Return, Minimum Investment, number of investors, and days left.
    -   **Sharia Compliance Report:**
        -   A dedicated section showing the compliance status (e.g., "Sharia Approved" or "Not Compliant").
        -   The full text of the Sharia compliance report is displayed.
    -   **AI-Powered Summarizer (Core Feature):**
        -   A "Summarize with AI" button (`src/components/sharia-report-summarizer.tsx`).
        -   When clicked, this triggers the `summarizeShariaComplianceReport` AI flow (`src/ai/flows/summarize-sharia-compliance-report.ts`).
        -   The AI reads the full, potentially long and complex, compliance report and generates a concise, easy-to-understand summary for the user.
        -   This makes complex financial and religious terminology accessible to the average investor.
    -   **Invest Now:** A button that initiates a simulated investment process through an alert dialog.

### 5. Community & Sharia Board

The Community section is focused on building trust and connecting users.

-   **File:** `src/app/(app)/community/page.tsx`
-   **Features:**
    -   **Community Statistics:** Shows the number of active investors and total projects on the platform.
    -   **Sharia Advisory Board:** This is the main feature of the page. It lists the profiles of the scholars on the board.
    -   **Board Member Profiles:** Clicking on a member's profile navigates to a dedicated page (`/community/board/[id]`) with their biography, credentials, and areas of expertise.

### 6. User Profile

The Profile page contains user-specific information and settings.

-   **File:** `src/app/(app)/profile/page.tsx`
-   **Features:**
    -   **User Information:** Displays the user's name, email, and avatar.
    -   **Detailed Portfolio Stats:** A more detailed look at their investments, including total value and overall return percentage.
    -   **My Investments:** A list of all the projects the user has personally invested in, with links to the respective detail pages.
    -   **Account Settings:**
        -   Edit Profile (Placeholder)
        -   Notification Settings (Placeholder)
        -   Log Out (Placeholder)

### 7. Submitting a New Project

The app includes a flow for entrepreneurs to propose new investment opportunities.

-   **File:** `src/app/(app)/new-project/page.tsx`
-   **Features:**
    -   **Project Form:** A clean form (`src/components/new-project-form.tsx`) for users to enter project details.
    -   **Fields:** Includes Project Title, Category, Funding Goal, and a detailed description.
    -   **Submission:** On submission, a toast notification appears confirming that the project has been sent for review. (This is a simulated action).

### 8. Language Switching

The application is fully bilingual, supporting both English and Arabic.

-   **File:** `src/context/language-context.tsx` and `src/hooks/use-language.ts`.
-   **Functionality:**
    -   A language toggle button (a globe icon or a pill) is present in the header and on the onboarding screen.
    -   Clicking the button switches the entire UI between English and Arabic.
    -   The app correctly handles Right-to-Left (RTL) layout for Arabic.
    -   The user's language preference is saved in the browser's `localStorage`.
