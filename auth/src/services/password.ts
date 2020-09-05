import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

// Sscrypt doesnt use async await syntax so we use promisify
const scryptAsync = promisify(scrypt);

export class Password {
  // static methods are methods we can call withouth
  // creating an instance of a class
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer; // Tells ts this is a Buffer

    return `${buf.toString('hex')}.${salt}`; // store hash and salt
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPassword;
  }
}

// ie we can do Password.toHash with new Password
