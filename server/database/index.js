import { Pool } from 'pg';
import dotenv from 'dotenv';
import Debug from 'debug';

const { config } = dotenv;
config();
const debug = Debug('db');

const { log } = console;
export default class Table {
  constructor(table) {
    this.table = table;
    this.pool = Table.initConn();
    this.pool.on('error', error => debug(error));
  }

  static initConn() {
    const { DATABASE_URL } = process.env;
    const connectionString = DATABASE_URL;
    debug(`Pool Settings: ${connectionString}`);
    return new Pool({ connectionString });
  }

  async selectAll(params) {
    try {
      const result = await this.pool.query(`SELECT ${params} from ${this.table}`);
      debug(result.rows);
      return result.rows;
    } catch (err) {
      debug(err.message);
      return err.message;
    }
  }

  async select(params, constraint) {
    try {
      const result = await this.pool.query(
        `SELECT ${params} from ${this.table} WHERE ${constraint}`
      );
      debug(result.rows);
      return result.rows;
    } catch (err) {
      debug(err.message);
      return err.message;
    }
  }

  async selectCount(column) {
    try {
      const result = await this.pool.query(`SELECT COUNT(${column}) FROM ${this.table}; `);
      debug(result.rows);
      return result.rows;
    } catch (err) {
      debug(err.message);
      return err.message;
    }
  }

  async create(params, values, rows) {
    try {
      const result = await this.pool.query(
        `INSERT INTO ${this.table}(${params}) VALUES(${values}) RETURNING ${'*' || rows}`
      );
      debug(result.rows);
      return result.rows;
    } catch (err) {
      debug(err.message);
      return err.message;
    }
  }

  async update(params, constraints, rows) {
    try {
      const result = await this.pool.query(
        `UPDATE ${this.table} SET ${params} WHERE ${constraints} RETURNING ${'*' || rows}`
      );
      debug(result.rows);
      return result.rows;
    } catch (err) {
      return log(err);
    }
  }

  async updateAllRows(params, rows) {
    try {
      const result = await this.pool.query(
        `UPDATE ${this.table} SET ${params} RETURNING ${'*' || rows}`
      );
      debug(result.rows);
      return result.rows;
    } catch (err) {
      return log(err);
    }
  }
}

export const Members = new Table(`members`);
export const Weeks = new Table(`weeks`);
