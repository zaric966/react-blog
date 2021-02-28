import {Avatar,Divider} from "antd";
import React from 'react'
import {QqOutlined,WechatOutlined,GithubOutlined} from "@ant-design/icons"
import '../styles/componentCSS/Author.css'

const Author = ()=>{
    return (
        <div className="author-div comm-box">
            <div><Avatar size={100} src="" /></div>
            <div className="Author-introduction">
                Zaric
                <Divider>社交账号</Divider>
                <Avatar className="account" icon={<QqOutlined spin/>} size={28}  />
                <Avatar className="account" icon={<WechatOutlined spin/>} size={28}  />
                <Avatar className="account" icon={<GithubOutlined spin/>} size={28} />
            </div>
        </div>
    )
}
export default Author