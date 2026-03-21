import bcrypt from 'bcrypt';

class PasswordService {
  private saltRounds = 10;
  
  // Hash password before storing
  async hashPassword(plainPassword: string): Promise<string> {
    return await bcrypt.hash(plainPassword, this.saltRounds);
  }
  
  // Compare input password with stored hash
  async verifyPassword(
    inputPassword: string, 
    storedHash: string
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, storedHash);
  }
}

export default new PasswordService();