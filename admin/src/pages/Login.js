import React ,{useState,useEffect}from 'react';
import 'antd/dist/antd.css';
import {Card,Input,Button,Spin,message} from "antd";
import * as Icon from "@ant-design/icons";
import axios from 'axios'
import '../static/css/Login.css';
import servicePath from "../config/apiUrl";

function Login(props) {
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    useEffect(()=>{

    },[])

    const checkLogin = ()=>{
        setIsLoading(true);
        if(!userName){
            message.error("用户名不能为空");
            setTimeout(()=>{
                setIsLoading(false);
            },100);
            return false;
        }else if(!password){
            message.error("密码不能为空");
            setTimeout(()=>{
                setIsLoading(false);
            },100);
            return false;
        };
        let dataProps = {
            'userName': userName,
            'password': password
        };
        axios({
            method:'post',
            url:servicePath.checkLogin,
            data:dataProps,
            withCredentials:true
        }).then(
            res=>{
                setIsLoading(false);
                if(res.data.data === '登录成功'){
                    localStorage.setItem('openId',res.data.openId);
                    props.history.push('/index')
                }
                else {
                    message.error('用户名或密码错误');
                }
            }
        )
    }
    return(
        <div className="login-div">
            <Spin tip="Loading......" spinning={isLoading}>
                <Card title="Zaric blog System" border={true} style={{width:400}}>
                    <Input  id="userName"
                            size="large"
                            placeholder="Enter your user name"
                            prefix={React.createElement(Icon['UserOutlined'])}
                            onChange={(e)=>{setUserName(e.target.value)}}
                    />
                    <br/><br/>
                    <Input.Password
                            id="password"
                            size="large"
                            placeholder="Enter your user Password"
                            prefix={React.createElement(Icon['KeyOutlined'])}
                            onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    <br/><br/>
                    <Button type="primary" size="large" block onClick={checkLogin} >Login in</Button>
                </Card>
            </Spin>
        </div>
    )
}
export default Login