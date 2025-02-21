import { BASE_URL } from './api';

interface ProfileData {
  name: string;
  phone: string;
  address: string;
  bio: string;
}
const getProfileData = async (userId: string): Promise<ProfileData> => {
  const res = await fetch(`${BASE_URL}/users/${userId}`, { cache: 'no-store' });
  const result = await res.json();

  if (result.status === 404) {
    throw new Error('내 프로필이 등록되어있지 않습니다.');
  }
  return result.item;
};

export default getProfileData;
