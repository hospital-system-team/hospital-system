// Supabase configuration
const SUPABASE_URL = 'your_supabase_project_url'
const SUPABASE_ANON_KEY = 'your_supabase_anon_key'

// Initialize Supabase client
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Function to fetch appointments from Supabase
async function fetchAppointments() {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('arrival_time', { ascending: false })

    if (error) {
      console.error('Error fetching appointments:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

// Function to add new appointment
async function addAppointment(appointmentData) {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .insert([appointmentData])
      .select()

    if (error) {
      console.error('Error adding appointment:', error)
      return null
    }

    return data[0]
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

// Function to update appointment
async function updateAppointment(id, updates) {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .update(updates)
      .eq('id', id)
      .select()

    if (error) {
      console.error('Error updating appointment:', error)
      return null
    }

    return data[0]
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

// Function to delete appointment
async function deleteAppointment(id) {
  try {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting appointment:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error:', error)
    return false
  }
}
