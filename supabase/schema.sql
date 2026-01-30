-- KINU Travel OS - Supabase Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TRIPS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS trips (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    destination VARCHAR(255) NOT NULL,
    destination_id VARCHAR(100),
    country VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    travelers INTEGER DEFAULT 1,
    profile VARCHAR(50) DEFAULT 'balanced', -- romantic, family, adventure, luxury, budget
    status VARCHAR(50) DEFAULT 'draft', -- draft, planning, confirmed, completed, cancelled
    budget_planned DECIMAL(12, 2) DEFAULT 0,
    budget_spent DECIMAL(12, 2) DEFAULT 0,
    currency VARCHAR(10) DEFAULT 'BRL',
    progress INTEGER DEFAULT 0,
    image VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ACTIVITIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS activities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE NOT NULL,
    day INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50), -- culture, food, photo, nightlife, shopping, transport
    duration VARCHAR(50),
    price DECIMAL(12, 2) DEFAULT 0,
    currency VARCHAR(10) DEFAULT 'BRL',
    rating DECIMAL(2, 1),
    image VARCHAR(50),
    location VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, cancelled, completed
    booking_url TEXT,
    booking_reference VARCHAR(100),
    start_time TIME,
    end_time TIME,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- EXPENSES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS expenses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- flights, hotels, food, activities, shopping, transport, other
    amount DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'BRL',
    date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, paid, refunded
    payment_method VARCHAR(50),
    receipt_url TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- PACKING ITEMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS packing_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    trip_id UUID REFERENCES trips(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- clothes, shoes, accessories, electronics, hygiene, documents
    quantity INTEGER DEFAULT 1,
    weight DECIMAL(5, 2) DEFAULT 0, -- in kg
    packed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- CLAN TIPS TABLE (Community)
-- =====================================================
CREATE TABLE IF NOT EXISTS clan_tips (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    destination_id VARCHAR(100) NOT NULL,
    tip TEXT NOT NULL,
    category VARCHAR(50), -- general, food, transport, safety, culture, money
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TIP VOTES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS tip_votes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tip_id UUID REFERENCES clan_tips(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    vote_type VARCHAR(10) NOT NULL, -- up, down
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(tip_id, user_id)
);

-- =====================================================
-- USER PREFERENCES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    travel_style VARCHAR(50) DEFAULT 'balanced',
    home_currency VARCHAR(10) DEFAULT 'BRL',
    timezone VARCHAR(100) DEFAULT 'America/Sao_Paulo',
    language VARCHAR(10) DEFAULT 'pt-BR',
    notifications_enabled BOOLEAN DEFAULT TRUE,
    dark_mode BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE packing_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE clan_tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE tip_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Trips policies
CREATE POLICY "Users can view own trips" ON trips
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own trips" ON trips
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own trips" ON trips
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own trips" ON trips
    FOR DELETE USING (auth.uid() = user_id);

-- Activities policies
CREATE POLICY "Users can view activities of own trips" ON activities
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM trips WHERE trips.id = activities.trip_id AND trips.user_id = auth.uid())
    );

CREATE POLICY "Users can create activities for own trips" ON activities
    FOR INSERT WITH CHECK (
        EXISTS (SELECT 1 FROM trips WHERE trips.id = activities.trip_id AND trips.user_id = auth.uid())
    );

CREATE POLICY "Users can update activities of own trips" ON activities
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM trips WHERE trips.id = activities.trip_id AND trips.user_id = auth.uid())
    );

CREATE POLICY "Users can delete activities of own trips" ON activities
    FOR DELETE USING (
        EXISTS (SELECT 1 FROM trips WHERE trips.id = activities.trip_id AND trips.user_id = auth.uid())
    );

-- Expenses policies (same pattern)
CREATE POLICY "Users can view expenses of own trips" ON expenses
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM trips WHERE trips.id = expenses.trip_id AND trips.user_id = auth.uid())
    );

CREATE POLICY "Users can manage expenses of own trips" ON expenses
    FOR ALL USING (
        EXISTS (SELECT 1 FROM trips WHERE trips.id = expenses.trip_id AND trips.user_id = auth.uid())
    );

-- Packing items policies
CREATE POLICY "Users can manage packing items of own trips" ON packing_items
    FOR ALL USING (
        EXISTS (SELECT 1 FROM trips WHERE trips.id = packing_items.trip_id AND trips.user_id = auth.uid())
    );

-- Clan tips - public read, own write
CREATE POLICY "Anyone can view verified tips" ON clan_tips
    FOR SELECT USING (verified = TRUE OR auth.uid() = user_id);

CREATE POLICY "Users can create tips" ON clan_tips
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tips" ON clan_tips
    FOR UPDATE USING (auth.uid() = user_id);

-- Tip votes
CREATE POLICY "Users can manage own votes" ON tip_votes
    FOR ALL USING (auth.uid() = user_id);

-- User preferences
CREATE POLICY "Users can manage own preferences" ON user_preferences
    FOR ALL USING (auth.uid() = user_id);

-- =====================================================
-- INDEXES
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_trips_user_id ON trips(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_trip_id ON activities(trip_id);
CREATE INDEX IF NOT EXISTS idx_expenses_trip_id ON expenses(trip_id);
CREATE INDEX IF NOT EXISTS idx_packing_items_trip_id ON packing_items(trip_id);
CREATE INDEX IF NOT EXISTS idx_clan_tips_destination ON clan_tips(destination_id);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trips_updated_at
    BEFORE UPDATE ON trips
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER user_preferences_updated_at
    BEFORE UPDATE ON user_preferences
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
