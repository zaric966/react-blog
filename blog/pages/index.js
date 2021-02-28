import Head from 'next/head'
import Link from "next/link";
import {Row, Col, List, Breadcrumb} from "antd";
import axios from "axios";
import {CalendarOutlined,PlaySquareOutlined,DeploymentUnitOutlined} from "@ant-design/icons"
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import React ,{useState}from "react";

import servicePath from "../config/apiUrl";
import marked from "marked";
import hljs from "highlight.js";

 const Home=(list)=> {

     const [myList,setMyList] = useState(list.data);
     const renderer = new marked.Renderer();
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

  return (
    <div>
      <Head>
          <title>CHome</title>
      </Head>
      <Header />
        <Row className="comm-main" type="flex" justify="center">
            <Col className="comm-left" xs={24} sm={24} md={10} lg={15} xl={12}>
                <Breadcrumb>
                    <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                </Breadcrumb>
                <List
                    header={<div>最新日志</div>}
                    itemLayout="vertical"
                    dataSource={myList}
                    renderItem={item=>(
                        <List.Item>
                            <div className="list-title">
                                <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                                    <a>{item.title}</a>
                                </Link>
                            </div>
                            <div className="list-icon">
                                <span><CalendarOutlined />{item.addTime}</span>
                                <span><PlaySquareOutlined />{item.typeName}</span>
                                <span><DeploymentUnitOutlined />访问人数：{item.view_count}</span>
                            </div>
                            <div className="list-context" dangerouslySetInnerHTML={{__html: marked(item.introduction)}}/>
                        </List.Item>
                    )}
                />
            </Col>
            <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                <Author></Author>
                <Advert></Advert>
            </Col>
        </Row>
        <Footer></Footer>
    </div>
  )
}
Home.getInitialProps = async ()=>{
     const promise = new Promise((resolve => {
         axios(servicePath.getArticleList).then(
             (res)=>{
                 resolve(res.data)
             }
         )
     }))
    return await promise;
}
export default Home