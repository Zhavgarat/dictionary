const request = require('supertest');
const app = require('./index');

describe('Search for definition', () => {
  test('[Positive] Get existing definition (GET /субъект)', async () => {
    const term = 'api';
    const response = await request(app).get(`/${term}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.term).toBe(term.toUpperCase());
    expect(response.body.definition).toBe('это тот, кто проходит аутентификацию (авторизированный пользователь.');
  });

  test('[Positive] Get existing definition (GET /аутентификация)', async () => {
    const term = 'аутентификация';
    const response = await request(app).get(`/${encodeURI(term)}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.term).toBe(term.toUpperCase());
    expect(response.body.definition).toBe('процесс проверки принадлежности субъекту прав доступа к информационным ресурсам системы или веб-сайта в соответствии с предъявленным им идентификатором; подтверждение (установление) подлинности субъекта.');
  });

  test('[Negative] Get not existing definition (GET /login)', async () => {
    const term = encodeURI('login');
    const response = await request(app).get(`/${term}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe(`${term.toUpperCase()} was not found`);
    expect(response.body.term).toBeFalsy();
    expect(response.body.definition).toBeFalsy();
  });

  test('[Negative] Get for empty (GET /)', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(422);
    expect(response.body.error).toBe('No input');
  });
});
