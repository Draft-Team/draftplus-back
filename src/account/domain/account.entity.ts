import * as crypto from 'node:crypto';
import { OmitType } from '../../types/omit.type';

type AccountEntityProps = {
  id: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  avatar_url: string;
  role_id: string;
};

export type AccountEntityToObject = OmitType<AccountEntityProps, 'password'>;

export class AccountEntity {
  readonly id: string;
  public username: string;
  public email: string;
  public password: string;
  public bio: string;
  public avatar_url: string;
  public role_id: string;

  private constructor(props: AccountEntityProps) {
    this.id = props.id;
    this.username = props.username;
    this.email = props.email;
    this.password = props.password;
    this.bio = props.bio;
    this.avatar_url = props.avatar_url;
    this.role_id = props.role_id;
  }

  setUsername(username?: string): this {
    if (!username) return this;
    this.username = username;
    return this;
  }

  setEmail(email?: string): this {
    if (!email) return this;
    this.email = email;
    return this;
  }

  setPassword(password?: string): this {
    if (!password) return this;
    this.password = password;
    return this;
  }

  setBio(bio?: string): this {
    if (!bio) return this;
    this.bio = bio;
    return this;
  }

  setAvatarUrl(avatarUrl?: string): this {
    if (!avatarUrl) return this;
    this.avatar_url = avatarUrl;
    return this;
  }

  setRoleId(roleId?: string): this {
    if (!roleId) return this;
    this.role_id = roleId;
    return this;
  }

  static create(
    data: Pick<
      AccountEntityProps,
      'email' | 'username' | 'password' | 'role_id'
    >,
  ): AccountEntity {
    return new AccountEntity({
      id: crypto.randomUUID(),
      password: data.password,
      username: data.username,
      email: data.email,
      bio: '',
      avatar_url: '',
      role_id: data.role_id,
    });
  }

  static build(data: AccountEntityProps) {
    return new AccountEntity(data);
  }

  toObject(): AccountEntityToObject {
    return {
      avatar_url: this.avatar_url,
      bio: this.bio,
      email: this.email,
      id: this.id,
      username: this.username,
      role_id: this.role_id,
    };
  }
}
