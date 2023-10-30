import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { exec, execSync } from 'child_process';
import { promises } from 'fs';
import { Bookmarks } from 'type/bookmark.type';

const { readFile } = promises;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('sh')
  getShell(): void {
    exec('echo hogehoge', (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        console.log(stderr);
      }
      console.log(stdout);
    });
  }

  @Get('file')
  async showFile() {
    // 現在のユーザー名を取得
    const userName: string = execSync('whoami').toString().trim();

    console.log(userName.toString().trim());

    // Bookmarksファイルパス
    const BOOKMARKS_FILE_PATH: string = `/Users/${userName}/Library/Application Support/Google/Chrome/Default/Bookmarks`;

    try {
      // Bookmarksの権限を確認
      const permission = execSync(`ls -l "${BOOKMARKS_FILE_PATH}"`)
        .toString()
        .trim()
        .split(/\s/);
      // 現在利用中のユーザーがパーミッションに含まれているか確認
      if (!permission.includes(userName)) {
        const errJson = { name: 'error', message: '権限がありません。' };
        console.log(errJson);
        return errJson;
      } else {
        const response: string = await readFile(BOOKMARKS_FILE_PATH, 'utf-8');
        const jsonData: Bookmarks = JSON.parse(response);
        const { roots } = jsonData;
        console.log(roots);
        return roots;
      }
    } catch (err) {
      console.log(err.stderr.toString());
      console.log('パスが存在しません。');
      const errJson = { name: 'error', message: 'パスが存在しません。' };
      console.log(errJson);
      return errJson;
    }
  }
}
