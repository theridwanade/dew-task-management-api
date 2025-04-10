import bcrypt from "bcrypt";

export const hashData = async (data: string) => {
  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS)
  const salt = await bcrypt.genSalt(saltRounds)
  return bcrypt.hash(data, salt);
}