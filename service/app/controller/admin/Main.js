'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    this.ctx.body = 'hi admin api';
  }

  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    const sql = `SELECT userName FROM admin_user WHERE userName ='${userName}'AND password = '${password}' `;
    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      const openId = new Date().getTime();
      this.ctx.session.openId = { 'openId': openId };
      this.ctx.body = { data: '登录成功', 'openId': openId };
    } else {
      this.ctx.body = { data: '登录失败' };
    }
  }

  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    this.ctx.body = {data: resType};
  }

  async addArticle() {
    let tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.insert('article',tmpArticle);
    console.log('我是result！--------',result);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    console.log('ht iId----->',insertId);
    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId: insertId
    }
  }
  async updateArticle() {
    let tempArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('article',tempArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess,
    }
  }
  async getArticleList() {
    const sql = 'SELECT article.id as id,' +
        'article.title as title,' +
        'article.introduction as introduction,' +
        "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
        'article.article_content as content,' +
        'article.view_count as view_count ,' +
        '.type.typeName as typeName ' +
        'FROM article LEFT JOIN type ON article.type_id = type.id ORDER BY article.id DESC';
    const results = await this.app.mysql.query(sql);

    this.ctx.body = {
      list: results,
    };
  }
  async delArticle() {
    let id = this.ctx.params.id;
    const res = await this.app.mysql.delete("article",{'id':id});
    this.ctx.body = {
      data:res
    }
  }
  async getArticleById() {
    let id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
        'article.title as title,' +
        'article.introduction as introduction,' +
        "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
        'article.article_content as content,' +
        'article.view_count as view_count ,' +
        'type.typeName as typeName ,' +
        'type.id as typeId '+
        'FROM article LEFT JOIN type ON article.type_id = type.id ' +
        'WHERE article.id ='+id;
    const results = await this.app.mysql.query(sql);
    this.ctx.body = {
      data:results
    }
  }
}

module.exports = MainController;
