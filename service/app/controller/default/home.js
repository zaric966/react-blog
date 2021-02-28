'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'api hi normal';
  }

  async getArticleList() {
    const sql = 'SELECT article.id as id,' +
        'article.title as title,' +
        'article.introduction as introduction,' +
        "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
        'article.article_content as content,' +
        'article.view_count as view_count ,' +
        '.type.typeName as typeName ' +
        'FROM article LEFT JOIN type ON article.type_id = type.id';
    const results = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: results,
    };
  }

  async getArticleById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
        'article.title as title,' +
        'article.introduction as introduction,' +
        "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
        'article.article_content as content,' +
        'article.view_count as view_count ,' +
        '.type.typeName as typeName ' +
        'FROM article LEFT JOIN type ON article.type_id = type.id ' +
        'WHERE article.id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };
  }
  // 得到类别信息和编号
  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }
  async getListById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
        'article.title as title,' +
        'article.introduction as introduction,' +
        "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
        'article.article_content as content,' +
        'article.view_count as view_count ,' +
        '.type.typeName as typeName ' +
        'FROM article LEFT JOIN type ON article.type_id = type.id ' +
        'WHERE type_id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };
  }
}

module.exports = HomeController;
