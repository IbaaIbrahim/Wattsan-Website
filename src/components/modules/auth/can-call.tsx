import { authStore } from '@store/auth'

const CanCall = ({children}) => {
	const clientId = authStore.useStore((state) => state.clientId)

	if(clientId) {
		return children
	}
	return null
}

export default CanCall
