import bcrypt from 'bcryptjs'

export const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

export const comparePassword = async (passwordReceived, passwordFound) => {
    return await bcrypt.compare(passwordReceived, passwordFound)
}