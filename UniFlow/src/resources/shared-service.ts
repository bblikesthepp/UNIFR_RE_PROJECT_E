// user-service.ts
import { singleton } from 'aurelia';

@singleton()
export class SharedService {

  private role: string = 'unknown';  // default role
  private username: string = '';

  public setUser(username: string, role: string): void {
    this.username = username;
    this.role = role;
  }

  public getUser(): { username: string, role: string } {
    return { username: this.username, role: this.role };
  }

  public setRole(role: string): void {
    this.role = role;
  }

  public getRole(): string {
    return this.role;
  }
}
