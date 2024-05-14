import { getAuth } from 'firebase/auth';

export default async function getToken() {
  try {
    const auth = getAuth();
    const token = auth.currentUser?.getIdToken(true);
    return token;
  } catch (error) {
    console.log(error);
    throw new Error('An error occurred. Please try again later.');
  }
}
