/**
 * Google Sheets Integration via Python Backend on Render
 * 
 * The backend handles both Google Sheets integration and email sending.
 * 
 * For production: Set VITE_BACKEND_URL in Vercel environment variables
 * to your Render backend URL (e.g., https://your-app.onrender.com)
 * 
 * For local development: Set VITE_BACKEND_URL in .env file (e.g., http://localhost:5001)
 */

const BACKEND_URL = 'https://form-backend-g7sk.onrender.com'

export interface FormSubmission {
  fullName: string
  gender: string
  faculty: string
  desiredPosition: string
  desiredYear: string
  email: string
  interests: string[]
  comments: string
  timestamp: string
}

export const submitToGoogleSheets = async (data: Omit<FormSubmission, 'timestamp'>): Promise<boolean> => {
  try {
    const submissionData: FormSubmission = {
      ...data,
      timestamp: new Date().toISOString(),
    }

    const response = await fetch(`${BACKEND_URL}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    
    if (result.success) {
      console.log('✅ Successfully submitted to backend')
      if (result.sheets_saved !== undefined) {
        console.log(`📊 Google Sheets: ${result.sheets_saved ? 'Saved' : 'Failed'}`)
      }
      if (result.email_sent !== undefined) {
        console.log(`📧 Email: ${result.email_sent ? 'Sent' : 'Failed'}`)
      }
      return true
    } else {
      console.error('❌ Backend error:', result.error)
      return false
    }
  } catch (error) {
    console.error('Error submitting to backend:', error)
    console.error('Backend URL:', BACKEND_URL)
    console.error('Make sure the backend is running and accessible at', BACKEND_URL)
    // Return false to indicate failure - the form will still show success modal
    // but the error will be logged for debugging
    return false
  }
}
