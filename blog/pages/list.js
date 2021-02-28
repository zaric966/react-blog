import Head from 'next/head'
import {Row, Col, List, Breadcrumb} from "antd";
import {CalendarOutlined,PlaySquareOutlined,DeploymentUnitOutlined} from "@ant-design/icons"
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import servicePath from "../config/apiUrl";
import Link from "next/link";
import axios from "axios";

import React ,{useState,useEffect}from "react";

const MyList = (list)=> {
    const [myList,setMyList] = useState(list.data);
    useEffect(()=>{
        setMyList(list.data);
    })

    return (
        <div>
            <Head>
                <title>CList</title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={10} lg={15} xl={12}>
                    <Breadcrumb>
                        <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                        <Breadcrumb.Item>视频列表</Breadcrumb.Item>
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
                                <div className="list-context">{item.introduction}</div>
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
MyList.getInitialProps = async (context)=>{
    let  id = context.query.id;
    const promise = new Promise((resolve => {
        axios(servicePath.getListById+id).then(
            (res)=>{
                resolve(res.data)
            }
        )
    }))
    return await promise;
}
export default MyList