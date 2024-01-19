import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
  private readonly saltRounds: number = 8;
  async compare(hash: string, data: string): Promise<boolean> {
    try {
      return await bcrypt.compare(data, hash);
    } catch (e) {
      throw new Error(
        `Could not compare the data with hash because: ${e.message}`,
      );
    }
  }

  async hash(data: string): Promise<string> {
    try {
      return await bcrypt.hash(data, this.saltRounds);
    } catch (e) {
      console.log(e.message);
      throw new Error(`Could not hash the data because: ${e.message}`);
    }
  }
}
