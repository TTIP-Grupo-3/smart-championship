import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { join } from 'path';

@Injectable()
export class StorageService {
  base64Encode(path: string) {
    return fs.readFileSync(path, { encoding: 'base64' });
  }

  getImage(name: string, dirname = 'logos'): string | null {
    const fileLocation = this.filePath(name, dirname);
    if (fs.existsSync(fileLocation)) return this.base64Encode(fileLocation);
    return null;
  }

  async upload(filename: string, fileString: string, container: string): Promise<void> {
    await this.delete(filename, container);
    if (!(await this.exists('', container))) await this.createContainer(container);
    fs.writeFileSync(this.filePath(filename, container), fileString, { encoding: 'base64' });
  }

  async delete(filename: string, container: string): Promise<void> {
    if (await this.exists(filename, container)) fs.unlinkSync(this.filePath(filename, container));
  }

  private async createContainer(container: string) {
    fs.mkdirSync(container, { recursive: true });
  }

  private async exists(filename: string, receiptContainer: string): Promise<boolean> {
    return fs.existsSync(this.filePath(filename, receiptContainer));
  }

  private filePath(filename: string, receiptContainer: string): string {
    return join(__dirname, '../../', receiptContainer, filename);
  }
}
