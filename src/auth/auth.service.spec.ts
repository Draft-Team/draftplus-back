import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AccountService } from '../account/account.service';
import { AccountEntity } from '../account/domain/account.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './domain/auth.entity';

describe('AuthService', () => {
  let service: AuthService;
  let accountService: AccountService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, AccountService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    accountService = module.get<AccountService>(AccountService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should successfully return an auth entity', async () => {
    const result = AccountEntity.create({
      password: '123',
      username: 'username',
      email: 'example@example.com',
    });

    const resultToken = 'token';
    const expected = AuthEntity.create(result, resultToken);

    jest.spyOn(accountService, 'findByEmail').mockResolvedValueOnce(result);
    jest.spyOn(jwtService, 'sign').mockReturnValueOnce(resultToken);

    const data = await service.signIn({
      email: 'example@example.com',
      password: '123',
    });

    expect(data).toBeInstanceOf(AuthEntity);
    expect(data).not.toHaveProperty('account.id');
    expect(data).not.toHaveProperty('account.password');
    expect(data).toStrictEqual(expected);
  });
});
