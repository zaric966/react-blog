import React,{useEffect,useState} from 'react';
import {List,Row,Col,Modal,message,Button} from 'antd';
import axios from "axios";
import servicePath from "../config/apiUrl";
import '../static/css/ArticleList.css';

const {confirm} = Modal;

function ArticleList(props) {
    const [list,setList] = useState([]);
    const getList = ()=>{
        axios({
                method:'get',
                url:servicePath.getArticleList,
                withCredentials:true
        }).then(
            res=>{
                setList(res.data.list);
            }
        )
    }
    const delItem=(id)=>{
        confirm({
            title:'确定要删除这篇文章吗？',
            content:'如果OK，文章将永远被删除',
            onOk(){
                axios(servicePath.delArticle+id,{withCredentials:true}).then(
                    res=>{
                        message.success("删除成功");
                        getList();
                    }
                )
            },
            onCancel(){
                message.success("取消了删除");
            }
        })
    }

    const articleUpdate = (id,checked)=>{
        props.history.push('/index/add/'+id);
    }
    useEffect(()=>{
        getList()
    },[]);
    return (
        <div>
            <List
                header = {
                 <Row className="list-div">
                     <Col span={8}>
                         <b>标题</b>
                     </Col>
                     <Col span={4}>
                         <b>类别</b>
                     </Col>
                     <Col span={4}>
                         <b>发布时间</b>
                     </Col>
                     <Col span={4}>
                         <b>浏览量</b>
                     </Col>
                     <Col span={4}>
                         <b>操作</b>
                     </Col>
                 </Row>
                }
                bordered
                dataSource={list}
                renderItem={item=>(
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={4}>
                                {item.typeName}
                            </Col>
                            <Col span={4}>
                                {item.addTime}
                            </Col>
                            <Col span={4}>
                                {item.view_count}
                            </Col>
                            <Col span={4}>
                                <Button type="primary" onClick={()=>{articleUpdate(item.id)}}>修改</Button> &nbsp;
                                <Button onClick={()=>delItem(item.id)}>删除</Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
           />
        </div>
    )

}
export default ArticleList