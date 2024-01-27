import * as crypto from 'node:crypto';

type AccountEntityProps = {
  id: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  avatar_url: string;
  role_id: string;
};

export type AccountEntityToObject = Omit<AccountEntityProps, 'password'>;

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
