import { createClient } from '@supabase/supabase-js'

// These environment variables are automatically provided by Lovable
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

// Function to increment and get the current submission count
export const incrementSubmissionCount = async (): Promise<number> => {
  try {
    // First, try to get the current count
    const { data: currentData, error: fetchError } = await supabase
      .from('submission_counter')
      .select('count')
      .eq('id', 1)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching count:', fetchError)
      return 75 // Fallback
    }

    const currentCount = currentData?.count || 74

    // Increment the count
    const newCount = currentCount + 1

    // Update or insert the new count
    const { error: upsertError } = await supabase
      .from('submission_counter')
      .upsert({ id: 1, count: newCount })

    if (upsertError) {
      console.error('Error updating count:', upsertError)
      return 75 // Fallback
    }

    return newCount
  } catch (error) {
    console.error('Error in incrementSubmissionCount:', error)
    return 75 // Fallback
  }
}

// Function to get the current submission count without incrementing
export const getSubmissionCount = async (): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('submission_counter')
      .select('count')
      .eq('id', 1)
      .single()

    if (error) {
      console.error('Error fetching count:', error)
      return 75 // Fallback
    }

    return data?.count || 75
  } catch (error) {
    console.error('Error in getSubmissionCount:', error)
    return 75 // Fallback
  }
}