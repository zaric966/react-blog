import React,{useState,useEffect} from 'react'
import '../styles/componentCSS/header.css'
import {Row,Col,Menu} from "antd";
import * as Icon from "@ant-design/icons";
import Router from "next/router";
import Link from "next/link";
import axios from "axios";
import servicePath from "../config/apiUrl";


const Header =()=>{
    //只有父组件可以使用getInitialProps
    const [ navArray, setNavArray ] = useState([]);
    useEffect(()=>{
        //useEffect虽然是异步操作，但是不可以直接使用await进行异步等待操作
        const fetchData = async ()=>{
            const result = await axios(servicePath.getTypeInfo).then(
                (res)=>{
                    setNavArray(res.data.data);
                    return res.data.data;
                }
            )
            setNavArray(result);
        }
        fetchData();
        //如果在[]中填入参数，则是每当参数变化时就执行该方法，为空则是第一次进入才执行该方法
    },[]);

    //用e即（event）可以获得antd_menu传输过来的key值
    const handleClick = (e)=>{
        if(e.key == 0){
            Router.push('/')
        }else{
            Router.push('/list?id='+e.key)
        }
    }

 return(
     <div className="header">
                <Row type='flex' justify='center'>
                    <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                        <span className="header-logo">Zaric</span>
                        <span className="header-text">create my blog</span>
                    </Col>
                    <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                        <Menu mode="horizontal" onClick={handleClick}>
                            <Menu.Item key="0">
                                {React.createElement(Icon['HomeOutlined'])}
                                主页
                            </Menu.Item>
                            {
                                navArray.map((item)=>{
                                    return (
                                        <Menu.Item key={item.id}>
                                            {React.createElement(Icon[item.icon])}
                                            {item.typeName}
                                        </Menu.Item>
                                    )
                                })
                            }
                        </Menu>
                    </Col>
                </Row>
            </div>
    )
}
export default Header