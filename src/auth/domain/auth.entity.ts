import {
  AccountEntity,
  AccountEntityToObject,
} from 'src/account/domain/account.entity';

type AuthEntityProps = {
  account: AccountEntityToObject;
  token: string;
};

export class AuthEntity {
  readonly account: AccountEntityToObject;
  readonly token: string;

  private constructor(props: AuthEntityProps) {
    this.token = props.token;
    this.account = props.account;
  }

  static create(account: AccountEntity, token: string): AuthEntity {
    return new AuthEntity({ account: account.toObject(), token });
  }
}
