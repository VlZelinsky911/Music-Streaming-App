type SupabaseUser = {
  id: string
  email?: string | null
  phone: string | null
  user_metadata: {
    full_name?: string
    avatar_url?: string
    [key: string]: any
  }
  created_at: string
  email_confirmed_at?: string
  phone_confirmed_at?: string
  role: string
  aud: string
}
