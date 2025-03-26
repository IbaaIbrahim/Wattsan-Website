import { TUserInfo } from '@my-types/user'

import userMock from './mocks/user/user.json'

class UserService {
	private BASE_URL = ''

	async getUserInfo(): Promise<TUserInfo> {
		return await Promise.resolve(userMock)
	}
}

export const userService = new UserService()
