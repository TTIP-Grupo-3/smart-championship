import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { join } from 'path';

@Injectable()
export class StorageService {
  base64Encode(path: string) {
    return fs.readFileSync(path, { encoding: 'base64' });
  }

  getImage(name: string, dirname = 'logos'): string | null {
    const fileLocation = join(__dirname, '../../', dirname, name);
    if (fs.existsSync(fileLocation)) {
      return this.base64Encode(fileLocation);
    }
    return null;
  }
}
