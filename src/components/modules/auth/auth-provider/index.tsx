'use client'

import { checkAuthorize } from '@store/auth/actions'
import { useEffect } from 'react'

export const AuthProvider = ({ children }) => {
	useEffect(() => {
		checkAuthorize()
	}, [])

	return children
}
