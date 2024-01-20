import {
  AccountEntity,
  AccountEntityToObject,
} from 'src/account/domain/account.entity';

type AuthEntityProps = {
  account: Omit<AccountEntityToObject, 'id'>;
  token: string;
};

export class AuthEntity {
  readonly account: Omit<AccountEntityToObject, 'id'>;
  readonly token: string;

  private constructor(props: AuthEntityProps) {
    this.token = props.token;
    this.account = props.account;
  }

  static create(account: AccountEntity, token: string): AuthEntity {
    const { avatar_url, username, email, bio } = account.toObject();
    return new AuthEntity({
      account: {
        avatar_url,
        username,
        email,
        bio,
      },
      token,
    });
  }
}
