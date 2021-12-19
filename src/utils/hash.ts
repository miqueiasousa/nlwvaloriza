import bcrypt from 'bcrypt'

export default async (plaintext: string) => {
  const SALT_ROUNDS = 8

  const salt = await bcrypt.genSalt(SALT_ROUNDS)
  const hash = await bcrypt.hash(plaintext, salt)

  return hash
}
