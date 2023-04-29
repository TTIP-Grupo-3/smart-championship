import { testSqlClient } from '../utils/testSqlClient';

jest.doMock('src/clients/sql.client.ts', () => ({ sqlClient: testSqlClient }));
