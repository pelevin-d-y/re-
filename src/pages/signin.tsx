import React, { useState } from 'react'
import { TemplatesProvider } from 'src/components/context/TemplatesContext'
import Auth from 'src/components/shared-ui/Auth'

const SignIn: React.FC = () => (
  <TemplatesProvider>
    <Auth />
  </TemplatesProvider>
)
export default SignIn
