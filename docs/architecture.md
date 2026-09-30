Rendering strategy, RSC vs Client, data flows

# 🏗️ System Architecture & Data Flow
This document outlines the high-level architecture, rendering choices and data flow patterns used across the Postboxd project. Refer to this when adding new features or refactoring existing modules.

## 1. High-Level System Overview
[Brief intro to tech stack and rendering boundaries]

## 2. Rendering Strategy (RSC vs Client)
[Rules on when to use Server Components vs "use client"]

## 3. Client-to-API Request Pipelines  
1. browser / client
2. services (auth/film/review through client) -> uses api-client in `/lib`
3. local or external api

### B. Webhook Pipeline (Stripe / Auth)
[External Event -> Raw Body Parse -> Signature Verification -> DB Update]

## 4. State Management Rules
[Server State vs URL State vs UI State]

## 5. Directory & File Conventions
[Key folders and high-yield file entries]