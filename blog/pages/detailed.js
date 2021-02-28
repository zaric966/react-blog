import Head from 'next/head'
import Link from "next/link";
import {Row,Col,Breadcrumb,Affix} from "antd";
import {CalendarOutlined,PlaySquareOutlined,DeploymentUnitOutlined} from "@ant-design/icons"
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../styles/pageCss/detailed.css'
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import React from "react";
import axios from "axios";


import marked from "marked";
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import Tocify from "../components/tocify.tsx";
import servicePath from "../config/apiUrl";

const Detailed = (props)=> {
    const tocify = new Tocify();
    const renderer = new marked.Renderer();

    //定义标题等级 ### 标题
    renderer.heading = function(text,level,raw){
        const anchor = tocify.add(text,level)
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
    }

    marked.setOptions({
        renderer:renderer,
        gfm:true,
        pedantic:false,
        sanitize:false,
        tables:true,
        breaks:false,
        smartLists:true,
        highlight:function (code) {
            return hljs.highlightAuto(code).value;

        }
    });
    const html = marked(props.content);
    return (
        <div>
            <Head>
                <title>CDetailed</title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={10} lg={15} xl={12}>
                   <div className="bread-div">
                       <Breadcrumb>
                           <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                           <Breadcrumb.Item><a href="/list">视频列表</a></Breadcrumb.Item>
                           <Breadcrumb.Item>详细内容xxx</Breadcrumb.Item>
                       </Breadcrumb>
                   </div>
                   <div className="detailed-title">
                       React实战视频~~~~~~~~
                   </div>
                    <div className="list-icon center">
                        <span><CalendarOutlined />2020-12-17</span>
                        <span><PlaySquareOutlined />视频</span>
                        <span><DeploymentUnitOutlined />访问人数：4654</span>
                    </div>
                    <div className="detailed-content" dangerouslySetInnerHTML={{__html:html}}></div>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Affix offsetTop={5} >
                        <div className="detailed-nav comm-box">
                            <div className="nav-title">文章目录</div>
                            {tocify && tocify.render()}
                        </div>
                    </Affix>
                </Col>
            </Row>
            <Footer></Footer>
        </div>
    )
}
//接收前台传递的id
Detailed.getInitialProps = async (context)=>{
    // console.log(context.query.id);
    const id = context.query.id;
    const promise = new Promise((resolve => {
        axios(servicePath.getArticleById+id).then(
            (res)=>{
                // console.log(res)
                resolve(res.data.data[0])
            }
        )
    }))
    return await promise
}

export default Detailed;