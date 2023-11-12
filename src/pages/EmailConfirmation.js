import { useEffect } from 'react'
import { supabase } from '../components/client'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function EmailConfirmation() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(null)

  useEffect(() => {
    async function confirmEmail() {
      const urlParams = new URLSearchParams(window.location.search)
      const tokenHash = urlParams.get('token_hash')
      const type = urlParams.get('type')

      if (tokenHash && type === 'email') {
        setLoading(true)
        const { error } = await supabase.auth.api.updateUser({ email: tokenHash })
        if (error) {
          console.error(error)
        } else {
        setLoading(false)
          navigate('/Login')
        }
      }
    }

    confirmEmail()
  }, [])

  

  return (
    <div>
      <h1>Email Confirmation</h1>
      <p>Confirming your email address...</p>
    </div>
  )
}

export default EmailConfirmation